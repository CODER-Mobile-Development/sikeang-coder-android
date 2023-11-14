import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Dimensions, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import {
  DashboardCounter, DivisionMemberCounter, NavbarBottom, UserTab,
} from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

const windowWidth = Dimensions.get('window').width;

function AdminHome({ route }) {
  const { userData, userToken } = route.params;
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
          division={userData.division.divisionName}
          imageUri={userData.profilePicture}
          name={userData.userName}
          type="Admin"
        />
        <DashboardCounter
          style={{ marginBottom: 23 }}
          presencePoint={10}
          committeePoint={30}
          rigthTitle="anggota"
          leftTitle="divisi"
        />
        <Text style={styles.titleList}>Daftar Divisi</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={{ gap: 5 }}>
          <DivisionMemberCounter memberCounter={20} divisonTitle="Divisi Mobile" />
          <DivisionMemberCounter memberCounter={31} divisonTitle="Playbox Season 100" />
          <DivisionMemberCounter memberCounter={31} divisonTitle="Playbox Season 100" />
          <DivisionMemberCounter memberCounter={31} divisonTitle="Playbox Season 100" />
          <DivisionMemberCounter memberCounter={31} divisonTitle="Playbox Season 100" />
        </View>
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
    paddingHorizontal: 35,
  },
  titleList: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});
