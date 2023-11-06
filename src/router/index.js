import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MemberEvent } from '../pages';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={MemberEvent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Router;
