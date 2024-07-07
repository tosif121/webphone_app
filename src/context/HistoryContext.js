import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryContext = createContext({});

export const HistoryProvider = ({children}) => {
  const [history, setHistory] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loadCallHistory = async () => {
      try {
        const callHistory = await AsyncStorage.getItem('call-history');
        if (callHistory) {
          setHistory(JSON.parse(callHistory));
        }
      } catch (error) {
        console.error('Failed to load call history:', error);
      }
    };

    loadCallHistory();
  }, []);

  useEffect(() => {
    const saveCallHistory = async () => {
      try {
        await AsyncStorage.setItem('call-history', JSON.stringify(history));
      } catch (error) {
        console.error('Failed to save call history:', error);
      }
    };

    saveCallHistory();
  }, [history]);

  return (
    <HistoryContext.Provider
      value={{
        history,
        setHistory,
        username,
        setUsername,
        password,
        setPassword,
      }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext;
