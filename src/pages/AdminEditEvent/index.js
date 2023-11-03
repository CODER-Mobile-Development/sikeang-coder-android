import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  NavbarBottom, NavbarTop, PrimaryButton, Separator, UserInput,
} from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminEditEvent() {
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
      <NavbarTop title="Edit Acara" />
      <View style={styles.wrapper}>
        <ScrollView style={styles.content}>
          <UserInput type="Basic" label="Nama Acara" />
          <Separator height={14} />
          <UserInput type="Basic" label="Tanggal Mulai" />
          <Separator height={14} />
          <UserInput type="Basic" label="Tanggal Selesai" />
          <Separator height={14} />
          <UserInput type="TextArea" label="Deskripsi" />
          <Separator height={14} />
          <UserInput type="Basic" label="Foto" />
          <Separator height={14} />
          <UserInput type="Dropdown" label="Jenis Acara" />
          <Separator height={40} />
          <PrimaryButton title="Simpan Perubahan" />
          <Separator height={40} />
        </ScrollView>
      </View>
      <NavbarBottom type="Admin" isActive="Event" />
    </View>
  );
}

export default AdminEditEvent;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 35,
  },
});
