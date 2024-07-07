import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/components/Navigation';
import {HistoryProvider} from './src/context/HistoryContext';

const App: React.FC = () => {
  return (
    <>
      <HistoryProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </HistoryProvider>
    </>
  );
};

export default App;
