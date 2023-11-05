import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import {
  MemberPointHistory, NavbarBottom, Separator, UserTab,
} from '../../components';
import DashboardCounter from '../../components/DashboardCounter';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function MemberHome() {
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
    <View style={styles.wrapper} onLayout={onLayoutRootView}>
      <View style={{
        backgroundColor: '#C13338', height: 200, marginTop: -100, borderRadius: 20,
      }}
      />
      <View style={{
        paddingHorizontal: 35,
        marginTop: 50,
        position: 'absolute',
      }}
      >
        <UserTab
          style={{ marginBottom: 33 }}
          division="Mobile Development"
          imageUri="https://source.unsplash.com/random/120x120/?fruit"
          name="Irvan Surya Nugraha"
          points="100"
          type="Member"
        />
        <DashboardCounter
          style={{ marginBottom: 23 }}
          presencePoint={10}
          committeePoint={30}
        />
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginBottom: 11 }}>Riwayat Poin</Text>
      </View>
      <ScrollView style={styles.content}>
        <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
        <Separator height={8} />
        <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
        <Separator height={8} />
        <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
        <Separator height={8} />
        <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
        <Separator height={8} />
        <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
        <Separator height={8} />
        <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
        <Separator height={8} />
        <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
        <Separator height={8} />
        <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
        <Separator height={8} />
        <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
        <Separator height={8} />
        <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
      </ScrollView>
      <NavbarBottom isActive="Home" type="Member" />
    </View>
  );
}

export default MemberHome;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    paddingHorizontal: 35,
    marginTop: 210,
  },
});
