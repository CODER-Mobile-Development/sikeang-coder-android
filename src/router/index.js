import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Login} from '../pages';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Router;
