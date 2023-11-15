import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { StatusBar } from 'expo-status-bar';
import {
  GoogleIcon, OrganizationLogoHorizontal, WelcomeMan, WelcomeWoman,
} from '../../assets/svgs';
import { Loading, Separator } from '../../components';
import {
  API_HOST, CallAPI, iosClientId, showToast, storeData, webClientId,
} from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function Login({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [isLoading, setIsLoading] = useState(false);

  const authenticationAPI = (idToken) => {
    CallAPI({
      url: `${API_HOST}/auth/google`,
      method: 'POST',
      data: { idToken },
    })
      .then(async (r) => {
        const { userToken, userData } = r;

        await storeData('user-token', userToken);
        await storeData('user-data', userData);
        setIsLoading(false);
        if (userData.position === 'admin') return navigation.navigate('AdminHome', { userData, userToken });
        if (userData.position === 'member') return navigation.navigate('MemberHome', { userData, userToken });
        return null;
      })
      .catch((e) => {
        setIsLoading(false);
        showToast(`Error: ${e.message}`, 'danger');
      });
  };

  const signIn = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      authenticationAPI(idToken);
    } catch (error) {
      const errorString = error.toString();
      setIsLoading(false);
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          showToast('Sign-in di batalkan! klik ulang tombol.', 'warning');
          break;
        case statusCodes.IN_PROGRESS:
          showToast('Sedang proses autentikasi!', 'warning');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          showToast('Google play service tidak tersedia atau terlalu jadul!', 'danger');
          break;
        default:
          if (errorString.includes('NETWORK_ERROR')) {
            showToast('Tidak ada koneksi internet!', 'danger');
          } else {
            showToast(`Terjadi Error. ${errorString}`, 'danger');
          }
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
      webClientId,
      iosClientId,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      profileImageSize: 240,
    });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <StatusBar style="dark" />
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
          <TouchableOpacity
            disabled={isLoading}
            style={styles.buttonLogin}
            onPress={() => signIn()}
          >
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
      {isLoading && <Loading />}
    </>
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
