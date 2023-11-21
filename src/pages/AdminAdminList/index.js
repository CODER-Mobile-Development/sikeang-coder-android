import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  MemberListView, NavbarBottom, NavbarTop, PrimaryButton,
} from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminAdminList() {
  const isFocused = useIsFocused();
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
      {isFocused && <StatusBar style="dark" />}
      <NavbarTop title="Data Admin" noButton />
      <View style={styles.wrapper}>
        <ScrollView style={styles.content}>
          <View style={{ gap: 10, paddingVertical: 20 }}>
            <MemberListView
              photo="https://source.unsplash.com/random/120x120/?fruit"
              name="Mochammad Andi Divangga Pratama"
              email="andi.divangga.21@student.if.ittelkom-sby.ac.id"
            />
            <MemberListView
              photo="https://source.unsplash.com/random/120x120/?fruit"
              name="Irvan Surya Nugraha"
              email="irvansurya1@gmail.com"
            />
            <MemberListView
              photo="https://source.unsplash.com/random/120x120/?fruit"
              name="Rayhan Furqoni"
              email="rayhan.furqoni.21@student.if.ittelkom-sby.ac.id"
            />
            <MemberListView
              photo="https://source.unsplash.com/random/120x120/?fruit"
              name="Moch. Andi Divangga"
              email="andi@gmail.com"
            />
            <MemberListView
              photo="https://source.unsplash.com/random/120x120/?fruit"
              name="Moch. Andi Divangga"
              email="andi@gmail.com"
            />
            <MemberListView
              photo="https://source.unsplash.com/random/120x120/?fruit"
              name="Moch. Andi Divangga"
              email="andi@gmail.com"
            />
            <MemberListView
              photo="https://source.unsplash.com/random/120x120/?fruit"
              name="Moch. Andi Divangga"
              email="andi@gmail.com"
            />
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 35, marginVertical: 10 }}>
          <PrimaryButton title="Tambah Admin" />
        </View>
      </View>
      <NavbarBottom type="Admin" isActive="Event" />
    </View>
  );
}

export default AdminAdminList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  Tagline: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 35,
    // paddingTop: 20,
  },
});
