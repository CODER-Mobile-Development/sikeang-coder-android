import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Image, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { NavbarBottom, NavbarTop, PrimaryButton } from '../../components';
import { SmallCalendarIcon } from '../../assets/svgs';

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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <NavbarTop title="Event" />
      <ScrollView style={styles.wrapper} onLayout={onLayoutRootView}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image
            style={{ borderRadius: 12 }}
            height={293}
            width={293}
            source={{ uri: 'https://source.unsplash.com/random/120x120/?fruit' }}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.eventTitle}>Rapat Anggota</Text>
          <View style={styles.eventDate}>
            <SmallCalendarIcon />
            <Text style={styles.eventDateText}>
              Kamis, 12 Oktober 2023
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 27 }}>
          <Text style={styles.descriptionTitle}>
            Deskripsi Acara
          </Text>
          <Text style={styles.descriptionText}>
            Rapat ini akan membahas tentang core componen react native.
            Diharapkan telah menginstall vscode dan node js.pat ini akan
            membahas tentang core componen react native.
            Diharapkan telah menginstall vscode dan node js.pat ini aka
            n membahas tentang core componen react native.
            Diharapkan telah menginstall vscode dan node js.pat ini
            akan membahas tentang core componen react native.
            Diharapkan telah menginstall vscode dan node js.pat ini akan m
            embahas tentang core componen react native.
            Diharapkan telah menginstall vscode dan node js.pat ini akan
            membahas tentang core componen react native.
            Diharapkan telah menginstall vscode dan node js.pat ini akan memb
            ahas tentang core componen react native.
            Diharapkan telah menginstall vscode dan node js.
          </Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.descriptionTitle}>Tempat Acara</Text>
          <Text style={styles.descriptionText}>Google Meet</Text>
        </View>
      </ScrollView>
      <View style={{ marginVertical: 10, paddingHorizontal: 35, gap: 7 }}>
        <PrimaryButton title="Lihat Panitia" />
      </View>
      <NavbarBottom type="Admin" isActive="Poin" />
    </View>
  );
}

export default AdminPointDetailEvent;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 35,
  },
  eventTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginTop: 11,
  },
  eventDate: {
    flexDirection: 'row',
    gap: 7,
    justifyContent: 'center',
  },
  eventDateText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    textAlign: 'center',
    color: '#414141',
  },
  descriptionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  descriptionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginTop: 4,
  },
});
