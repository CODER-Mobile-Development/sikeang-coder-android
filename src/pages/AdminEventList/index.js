import React, { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  RefreshControl, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  EventListView, NavbarBottom, PrimaryButton, SearchBar, UserTab,
} from '../../components';
import {
  API_HOST, CallAPI, dateParsing, getData, showToast,
} from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminEventList({ navigation }) {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [eventListData, setEventListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userTabData, setUserTabData] = useState({
    userName: '',
    division: '',
    profilePicture: '',
    position: '',
  });

  const getAllEventData = () => {
    setRefreshing(true);
    CallAPI({ url: `${API_HOST}/event?query=all`, method: 'GET', data: null })
      .then((r) => {
        setRefreshing(false);
        setEventListData(r.events);
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
      getAllEventData();
    }
  }, [isFocused]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      const { userName, division, profilePicture } = await getData('user-data');
      setUserTabData({
        userName, division: division.divisionName, profilePicture, position: 'BPH',
      });
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.wrapper} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <View style={styles.decorationWrapper}>
        <View style={{
          marginTop: 50,
          backgroundColor: '#B81519',
          ...styles.decorationCircle,
        }}
        />
        <View style={{
          marginTop: -230,
          zIndex: 999,
          backgroundColor: '#C13338',
          ...styles.decorationCircle,
        }}
        />
      </View>
      <View style={{
        zIndex: 9999, marginTop: 60, paddingHorizontal: 35, backgroundColor: 'transparent',
      }}
      >
        <UserTab
          division={`${userTabData.position} - ${userTabData.division}`}
          imageUri={userTabData.profilePicture}
          name={userTabData.userName}
          type="Admin"
        />
      </View>
      <ScrollView
        refreshControl={(<RefreshControl refreshing={refreshing} onRefresh={getAllEventData} />)}
      >
        <View style={styles.contentWrapper}>
          <SearchBar style={{ marginTop: 45 }} placeholder="cari nama acara" />
          <Text style={styles.contentItemTitle}>Daftar Acara</Text>
          <View style={{ gap: 5 }}>
            {eventListData.map((item) => (
              <EventListView
                key={item._id}
                name={item.eventName}
                imageUri={item.photoUrl}
                date={dateParsing(item.startDate)}
                onPress={() => navigation.navigate(
                  'AdminDetailEvent',
                  { event: item },
                )}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingVertical: 10, paddingHorizontal: 35 }}>
        <PrimaryButton onPress={() => navigation.navigate('AdminAddEvent')} title="Buat Acara Baru" />
      </View>
      <NavbarBottom isActive="Home" type="Admin" />
    </View>
  );
}

export default AdminEventList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  decorationWrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -140,
  },
  decorationCircle: {
    width: 150,
    height: 200,
    borderRadius: 320,
    transform: [
      { scaleX: 3.5 },
    ],
  },
  contentWrapper: {
    marginTop: -15,
    marginBottom: 30,
    paddingHorizontal: 35,
  },
  contentItemTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: 30,
  },
});
