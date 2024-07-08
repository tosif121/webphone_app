import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import JsSipExample from '../hooks/JsSipExample';

const Main: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React Native JsSIP Example</Text>
      <JsSipExample />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Main;
