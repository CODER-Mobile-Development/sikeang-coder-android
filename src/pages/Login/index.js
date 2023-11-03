import React, { useCallback } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  GoogleIcon, OrganizationLogoHorizontal, WelcomeMan, WelcomeWoman,
} from '../../assets/svgs';
import { Separator } from '../../components';

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
    <View
      style={styles.wrapper}
      onLayout={onLayoutRootView}
    >
      <View>
        <View style={styles.welcomeIcon}>
          <WelcomeWoman width={70} height={261} />
          <WelcomeMan width={116} height={278} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.welcomeText}>
            Selamat Datang
          </Text>
          <Text style={styles.welcomeDescription}>
            Selamat datang di pusat keaktifan. Bersiaplah untuk
            memulai perjalanan Anda menuju keberhasilan!
          </Text>
        </View>
        <Separator height={65} />
        <TouchableOpacity style={styles.buttonLogin}>
          <Text style={styles.buttonLoginText}>
            Masuk dengan Google
          </Text>
          <GoogleIcon />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center' }}>
        <OrganizationLogoHorizontal width={182} height={20} />
      </View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 35,
    justifyContent: 'space-between',
    paddingVertical: 30,
    backgroundColor: 'white',
  },
  welcomeIcon: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#B81519',
  },
  welcomeDescription: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  buttonLogin: {
    height: 56,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#B81519',
    borderWidth: 2,
  },
  buttonLoginText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#B81519',
    marginRight: 29,
  },
});
