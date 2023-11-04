import React, { useCallback } from 'react';
import {
  StyleSheet, View, ScrollView
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { MemberListView, NavbarBottom, NavbarTop, PrimaryButton, Separator } from '../../components';

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
            <ScrollView style={styles.content}>
              <MemberListView name={"Moch. Andi Divangga"} email={"andi@gmail.com"}/>
              <Separator height={13}/>
              <MemberListView name={"Moch. Andi Divangga"} email={"andi@gmail.com"}/>
              <Separator height={452}/>
              <PrimaryButton title={"Tambah Admin"}/>
            </ScrollView>
        </View>
        <NavbarBottom type="Admin" isActive="Event"/>
    </View>
  )}


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
      margin: 20,
      paddingHorizontal: 50
    }
})