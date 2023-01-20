import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/pages/Home';
import Historico from './src/pages/Historico';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Home" component={Home} />
        <Stack.Screen options={{title:'Histórico'}} name="Historico" component={Historico} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

