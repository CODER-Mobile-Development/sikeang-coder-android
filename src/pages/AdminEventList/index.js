import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Dimensions, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import {
  EventListView, NavbarBottom, SearchBar, Separator, UserTab,
} from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

const windowWidth = Dimensions.get('window').width;

function AdminEventList() {
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
      <View>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
          <View style={{
            marginTop: -88,
            width: windowWidth - (windowWidth / 2),
            height: windowWidth - (windowWidth / 2),
            backgroundColor: '#B81519',
            borderRadius: 320,
            transform: [
              { scaleX: 3.5 },
            ],
          }}
          />
        </View>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
          <View style={{
            marginTop: -136,
            width: windowWidth - (windowWidth / 2),
            height: windowWidth - (windowWidth / 2),
            backgroundColor: '#C13338',
            borderRadius: 320,
            transform: [
              { scaleX: 3.5 },
            ],
          }}
          />
        </View>
      </View>
      <View style={{
        paddingHorizontal: 35,
        marginTop: 64,
        justifyContent: 'center',
      }}
      >
        <UserTab
          style={{ marginBottom: 33 }}
          division="Mobile Development"
          imageUri="https://source.unsplash.com/random/120x120/?fruit"
          name="Irvan Surya Nugraha"
          points="100"
          type="Admin"
        />
        <SearchBar placeholder="cari nama acara" />
        <Separator height={30} />
        <Text style={styles.titleList}>Daftar Acara</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={{ gap: 5 }}>
          <EventListView name="Rapat Anggota" imageUri="https://source.unsplash.com/random/120x120/?fruit" date="Kamis, 12 Oktober 2023" />
          <EventListView name="Rapat Anggota" imageUri="https://source.unsplash.com/random/120x120/?fruit" date="Kamis, 12 Oktober 2023" />
          <EventListView name="Rapat Anggota" imageUri="https://source.unsplash.com/random/120x120/?fruit" date="Kamis, 12 Oktober 2023" />
          <EventListView name="Rapat Anggota" imageUri="https://source.unsplash.com/random/120x120/?fruit" date="Kamis, 12 Oktober 2023" />
          <EventListView name="Rapat Anggota" imageUri="https://source.unsplash.com/random/120x120/?fruit" date="Kamis, 12 Oktober 2023" />
          <EventListView name="Rapat Anggota" imageUri="https://source.unsplash.com/random/120x120/?fruit" date="Kamis, 12 Oktober 2023" />
          <EventListView name="Rapat Anggota" imageUri="https://source.unsplash.com/random/120x120/?fruit" date="Kamis, 12 Oktober 2023" />
          <EventListView name="Rapat Anggota" imageUri="https://source.unsplash.com/random/120x120/?fruit" date="Kamis, 12 Oktober 2023" />
          <EventListView name="Rapat Anggota" imageUri="https://source.unsplash.com/random/120x120/?fruit" date="Kamis, 12 Oktober 2023" />
          <EventListView name="Rapat Anggota" imageUri="https://source.unsplash.com/random/120x120/?fruit" date="Kamis, 12 Oktober 2023" />
          <EventListView name="Rapat Anggota" imageUri="https://source.unsplash.com/random/120x120/?fruit" date="Kamis, 12 Oktober 2023" />
          <EventListView name="Rapat Anggota" imageUri="https://source.unsplash.com/random/120x120/?fruit" date="Kamis, 12 Oktober 2023" />
        </View>
      </ScrollView>
      <NavbarBottom isActive="Home" type="Admin" />
    </View>
  );
}

export default AdminEventList;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    paddingHorizontal: 35,
  },
  titleList: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});
