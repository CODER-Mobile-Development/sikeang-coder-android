import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Loading, MemberListView, NavbarBottom, NavbarTop, PrimaryButton, SearchBar,
} from '../../components';
import { API_HOST, CallAPI, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminAttendanceList({ route, navigation }) {
  const { eventId } = route.params;
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const getUsersAttendingAPI = () => {
    setLoadingScreen(true);
    CallAPI({
      url: `${API_HOST}/point-transaction/attendance-status?eventId=${eventId}&status=true`,
      method: 'GET',
      data: null,
    })
      .then((r) => {
        const { users } = r;
        setUsersData(users);
        setLoadingScreen(false);
      })
      .catch(() => {
        showToast('Gagal mendapatkan data presensi, silahkan coba beberapa saat lagi!', 'danger', insets.top);
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    getUsersAttendingAPI();
  }, []);

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
      <NavbarTop title="Data Presensi" />
      <View style={styles.wrapper}>
        <View style={{ paddingHorizontal: 35 }}>
          <View style={{ paddingVertical: 20 }}>
            <SearchBar placeholder="cari nama partisipan" />
          </View>
          <Text style={styles.titleText}>Daftar Partisipan</Text>
        </View>
        <ScrollView style={styles.content}>
          <View style={{ gap: 10, paddingBottom: 20 }}>
            {usersData.length < 1 && (
            <Text style={styles.textZeroData}>
              Belum ada yang melakukan presensi.
            </Text>
            )}
            {usersData.map((item) => (
              <MemberListView
                name={item.userName}
                email={item.email}
                photo={item.profilePicture}
                studyProgram={item.studyProgram}
              />
            ))}
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 35, marginVertical: 10 }}>
          <PrimaryButton title="Presensi Manual" onPress={() => navigation.navigate('AdminManualAttendance', { eventId })} />
        </View>
      </View>
      {loadingScreen && <Loading />}
      <NavbarBottom type="Admin" isActive="Event" />
    </View>
  );
}

export default AdminAttendanceList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  content: {
    marginTop: 5,
    paddingHorizontal: 35,
  },
  titleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  textZeroData: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: 100,
  },
});
