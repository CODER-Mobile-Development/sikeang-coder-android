import React, { useCallback, useState } from 'react';
import {
  RefreshControl, ScrollView, StyleSheet, View,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  MemberListView, NavbarBottom, NavbarTop, PrimaryButton,
} from '../../components';
import { API_HOST, CallAPI, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminAdminList({ navigation }) {
  const isFocused = useIsFocused();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState([]);

  const getAdminUser = () => {
    setRefreshing(true);
    CallAPI({ url: `${API_HOST}/user?query=position&value=admin`, method: 'GET', data: null })
      .then((r) => {
        setRefreshing(false);
        const { users } = r;
        setUserData(users);
      })
      .catch((e) => {
        setRefreshing(false);
        showToast(`Error: ${e.message}`, 'danger');
      });
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      getAdminUser();
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {isFocused && <StatusBar style="dark" />}
      <NavbarTop title="Data Admin" noButton />
      <View style={styles.wrapper}>
        <ScrollView
          refreshControl={(<RefreshControl refreshing={refreshing} onRefresh={getAdminUser} />)}
        >
          <View style={{ gap: 10, paddingVertical: 20, paddingHorizontal: 35 }}>
            {userData.map((item) => (
              <MemberListView
                key={item._id}
                photo={item.profilePicture}
                name={item.userName}
                email={item.email}
              />
            ))}
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 35, marginVertical: 10 }}>
          <PrimaryButton title="Tambah Admin" onPress={() => navigation.navigate('AdminAddAdmin')} />
        </View>
      </View>
      <NavbarBottom type="Admin" isActive="Event" />
    </View>
  );
}

export default AdminAdminList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  Tagline: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 35,
    // paddingTop: 20,
  },
});
