import React, { useCallback, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Clipboard from 'expo-clipboard';
import {
  Dimensions, ScrollView, Text, View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { NavbarTop, PrimaryButton } from '../../components';
import {
  API_HOST, CallAPI, getData, showToast,
} from '../../utils';

const simpleLogo = require('../../assets/simple-logo.png');
const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function PresenceQR({ route }) {
  const { eventId, eventName } = route.params;
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [presenceToken, setPresenceToken] = useState('');

  useFocusEffect(
    useCallback(() => {
      let isFocused = true;

      const getPresenceToken = () => {
        CallAPI({
          url: `${API_HOST}/point-transaction/attendance-token/${eventId}`,
          method: 'GET',
          data: null,
        })
          .then((r) => {
            setPresenceToken(r.token);
            showToast(
              'Berhasil mengambil token presensi!',
              'success',
              insets.top,
            );

            setTimeout(() => {
              if (isFocused) {
                getPresenceToken();
              }
            }, 10000);
          })
          .catch(() => showToast(
            'Gagal mengambil token presensi!',
            'danger',
            insets.top,
          ));
      };

      getPresenceToken();

      return () => {
        isFocused = false;
      };
    }, []),
  );

  const handlingCopyURL = async () => {
    const userToken = await getData('user-token');
    Clipboard.setStringAsync(`${API_HOST}/view?eventId=${eventId}&userToken=${userToken}&baseURL=${encodeURIComponent(API_HOST)}`)
      .then(() => showToast(
        'Berhasil salin link presensi, silahkan tempel link di browser!',
        'success',
        insets.top,
      ))
      .catch(() => showToast(
        'Gagal salin link presensi, silahkan coba beberapa saat lagi!',
        'danger',
        insets.top,
      ));
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1, backgroundColor: 'white' }}>
      <NavbarTop title="QR Presensi" />
      <ScrollView style={{ paddingHorizontal: 35, paddingVertical: 10 }}>
        <Text style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 24,
          marginTop: 11,
          textAlign: 'center',
          marginBottom: 10,
        }}
        >
          {eventName}
        </Text>
        {presenceToken && (
        <QRCode
          size={windowWidth - 70}
          value={presenceToken}
          logo={simpleLogo}
        />
        )}
        <Text style={{ marginTop: 20, fontFamily: 'Poppins-Medium', textAlign: 'center' }}>
          Catatan: Klik tombol "Copy Link Web" untuk membuka QR Code melalui website.
          Mohon berhati-hati untuk copy paste link, karena link tersebut mengandung kredensial.
        </Text>
      </ScrollView>
      <View style={{ paddingVertical: 10, paddingHorizontal: 35 }}>
        <PrimaryButton onPress={handlingCopyURL} title="Copy Link Web" />
      </View>
    </View>
  );
}

export default PresenceQR;
