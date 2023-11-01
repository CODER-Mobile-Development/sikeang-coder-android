import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  AdminAddEvent, AdminAddMember, Login, MemberHome, AdminEditAdmin, AdminAddAdmin, AdminEditEvent,
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
        name="AdminAddAdmin"
        component={AdminAddAdmin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminEditAdmin"
        component={AdminEditAdmin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminAddMember"
        component={AdminAddMember}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminAddEvent"
        component={AdminAddEvent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminEditEvent"
        component={AdminEditEvent}
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
