import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  ScrollView, StyleSheet, Text, View, Dimensions,
} from 'react-native';
import {
  NavbarBottom, Separator, UserTab, EventOption, EventListView,
} from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

const windowWidth = Dimensions.get('window').width;

function MemberEvent() {
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
          points="100"
          type="Member"
        />
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>Tipe Event</Text>
        <View style={styles.frameParent}>
          <EventOption optionText="Divisi" />
          <EventOption optionText="Umum" />
        </View>
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginTop: 12 }}>Waktu Event</Text>
        <View style={styles.frameParent}>
          <EventOption optionText="Mendatang" />
          <EventOption optionText="Berlangsung" />
          <EventOption optionText="Selesai" />
        </View>
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginTop: 12 }}>Daftar Event</Text>
      </View>
      <ScrollView style={styles.content}>
        <EventListView name="Playbox" date="Kamis, 12 Oktober 2023" />
        <Separator height={8} />
        <EventListView name="Playbox" date="Kamis, 12 Oktober 2023" />
        <Separator height={8} />
        <EventListView name="Playbox" date="Kamis, 12 Oktober 2023" />
        <Separator height={8} />
        <EventListView name="Playbox" date="Kamis, 12 Oktober 2023" />
        <Separator height={8} />
        <EventListView name="Playbox" date="Kamis, 12 Oktober 2023" />
        <Separator height={8} />
        <EventListView name="Playbox" date="Kamis, 12 Oktober 2023" />
        <Separator height={8} />
      </ScrollView>
      <NavbarBottom isActive="Home" type="Member" />
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
    marginTop: '84%',
  },
  frameParent: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
});
