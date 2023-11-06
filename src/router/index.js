import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AdminHome } from '../pages';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={AdminHome}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Router;
