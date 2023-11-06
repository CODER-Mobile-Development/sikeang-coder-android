import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  ScrollView, StyleSheet, Text, View, Dimensions,
} from 'react-native';
import {
  NavbarBottom, Separator, UserTab, DivisionMemberCounter, DashboardCounter,
} from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

const windowWidth = Dimensions.get('window').width;

function AdminHome() {
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
        position: '',
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
        <DashboardCounter
          style={{ marginBottom: 23 }}
          presencePoint={10}
          committeePoint={30}
          rigthTitle="anggota"
          leftTitle="divisi"
        />
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginBottom: 11 }}>Daftar Divisi</Text>
      </View>
      <ScrollView style={styles.content}>
        <DivisionMemberCounter memberCounter={20} divisonTitle="Divisi Mobile" />
        <Separator height={8} />
        <DivisionMemberCounter memberCounter={31} divisonTitle="Playbox Season 100" />
        <Separator height={8} />
      </ScrollView>
      <NavbarBottom isActive="Home" type="Admin" />
    </View>
  );
}

export default AdminHome;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    top: 0,
    paddingHorizontal: 35,
  },
});
