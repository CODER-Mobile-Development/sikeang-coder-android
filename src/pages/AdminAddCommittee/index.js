import React, { useCallback } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  MemberSelectCommittee, NavbarBottom, NavbarTop, PrimaryButton, SearchBar,
} from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminAddCommittee() {
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
      <NavbarTop title="Daftar Panitia" />
      <View style={styles.wrapper}>
        <View style={{ paddingHorizontal: 35 }}>
          <View style={{ paddingVertical: 20 }}>
            <SearchBar placeholder="cari nama anggota" />
          </View>
          <Text style={styles.titleText}>
            Daftar Anggota
          </Text>
        </View>
        <ScrollView style={styles.content}>
          <View style={{ gap: 10, paddingBottom: 20 }}>
            <MemberSelectCommittee
              imageUri="https://source.unsplash.com/random/120x120/?fruit"
              name="Mochammad Andi Divangga Pratama"
              email="andi.divangga.21@student.if.ittelkom-sby.ac.id"
            />
            <MemberSelectCommittee
              imageUri="https://source.unsplash.com/random/120x120/?mango"
              name="Irvan Surya Nugraha"
              email="irvansurya1@gmail.com"
            />
            <MemberSelectCommittee
              imageUri="https://source.unsplash.com/random/120x120/?avatar"
              name="Rayhan Furqoni"
              email="rayhan.furqoni.21@student.if.ittelkom-sby.ac.id"
            />
            <MemberSelectCommittee
              imageUri="https://source.unsplash.com/random/120x120/?avatar"
              name="Rayhan Furqoni"
              email="rayhan.furqoni.21@student.if.ittelkom-sby.ac.id"
            />
            <MemberSelectCommittee
              imageUri="https://source.unsplash.com/random/120x120/?avatar"
              name="Rayhan Furqoni"
              email="rayhan.furqoni.21@student.if.ittelkom-sby.ac.id"
            />
            <MemberSelectCommittee
              imageUri="https://source.unsplash.com/random/120x120/?avatar"
              name="Rayhan Furqoni"
              email="rayhan.furqoni.21@student.if.ittelkom-sby.ac.id"
            />
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 35, marginVertical: 10 }}>
          <PrimaryButton title="Simpan Perubahan" />
        </View>
      </View>
      <NavbarBottom type="Admin" isActive="Event" />
    </View>
  );
}

export default AdminAddCommittee;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  content: {
    marginTop: 5,
    paddingHorizontal: 35,
  },
});
