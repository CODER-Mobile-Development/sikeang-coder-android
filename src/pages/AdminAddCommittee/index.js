import React, { useCallback } from 'react';
import {
  StyleSheet, Text, View, ScrollView
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { MemberSelectCommittee, NavbarBottom, NavbarTop, PrimaryButton, SearchBar, Separator} from '../../components';

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
            <ScrollView style={styles.content}>
                <SearchBar placeholder={"cari nama anggota"}/>
                <Separator height={26}/>
                <Text style={styles.Tagline}>
                    Daftar Anggota
                </Text>
                <Separator height={11}/>
                <MemberSelectCommittee name={"Moch. Andi Divangga P."} email={"andi@gmail.com"}/>
                <Separator height={348}/>
                <PrimaryButton title={"Simpan Perubahan"}/>
            </ScrollView>
        </View>
        <NavbarBottom type="Admin" isActive="Event"/>
    </View>
  )}


export default AdminAddCommittee;

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
        marginTop: 20,
        paddingHorizontal: 50
    }
})