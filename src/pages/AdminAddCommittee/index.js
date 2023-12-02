import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Loading, MemberSelectCommittee, NavbarBottom, NavbarTop, SearchBar,
} from '../../components';
import { API_HOST, CallAPI, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminAddCommittee({ route }) {
  const { eventId } = route.params;
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const getCommitteeTransactionStatus = () => {
    setLoadingScreen(true);
    CallAPI({
      url: `${API_HOST}/point-transaction/status?type=committee&eventId=${eventId}&status=all`,
      method: 'GET',
      data: null,
    })
      .then((r) => {
        const { users } = r;
        setUsersData(users);
        setLoadingScreen(false);
      })
      .catch(() => {
        showToast(
          'Gagal mendapatkan data presensi, silahkan coba beberapa saat lagi!',
          'danger',
          insets.top,
        );
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    getCommitteeTransactionStatus();
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
      <NavbarTop title="Ubah Panitia" />
      <View style={styles.wrapper}>
        <View style={{ paddingHorizontal: 35 }}>
          <View style={{ paddingVertical: 20 }}>
            <SearchBar placeholder="cari nama anggota" />
          </View>
          <Text style={styles.titleText}>
            Daftar Anggota
          </Text>
        </View>
        <ScrollView style={styles.content}>
          <View style={{ gap: 10, paddingBottom: 20 }}>
            {usersData.map((item) => (
              <MemberSelectCommittee
                key={item._id}
                imageUri={item.profilePicture}
                name={item.userName}
                email={item.email}
                studyProgram={item.studyProgram}
                status={item.status}
                eventId={eventId}
                userId={item._id}
                setLoadingScreen={(val) => setLoadingScreen(val)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      {loadingScreen && <Loading />}
      <NavbarBottom type="Admin" isActive="Event" />
    </View>
  );
}

export default AdminAddCommittee;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  content: {
    marginTop: 5,
    paddingHorizontal: 35,
  },
});
