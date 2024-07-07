import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useFormatPhoneNumber from '../hooks/useFormatPhoneNumber';
import KeyPad from './KeyPad';

interface HomeProps {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  handleCall: () => void;
  setSeeLogs: (seeLogs: boolean) => void;
}

const Home: React.FC<HomeProps> = ({
  phoneNumber,
  setPhoneNumber,
  handleCall,
  setSeeLogs,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const formatPhoneNumber = useFormatPhoneNumber();

  return (
    <View style={styles.container}>
      <View style={styles.phoneContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>WebPhone</Text>
          <TouchableOpacity onPress={() => setSeeLogs(true)}>
            <Icon name="history" size={24} color="#2196f3" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={formatPhoneNumber(phoneNumber)}
            onChangeText={setPhoneNumber}
            placeholder="Phone number"
            keyboardType="phone-pad"
          />
          {phoneNumber && (
            <TouchableOpacity
              onPress={() => setPhoneNumber(prev => prev.slice(0, -1).trim())}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}>
              <Icon
                name="backspace"
                size={24}
                color="#2196f3"
                solid={isPressed}
              />
            </TouchableOpacity>
          )}
        </View>
        <KeyPad setPhoneNumber={setPhoneNumber} />
        <View style={styles.callButtonContainer}>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Icon name="phone" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  phoneContainer: {
    width: '100%',
    maxWidth: 300,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196f3',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 24,
    paddingVertical: 8,
  },
  callButtonContainer: {
    alignItems: 'center',
  },
  callButton: {
    marginTop: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    width: 60,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
