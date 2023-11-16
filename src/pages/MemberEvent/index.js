import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Dimensions, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { EventListView, EventOption, UserTab } from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

const windowWidth = Dimensions.get('window').width;

function MemberEvent({ navigation }) {
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
        position: 'absolute',
      }}
      >
        <UserTab
          style={{ marginBottom: 24 }}
          division="Mobile Development"
          imageUri="https://source.unsplash.com/random/120x120/?fruit"
          name="Irvan Surya Nugraha"
          points="250"
          type="Member"
        />
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>Tipe Event</Text>
        <View style={styles.frameParent}>
          <ScrollView style={{ flexDirection: 'row' }} horizontal>
            <EventOption optionText="Divisi" />
            <EventOption optionText="Umum" />
          </ScrollView>
        </View>
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginTop: 12 }}>Waktu Event</Text>
        <View style={styles.frameParent}>
          <ScrollView style={{ flexDirection: 'row' }} horizontal>
            <EventOption optionText="Mendatang" />
            <EventOption optionText="Berlangsung" />
            <EventOption optionText="Selesai" />
          </ScrollView>
        </View>
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginTop: 12 }}>Daftar Event</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={{ gap: 5 }}>
          <EventListView imageUri="https://source.unsplash.com/random/120x120/?fruit" name="Playbox" date="Kamis, 12 Oktober 2023" />
          <EventListView imageUri="https://source.unsplash.com/random/120x120/?fruit" name="Playbox" date="Kamis, 12 Oktober 2023" />
          <EventListView imageUri="https://source.unsplash.com/random/120x120/?fruit" name="Playbox" date="Kamis, 12 Oktober 2023" />
          <EventListView imageUri="https://source.unsplash.com/random/120x120/?fruit" name="Playbox" date="Kamis, 12 Oktober 2023" />
          <EventListView imageUri="https://source.unsplash.com/random/120x120/?fruit" name="Playbox" date="Kamis, 12 Oktober 2023" />
          <EventListView imageUri="https://source.unsplash.com/random/120x120/?fruit" name="Playbox" date="Kamis, 12 Oktober 2023" />
          <EventListView imageUri="https://source.unsplash.com/random/120x120/?fruit" name="Playbox" date="Kamis, 12 Oktober 2023" />
          <EventListView imageUri="https://source.unsplash.com/random/120x120/?fruit" name="Playbox" date="Kamis, 12 Oktober 2023" />
        </View>
      </ScrollView>
    </View>
  );
}

export default MemberEvent;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    paddingHorizontal: 35,
    marginTop: 320,
  },
  frameParent: {
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
});
