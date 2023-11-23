import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  NavbarBottom, NavbarTop, PrimaryButton, Separator, UserInput,
} from '../../components';
import { API_HOST, CallAPI, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminAddEvent({ navigation }) {
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [divisionName, setDivisionName] = useState('');

  const addDivision = (data) => {
    CallAPI({ url: `${API_HOST}/division`, method: 'POST', data })
      .then(() => {
        navigation.navigate('AdminHomeScreen', { refresh: true });
        showToast(
          'Berhasil membuat data Divisi baru!',
          'success',
          insets.top,
        );
      })
      .catch((e) => {
        showToast(`Error: ${e.message}`, 'danger');
      });
  };

  const onSubmit = () => {
    const errorFields = [];
    if (!divisionName) errorFields.push('• Nama Divisi wajib diisi!');

    if (errorFields.length > 0) {
      return showToast(
        `Error:\n${errorFields.join('\n')}`,
        'danger',
        insets.top,
      );
    }

    return addDivision({ divisionName });
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
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavbarTop title="Tambah Divisi" />
      <View style={styles.wrapper}>
        <ScrollView style={styles.content}>
          <UserInput
            value={divisionName}
            type="Basic"
            label="Nama Divisi"
            onChange={(val) => setDivisionName(val)}
          />
          <Separator height={40} />
          <PrimaryButton title="Tambah Divisi" onPress={onSubmit} />
          <Separator height={40} />
        </ScrollView>
      </View>
      <NavbarBottom type="Admin" />
    </View>
  );
}

export default AdminAddEvent;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 35,
  },
});
