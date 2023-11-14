import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AdminHome, Login, MemberHome } from '../pages';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminHome"
        component={AdminHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MemberHome"
        component={MemberHome}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Router;
