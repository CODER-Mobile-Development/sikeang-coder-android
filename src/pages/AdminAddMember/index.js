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

function AdminAddMember() {
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
      <NavbarTop title="Tambah Anggota" />
      <View style={styles.wrapper}>
        <View style={{ marginTop: 20 }}>
          <UserInput type="Basic" label="Nama Lengkap" />
          <Separator height={14} />
          <UserInput type="Basic" label="Alamat Email" />
          <Separator height={14} />
          <UserInput type="Basic" label="Program Studi" />
          <Separator height={14} />
          <UserInput type="Dropdown" label="Nama Divisi" />
          <Separator height={14} />
          <UserInput type="Dropdown" label="Jabatan Devisi" />
          <Separator height={40} />
          <PrimaryButton title="Simpan Perubahan" />
        </View>
      </View>
      <NavbarBottom type="Admin" />
    </View>
  );
}

export default AdminAddMember;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 35,
  },
  AddPadding: {
    padding: 20,
  },
});
