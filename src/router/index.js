import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AdminHome, Login, MemberEvent, MemberHome,
} from '../pages';

const AdminTab = createBottomTabNavigator();

function AdminTabScreen() {
  return (
    <AdminTab.Navigator>
      <AdminTab.Screen
        name="AdminHome"
        component={AdminHome}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
    </AdminTab.Navigator>
  );
}

const MemberTab = createBottomTabNavigator();

function MemberTabScreen() {
  return (
    <MemberTab.Navigator>
      <MemberTab.Screen
        name="MemberHome"
        component={MemberHome}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
      <MemberTab.Screen
        name="MemberEvent"
        component={MemberEvent}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
    </MemberTab.Navigator>
  );
}

const MainStack = createNativeStackNavigator();

function Router() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="AdminTabScreen"
        component={AdminTabScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="MemberTabScreen"
        component={MemberTabScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}

export default Router;
