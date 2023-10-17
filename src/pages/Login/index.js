import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

//testing preview
import UserTabAdmin from '../../components/UserTab/Admin';
import UserTabMember from '../../components/UserTab/Member';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function Login() {
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ marginHorizontal: 0 }} onLayout={onLayoutRootView}>
      <Text style={{
        fontFamily: 'Poppins-Bold',
        fontSize: 40,
      }}
      >
        Ini halam login
      </Text>
      <View style={styles.container}>
        <UserTabAdmin imageUri="https://via.placeholder.com/42x42" name="Irvan Surya Nugraha" division="Divisi Mobile - Koordinator" />
      </View>
      <View style={styles.container}>
        <UserTabMember imageUri="https://via.placeholder.com/42x42" name="Irvan Surya Nugraha" division="Divisi Mobile - Koordinator" points={200} />
      </View>
    </View>
  );
}

export default Login;
