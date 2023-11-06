import React, { useCallback } from 'react';
import {
  Image, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavbarTop, PrimaryButton } from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function MemberProfile() {
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
      <NavbarTop title="Profile" />
      <View style={styles.wrapper}>
        <View style={styles.profileWrapper}>
          <Image
            source={{ uri: 'https://source.unsplash.com/random/120x120/?fruit' }}
            width={40}
            height={40}
            style={{ borderRadius: 20, marginRight: 10 }}
          />
          <Text style={{ fontSize: 15, fontFamily: 'Poppins-Bold' }}>Irvan Surya Nugraha</Text>
        </View>
        <ScrollView style={styles.content}>

          <View style={styles.itemWrapper}>
            <View style={{ width: '30%' }}>
              <Text style={styles.titleText}>Alamat Email</Text>
            </View>
            <View style={{ width: '70%' }}>
              <Text style={styles.valueText} ellipsizeMode="tail" numberOfLines={2}>irvan.surya.21@student.if.ittelkom-sby.ac.id</Text>
            </View>
          </View>

          <View style={styles.itemWrapper}>
            <View style={{ width: '30%' }}>
              <Text style={styles.titleText}>Program Studi</Text>
            </View>
            <View style={{ width: '70%' }}>
              <Text style={styles.valueText} ellipsizeMode="tail" numberOfLines={2}>INFORMATIKA</Text>
            </View>
          </View>

          <View style={styles.itemWrapper}>
            <View style={{ width: '30%' }}>
              <Text style={styles.titleText}>Nama Divisi</Text>
            </View>
            <View style={{ width: '70%' }}>
              <Text style={styles.valueText} ellipsizeMode="tail" numberOfLines={2}>Mobile Development</Text>
            </View>
          </View>

          <View style={styles.itemWrapper}>
            <View style={{ width: '30%' }}>
              <Text style={styles.titleText}>Jabatan Divisi</Text>
            </View>
            <View style={{ width: '70%' }}>
              <Text style={styles.valueText} ellipsizeMode="tail" numberOfLines={2}>Anggota</Text>
            </View>
          </View>

        </ScrollView>
        <View style={styles.logoutWrapper}>
          <PrimaryButton title="Logout" />
          <Text style={styles.versionText}>Versi 1.0.0</Text>
        </View>
      </View>

    </View>
  );
}

export default MemberProfile;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 35,
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 35,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  titleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  valueText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    textAlign: 'right',
  },
  versionText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 38,
  },
  logoutWrapper: {
    paddingHorizontal: 35,
  },
});
