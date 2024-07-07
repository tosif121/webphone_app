import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const keyboard = [
  {num: 1, text: ''},
  {num: 2, text: 'abc'},
  {num: 3, text: 'def'},
  {num: 4, text: 'ghi'},
  {num: 5, text: 'jkl'},
  {num: 6, text: 'mno'},
  {num: 7, text: 'pqrs'},
  {num: 8, text: 'tuv'},
  {num: 9, text: 'wxyz'},
  {num: '*', text: ''},
  {num: 0, text: '+'},
  {num: '#', text: ''},
];

const HistoryScreen = ({setPhoneNumber}) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {keyboard.map(item => (
          <TouchableOpacity
            key={item.num}
            style={styles.button}
            onPress={() => setPhoneNumber(prev => prev + String(item.num))}>
            <Text style={styles.buttonNumber}>{item.num}</Text>
            <Text style={styles.buttonText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 70,
    height: 70,
    margin: 8,
    borderRadius: 35,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  buttonNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#070707',
  },
  buttonText: {
    fontSize: 10,
    color: '#666',
    textTransform: 'uppercase',
  },
});

export default HistoryScreen;
