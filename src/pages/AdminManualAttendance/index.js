import React, { useCallback } from 'react';
import {
  StyleSheet, Text, View, ScrollView
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ManualAttendanceCard, NavbarBottom, NavbarTop, SearchBar, Separator } from '../../components';

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
        <NavbarTop title={"Presensi Manual"}/>
        <View style={styles.wrapper}>
            <ScrollView style={styles.content}>
                <SearchBar placeholder={"cari nama anggota"}/>
                <Separator height={21}/>
                <Text style={styles.Tagline}>
                    Daftar Peserta
                </Text>
                <Separator height={11}/>
                <ManualAttendanceCard name={"Moch. Andi Divangga P."} email={"andi@gmail.com"} style={{marginHorizontal: 20}}/>
            </ScrollView>
        </View>
        <NavbarBottom type="Admin" isActive="Event"/>
    </View>
  )}


export default AdminManualAttendance;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
      },
    Tagline: {
        fontSize: 16,
        fontWeight: 'Bold',
    },
    content: {
        marginTop: 20,
        paddingHorizontal: 50
    }
})