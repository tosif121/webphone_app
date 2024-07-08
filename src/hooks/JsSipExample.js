import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import JsSIP from 'react-native-jssip';
import { mediaDevices, RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

global.RTCPeerConnection = global.RTCPeerConnection || RTCPeerConnection;
global.RTCSessionDescription = global.RTCSessionDescription || RTCSessionDescription;
global.RTCIceCandidate = global.RTCIceCandidate || RTCIceCandidate;

const JsSipExample = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('Initializing...');
  const [hasPermission, setHasPermission] = useState(false);
  const uaRef = useRef(null);
  const sessionRef = useRef(null);
  const username = 'demo@surya';

  useEffect(() => {
    checkPermission();

    return () => {
      // Cleanup on component unmount
      if (uaRef.current) {
        uaRef.current.stop();
        uaRef.current = null;
      }
    };
  }, []);

  const checkPermission = async () => {
    try {
      const permission = Platform.OS === 'ios' 
        ? PERMISSIONS.IOS.MICROPHONE 
        : PERMISSIONS.ANDROID.RECORD_AUDIO;
      
      const result = await request(permission);
      
      if (result === RESULTS.GRANTED) {
        setHasPermission(true);
        initializeJsSip();
      } else {
        setStatus('Microphone permission denied');
        Alert.alert(
          'Permission Denied', 
          'Microphone permission is required to make calls.',
          [{ text: 'OK', onPress: () => checkPermission() }]
        );
      }
    } catch (error) {
      console.error('Error checking permission:', error);
      setStatus('Error checking microphone permission');
    }
  };
  
  useEffect(() => {
    checkPermission();
  
    initializeJsSip();
  
    return () => {
      // Cleanup on component unmount
      if (uaRef.current) {
        uaRef.current.stop();
        uaRef.current = null;
      }
    };
  }, []);
  
  const handleCall = async () => {
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Microphone permission is needed to make calls.');
      return;
    }
  
    if (!uaRef.current) {
      Alert.alert('Error', 'JsSIP is not initialized');
      return;
    }
  
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }
  
    try {
      console.log('Requesting user media');
      const stream = await mediaDevices.getUserMedia({ audio: true, video: false });
      console.log('User media obtained:', stream);
      const options = {
        mediaConstraints: { audio: true, video: false },
        mediaStream: stream,
      };
  
      console.log('Making call to:', phoneNumber);
      uaRef.current.call(`sip:${phoneNumber}@samwad.iotcom.io:8089`, options);
      setStatus('Calling...');
    } catch (error) {
      console.error('Error making call:', error);
      Alert.alert('Call Error', 'Failed to initiate the call. Please check permissions and try again.');
    }
  };
  
  // Add additional event listeners and error handling for SIP sessions
  const initializeJsSip = () => {
    try {
      const socket = new JsSIP.WebSocketInterface('wss://samwad.iotcom.io:8089/ws');
      const configuration = {
        sockets: [socket],
        uri: `${username.replace('@', '-')}@samwad.iotcom.io:8089`,
        password: 'Demo@123',
      };
  
      const ua = new JsSIP.UA(configuration);
      uaRef.current = ua;
  
      ua.on('connected', () => {
        setStatus('Connected to SIP server');
        console.log('Connected to SIP server');
      });
      ua.on('disconnected', () => {
        setStatus('Disconnected from SIP server');
        console.log('Disconnected from SIP server');
      });
      ua.on('registered', () => {
        setStatus('Registered with SIP server');
        console.log('Registered with SIP server');
      });
      ua.on('unregistered', () => {
        setStatus('Unregistered from SIP server');
        console.log('Unregistered from SIP server');
      });
      ua.on('registrationFailed', (data) => {
        setStatus(`Registration failed: ${data.cause}`);
        console.error('Registration failed:', data.cause);
        Alert.alert('Registration Failed', `Failed to register with the SIP server: ${data.cause}`);
      });
  
      ua.on('newRTCSession', (data) => {
        const session = data.session;
        sessionRef.current = session;
  
        session.on('accepted', () => {
          setStatus('Call in progress');
          console.log('Call accepted');
        });
        session.on('ended', () => {
          setStatus('Call ended');
          console.log('Call ended');
          sessionRef.current = null;
        });
        session.on('failed', (data) => {
          setStatus(`Call failed: ${data.cause}`);
          console.error('Call failed:', data.cause);
          Alert.alert('Call Failed', `The call failed: ${data.cause}`);
          sessionRef.current = null;
        });
        session.on('peerconnection', (data) => {
          console.log('Peer connection:', data);
        });
        session.on('icecandidate', (event) => {
          console.log('ICE candidate:', event.candidate);
        });
        session.on('sdp', (data) => {
          console.log('SDP received:', data.sdp);
        });
        session.on('getusermediafailed', (data) => {
          console.error('GetUserMedia failed:', data);
          Alert.alert('GetUserMedia Failed', 'Failed to obtain user media.');
        });
        session.on('peerconnection:createofferfailed', (error) => {
          console.error('Create offer failed:', error);
        });
        session.on('peerconnection:createanswerfailed', (error) => {
          console.error('Create answer failed:', error);
        });
        session.on('peerconnection:setlocaldescriptionfailed', (error) => {
          console.error('Set local description failed:', error);
        });
        session.on('peerconnection:setremotedescriptionfailed', (error) => {
          console.error('Set remote description failed:', error);
        });
        session.on('peerconnection:addicecandidatefailed', (error) => {
          console.error('Add ICE candidate failed:', error);
        });
      });
  
      ua.start();
    } catch (error) {
      console.error('Error initializing JsSIP:', error);
      Alert.alert('Initialization Error', 'Failed to initialize JsSIP. Please check your configuration.');
    }
  };
  
  

  const handleHangUp = () => {
    if (sessionRef.current) {
      sessionRef.current.terminate();
      setStatus('Call ended');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
      />
      <View style={styles.buttonContainer}>
        <Button 
          title="Call" 
          onPress={handleCall} 
          disabled={!phoneNumber || status === 'Calling...' || !hasPermission} 
        />
        <Button 
          title="Hang Up" 
          onPress={handleHangUp} 
          disabled={!sessionRef.current} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default JsSipExample;
