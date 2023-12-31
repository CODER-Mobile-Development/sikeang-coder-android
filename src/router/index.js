import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AdminAddCommittee,
  AdminAddDivision,
  AdminAddEvent,
  AdminAdminList,
  AdminAttendanceList,
  AdminCommitteeList,
  AdminDetailEvent,
  AdminEditDivision,
  AdminEditEvent,
  AdminEventList,
  AdminHome,
  AdminManualAttendance,
  AdminMemberList,
  AdminPresenceQR,
  Login,
  MemberDetailEvent,
  MemberEvent,
  MemberHome,
  MemberScanQR,
  UserAdd,
  UserEdit,
  UserProfile,
} from '../pages';
import {
  AdminIcon, CalendarIcon, HomeIcon, PersonIcon, ScanQRIcon,
} from '../assets/svgs';
import { NavbarBottom } from '../components';

const AdminEventStack = createNativeStackNavigator();

function AdminEventStackScreen() {
  return (
    <AdminEventStack.Navigator>
      <AdminEventStack.Screen
        name="AdminEventList"
        component={AdminEventList}
        options={{ headerShown: false }}
      />
      <AdminEventStack.Screen
        name="AdminDetailEvent"
        component={AdminDetailEvent}
        options={{ headerShown: false }}
      />
      <AdminEventStack.Screen
        name="AdminAttendanceList"
        component={AdminAttendanceList}
        options={{ headerShown: false }}
      />
      <AdminEventStack.Screen
        name="AdminAddEvent"
        component={AdminAddEvent}
        options={{ headerShown: false }}
      />
      <AdminEventStack.Screen
        name="AdminEditEvent"
        component={AdminEditEvent}
        options={{ headerShown: false }}
      />
      <AdminEventStack.Screen
        name="AdminManualAttendance"
        component={AdminManualAttendance}
        options={{ headerShown: false }}
      />
      <AdminEventStack.Screen
        name="AdminCommitteeList"
        component={AdminCommitteeList}
        options={{ headerShown: false }}
      />
      <AdminEventStack.Screen
        name="AdminAddCommittee"
        component={AdminAddCommittee}
        options={{ headerShown: false }}
      />
      <AdminEventStack.Screen
        name="AdminPresenceQR"
        component={AdminPresenceQR}
        options={{ headerShown: false }}
      />
    </AdminEventStack.Navigator>
  );
}

const AdminHomeStack = createNativeStackNavigator();

function AdminHomeStackScreen() {
  return (
    <AdminHomeStack.Navigator>
      <AdminHomeStack.Screen
        name="AdminHomeScreen"
        component={AdminHome}
        options={{ headerShown: false }}
      />
      <AdminHomeStack.Screen
        name="AdminMemberList"
        component={AdminMemberList}
        options={{ headerShown: false }}
      />
      <AdminHomeStack.Screen
        name="UserAddMember"
        component={UserAdd}
        options={{ headerShown: false }}
      />
      <AdminHomeStack.Screen
        name="UserEditMember"
        component={UserEdit}
        options={{ headerShown: false }}
      />
      <AdminHomeStack.Screen
        name="AdminAddDivision"
        component={AdminAddDivision}
        options={{ headerShown: false }}
      />
      <AdminHomeStack.Screen
        name="AdminEditDivision"
        component={AdminEditDivision}
        options={{ headerShown: false }}
      />
    </AdminHomeStack.Navigator>
  );
}

const AdminAdminStack = createNativeStackNavigator();

function AdminAdminStackScreen() {
  return (
    <AdminAdminStack.Navigator>
      <AdminAdminStack.Screen
        name="AdminAdminList"
        component={AdminAdminList}
        options={{ headerShown: false }}
      />
      <AdminAdminStack.Screen
        name="UserAddAdmin"
        component={UserAdd}
        options={{ headerShown: false }}
      />
      <AdminAdminStack.Screen
        name="UserEditAdmin"
        component={UserEdit}
        options={{ headerShown: false }}
      />
    </AdminAdminStack.Navigator>
  );
}

const AdminTab = createBottomTabNavigator();

function AdminTabScreen() {
  return (
    <AdminTab.Navigator
      tabBar={(props) => <NavbarBottom {...props} />}
      screenOptions={{ tabBarHideOnKeyboard: true }}
    >
      <AdminTab.Screen
        name="AdminHome"
        component={AdminHomeStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'home',
          tabBarIcon:
              ({ isActive }) => (<HomeIcon width={32} height={32} isActive={isActive} />),
        }}
      />
      <AdminTab.Screen
        name="AdminEvent"
        component={AdminEventStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'event',
          tabBarIcon:
              ({ isActive }) => (<CalendarIcon width={32} height={32} isActive={isActive} />),
        }}
      />
      <AdminTab.Screen
        name="AdminAdmin"
        component={AdminAdminStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'admin',
          tabBarIcon:
              ({ isActive }) => (<AdminIcon width={32} height={32} isActive={isActive} />),
        }}
      />
      <AdminTab.Screen
        name="AdminProfile"
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarLabel: 'profile',
          tabBarIcon:
                ({ isActive }) => (<PersonIcon width={32} height={32} isActive={isActive} />),
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
        component={UserProfile}
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
