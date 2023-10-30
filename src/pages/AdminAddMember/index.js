import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavbarBottom, NavbarTop, PrimaryButton, Separator, UserInput } from '../../components';

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
    <NavbarTop title="Tambah Acara"/>
      <View style={styles.wrapper}>
        <View style={styles.AddPadding}>
          <UserInput type="Basic" label="Nama Lengkap"/>
          <Separator/>
          <UserInput type="Basic" label="Alamat Email"/>
          <Separator/>
          <UserInput type="Basic" label="Program Studi"/>
          <Separator/>
          <UserInput type="Dropdown" label="Nama Devisi"/>
          <Separator/>
          <UserInput type="Dropdown" label="Jabatan Devisi"/>
          <Separator height={50}/>
          <PrimaryButton title="Simpan Perubahan"/>
          <Separator/>
        </View>
        {/* Panggil component di bawah ini */}
        {/* Panggil component di atas ini */}
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
    backgroundColor:'white'
  },
  AddPadding :{
    padding:20,
  }
});
