import React, { useCallback } from 'react';
import {
  StyleSheet, Text, View, ScrollView
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { MemberSelectCommittee, NavbarBottom, NavbarTop, SearchBar, Separator} from '../../components';

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
        <NavbarTop title={"Daftar Panitia"}/>
        <View style={styles.wrapper}>
            <View style={{ gap: 10 }}>
                <SearchBar placeholder={"cari nama anggota"}/>
                <Text style={styles.Tagline}>
                    Daftar Anggota
                </Text>
                <MemberSelectCommittee name={"Moch. Andi Divangga P."} email={"andi@gmail.com"} style={{marginHorizontal: 20}}/>
            </View>
        </View>
        <NavbarBottom type="Admin"/>
    </View>
  )}


export default AdminAddCommittee;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 35,
        justifyContent: 'space-between',
        paddingVertical: 30,
        backgroundColor: 'white',
      },
    Tagline: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        marginTop: 20,
        paddingHorizontal: 50
    }
})