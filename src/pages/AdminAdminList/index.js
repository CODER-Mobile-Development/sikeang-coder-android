import React, { useCallback } from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { MemberListView, NavbarBottom, NavbarTop, PrimaryButton } from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminAdminList() {
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
        <NavbarTop title={"Data Admin"}/>
        <View style={styles.wrapper}>
            <View style={{ gap: 10 }}>
                <MemberListView name={"Moch. Andi Divangga"} email={"andi@gmail.com"}/>
                <MemberListView name={"Moch. Andi Divangga"} email={"andi@gmail.com"}/>
            </View>
            <PrimaryButton title={"Tambah Admin"}/>
        </View>
        <NavbarBottom type="Admin"/>
    </View>
  )}


export default AdminAdminList;

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
    }
})