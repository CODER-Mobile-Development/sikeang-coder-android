import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  AdminAddEvent, AdminAddMember, AdminEditMember,Login, MemberHome,
} from '../pages';

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
        name="AdminAddMember"
        component={AdminAddMember}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminEditMember"
        component={AdminEditMember}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminAddEvent"
        component={AdminAddEvent}
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
