import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { TouchableOpacity } from 'react-native';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';

import {
  NavbarTop, PrimaryButton, Separator, NavbarBottom
} from '../../components';

import {
  CalendarIcon, OrganizationLogoHorizontal
} from '../../assets/svgs';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminPointDetailEvent() {
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
    <ScrollView contentContainerStyle={styles.wrapper} onLayout={onLayoutRootView}>
      <NavbarTop/>
      <Separator height={55} />
      <View style={styles.container}>
         <View style={styles.box}>
            <OrganizationLogoHorizontal/>
         </View>
         <View>
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24, marginTop: 11 }}>Rapat Anggota</Text>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, textAlign: 'center'  }}>
          <CalendarIcon width={12} height={12} /> Kamis, 12 Oktober 2023</Text>
         </View>
         <View>
            <Text style={{ fontFamily: 'Poppins-semiBold', fontSize: 14, marginTop: 27, marginLeft: 35 }}>Deskripsi Acara</Text>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 4, marginLeft: 35, marginRight: 35 }}>Rapat ini akan membahas tentang core componen react native. Diharapkan telah menginstall vscode dan node js.</Text>
            <Text style={{ fontFamily: 'Poppins-semiBold', fontSize: 14, marginTop: 10, marginLeft: 35 }}>Tempat Acara</Text>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 4, marginLeft: 35, marginBottom: 79 }}>Google Meet</Text>
         </View>
      </View>
      <View style={styles.button}>
         <PrimaryButton title="Lihat Panitia" />
      </View>
        <Separator height={12} />
      <NavbarBottom type="Admin" isActive="Poin"/>
    </ScrollView>
  );
}

export default AdminPointDetailEvent;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 293,
    height: 296,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#B31217',
  },
  button:{
    paddingHorizontal: 36,
  },
});
