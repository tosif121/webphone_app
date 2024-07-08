import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import SplashScreen from './SplashScreen';
import Main from './Main';
import Home from './Home';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
};

export default Navigation;
