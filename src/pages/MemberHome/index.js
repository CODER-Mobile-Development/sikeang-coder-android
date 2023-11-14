import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Dimensions, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import {
  DashboardCounter, MemberPointHistory, NavbarBottom, UserTab,
} from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

const windowWidth = Dimensions.get('window').width;

function MemberHome({ route }) {
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
        position: 'absolute',
      }}
      >
        <UserTab
          style={{ marginBottom: 33 }}
          division={userData.division.divisionName}
          imageUri={userData.profilePicture}
          name={userData.userName}
          points="100"
          type="Member"
        />
        <DashboardCounter
          style={{ marginBottom: 23 }}
          presencePoint={10}
          committeePoint={30}
          leftTitle="presensi"
          rigthTitle="kepanitiaan"
        />
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginBottom: 11 }}>Riwayat Poin</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={{ gap: 5 }}>
          <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
          <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
          <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
          <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
          <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
          <MemberPointHistory pointEarned={10} eventDate="Kamis, 12 Oktober 2023" eventTitle="Rapat Anggota" />
        </View>
      </ScrollView>
      <NavbarBottom isActive="Home" type="Member" />
    </View>
  );
}

export default MemberHome;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    paddingHorizontal: 35,
    marginTop: '80%',
  },
});
