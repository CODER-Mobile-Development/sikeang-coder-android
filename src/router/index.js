import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Login} from '../pages';
import { AdminManualAttendance } from '../pages';
import { AdminAddCommittee } from '../pages';
import { AdminAdminList } from '../pages';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="AdmminManualAttendance"
        component={AdminManualAttendance}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="AdmminAddCommittee"
        component={AdminAddCommittee}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="AdmminAdminList"
        component={AdminAdminList}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}

export default Router;
