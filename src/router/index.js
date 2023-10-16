import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../pages';
import { MemberListView } from '../components';
import { MemberPointHistory } from '../components';
import React from 'react';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="MemberListView"
        component={MemberListView}
        options={{ title: 'Member List' }}
      /> */}

      {/* <Stack.Screen
        name="MemberPointHistory"
        component={MemberPointHistory}
        options={{ title: 'Member Point History' }}
      /> */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

}

export default Router;
