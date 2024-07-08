// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import Navigation from './src/components/Navigation';
// import {HistoryProvider} from './src/context/HistoryContext';

// const App: React.FC = () => {
//   return (
//     <>
//       <HistoryProvider>
//         <NavigationContainer>
//           <Navigation />
//         </NavigationContainer>
//       </HistoryProvider>
//     </>
//   );
// };

// export default App;


import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

// Import WebRTC polyfills
import 'react-native-webrtc';
import JsSipExample from './src/hooks/JsSipExample';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <JsSipExample />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
