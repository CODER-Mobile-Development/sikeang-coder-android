import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  NavbarBottom, NavbarTop, PrimaryButton, Separator, UserInput,
} from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminAddEvent() {
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
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <View style={styles.wrapper}>
        <NavbarTop title="Tambah Acara" />
        <View style={styles.AddPadding}>
          <UserInput type="Basic" label="Nama Acara" />
          <Separator />
          <UserInput type="Basic" label="Tanggal Mulai" />
          <Separator />
          <UserInput type="Basic" label="Tanggal Selesai" />
          <Separator />
          <UserInput type="TextArea" label="Deskripsi" />
          <Separator />
          <UserInput type="Basic" label="Foto" />
          <Separator />
          <UserInput type="Dropdown" label="Jenis Acara" />
          <Separator height={25} />
          <PrimaryButton title="Simpan Perubahan" />
          <Separator />
        </View>
        <NavbarBottom type="Admin" />
      </View>
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
  AddPadding: {
    padding: 20,
  },
});
