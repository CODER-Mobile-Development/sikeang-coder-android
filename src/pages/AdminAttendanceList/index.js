import React, { useCallback } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  MemberListView, NavbarBottom, NavbarTop, PrimaryButton, SearchBar,
} from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminAttendanceList({ navigation }) {
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
      <NavbarTop title="Data Presensi" />
      <View style={styles.wrapper}>
        <View style={{ paddingHorizontal: 35 }}>
          <View style={{ paddingVertical: 20 }}>
            <SearchBar placeholder="cari nama peserta" />
          </View>
          <Text style={styles.titleText}>Daftar Peserta</Text>
        </View>
        <ScrollView style={styles.content}>
          <View style={{ gap: 10, paddingBottom: 20 }}>
            <MemberListView name="Dito" email="dito@example.com" photo="https://source.unsplash.com/random/120x120/?fruit" />
            <MemberListView name="Dito" email="dito@example.com" photo="https://source.unsplash.com/random/120x120/?fruit" />
            <MemberListView name="Dito" email="dito@example.com" photo="https://source.unsplash.com/random/120x120/?fruit" />
            <MemberListView name="Dito" email="dito@example.com" photo="https://source.unsplash.com/random/120x120/?fruit" />
            <MemberListView name="Dito" email="dito@example.com" photo="https://source.unsplash.com/random/120x120/?fruit" />
            <MemberListView name="Dito" email="dito@example.com" photo="https://source.unsplash.com/random/120x120/?fruit" />
            <MemberListView name="Dito" email="dito@example.com" photo="https://source.unsplash.com/random/120x120/?fruit" />
            <MemberListView name="Dito" email="dito@example.com" photo="https://source.unsplash.com/random/120x120/?fruit" />
            <MemberListView name="Dito" email="dito@example.com" photo="https://source.unsplash.com/random/120x120/?fruit" />
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 35, marginVertical: 10 }}>
          <PrimaryButton title="Presensi Manual" onPress={() => navigation.navigate('AdminManualAttendance')} />
        </View>
      </View>
      <NavbarBottom type="Admin" isActive="Event" />
    </View>
  );
}

export default AdminAttendanceList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  content: {
    marginTop: 5,
    paddingHorizontal: 35,
  },
  titleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});
