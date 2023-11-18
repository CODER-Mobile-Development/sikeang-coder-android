import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AdminHome, Login, MemberDetailEvent, MemberEvent, MemberHome, MemberProfile, MemberScanQR,
} from '../pages';
import {
  CalendarIcon, HomeIcon, PersonIcon, ScanQRIcon,
} from '../assets/svgs';
import { NavbarBottom } from '../components';

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

const MemberEventStack = createNativeStackNavigator();

function MemberEventStackScreen() {
  return (
    <MemberEventStack.Navigator>
      <MemberEventStack.Screen
        name="MemberEvent"
        component={MemberEvent}
        options={{ headerShown: false }}
      />
      <MemberEventStack.Screen
        name="MemberDetailEvent"
        component={MemberDetailEvent}
        options={{ headerShown: false }}
      />
    </MemberEventStack.Navigator>
  );
}

const MemberTab = createBottomTabNavigator();

function MemberTabScreen() {
  return (
    <MemberTab.Navigator tabBar={(props) => <NavbarBottom {...props} />}>
      <MemberTab.Screen
        name="MemberHome"
        component={MemberHome}
        options={{
          headerShown: false,
          tabBarLabel: 'home',
          tabBarIcon:
              ({ isActive }) => (<HomeIcon width={32} height={32} isActive={isActive} />),
        }}
      />
      <MemberTab.Screen
        name="MemberScanQR"
        component={MemberScanQR}
        options={{
          headerShown: false,
          tabBarLabel: 'presensi',
          tabBarIcon:
              ({ isActive }) => (<ScanQRIcon width={32} height={32} isActive={isActive} />),
        }}
      />
      <MemberTab.Screen
        name="MemberEventStackScreen"
        component={MemberEventStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'event',
          tabBarIcon:
              ({ isActive }) => (<CalendarIcon width={32} height={32} isActive={isActive} />),
        }}
      />
      <MemberTab.Screen
        name="MemberProfile"
        component={MemberProfile}
        options={{
          headerShown: false,
          tabBarLabel: 'profile',
          tabBarIcon:
              ({ isActive }) => (<PersonIcon width={32} height={32} isActive={isActive} />),
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
        options={{ headerShown: false, animation: 'none' }}
      />
      <MainStack.Screen
        name="AdminTabScreen"
        component={AdminTabScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
      <MainStack.Screen
        name="MemberTabScreen"
        component={MemberTabScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
    </MainStack.Navigator>
  );
}

export default Router;
