import React, { useCallback, useEffect, useState } from 'react';
import {
  RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MemberListView, NavbarBottom, NavbarTop, PrimaryButton,
} from '../../components';
import { API_HOST, CallAPI, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminAdminList({ navigation }) {
  const insets = useSafeAreaInsets();
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
        showToast(
          `Error: ${e.message}`,
          'danger',
          insets.top,
        );
      });
  };

  useEffect(() => {
    if (isFocused) {
      getAdminUser();
    }
  }, [isFocused]);

  useEffect(() => {
    getAdminUser();
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
      {isFocused && <StatusBar style="dark" />}
      <NavbarTop title="Data Admin" noButton />
      <View style={styles.wrapper}>
        <ScrollView
          refreshControl={(<RefreshControl refreshing={refreshing} onRefresh={getAdminUser} />)}
        >
          <View style={{ gap: 10, paddingVertical: 20, paddingHorizontal: 35 }}>
            {userData.map((item) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => navigation.navigate('UserEditAdmin', { type: 'admin', user: item })}
              >
                <MemberListView
                  photo={item.profilePicture}
                  name={item.userName}
                  email={item.email}
                  studyProgram={item.studyProgram}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 35, marginVertical: 10 }}>
          <PrimaryButton title="Tambah Admin" onPress={() => navigation.navigate('UserAddAdmin', { type: 'admin' })} />
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
});
