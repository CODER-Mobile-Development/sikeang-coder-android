import React, { useCallback } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  ManualAttendanceCard, NavbarBottom, NavbarTop, SearchBar,
} from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminManualAttendance() {
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
      <NavbarTop title="Presensi Manual" />
      <View style={styles.wrapper}>
        <View style={{ paddingHorizontal: 35 }}>
          <View style={{ paddingVertical: 20 }}>
            <SearchBar placeholder="cari nama anggota" />
          </View>
          <Text style={styles.titleText}>
            Daftar Peserta
          </Text>
        </View>
        <ScrollView style={styles.content}>
          <View style={{ gap: 10, paddingBottom: 20 }}>
            <ManualAttendanceCard
              photo="https://source.unsplash.com/random/120x120/?fruit"
              name="Moch. Andi Divangga P."
              email="andi@gmail.com"
            />
            <ManualAttendanceCard
              photo="https://source.unsplash.com/random/120x120/?animal"
              name="Moch. Andi Divangga P."
              email="andi@gmail.com"
            />
            <ManualAttendanceCard
              photo="https://source.unsplash.com/random/120x120/?mountain"
              name="Moch. Andi Divangga P."
              email="andi@gmail.com"
            />
            <ManualAttendanceCard
              photo="https://source.unsplash.com/random/120x120/?food"
              name="Moch. Andi Divangga P."
              email="andi@gmail.com"
            />
          </View>
        </ScrollView>
      </View>
      <NavbarBottom type="Admin" isActive="Event" />
    </View>
  );
}

export default AdminManualAttendance;

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
