import React, { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Dimensions, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import {
  DashboardCounter, MemberPointHistory, NavbarBottom, UserTab,
} from '../../components';
import { API_HOST, CallAPI, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

const windowWidth = Dimensions.get('window').width;

function MemberHome() {
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [userTabData, setUserTabData] = useState({});
  const [historyPointData, setHistoryPointData] = useState([]);
  const [summaryPoint, setSummaryPoint] = useState({});

  const getSummaryPointAPI = () => {
    CallAPI({ url: `${API_HOST}/dashboard`, method: 'GET', data: null })
      .then((r) => {
        const {
          user, historyPoint, totalPointCommittee, totalPointAttendance, totalPoint,
        } = r;
        setUserTabData(user);
        setHistoryPointData(historyPoint);
        setSummaryPoint({ totalPointCommittee, totalPointAttendance, totalPoint });
      })
      .catch((e) => {
        showToast(`Error: ${e.message}`, 'danger');
      });
  };

  useEffect(() => {
    getSummaryPointAPI();
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
        width: '100%',
        paddingHorizontal: 35,
        marginTop: 64,
        position: 'absolute',
      }}
      >
        <UserTab
          style={{ marginBottom: 33 }}
          division={`${userTabData.position} - ${userTabData.division}`}
          imageUri={userTabData.profilePicture}
          name={userTabData.name}
          points={summaryPoint.totalPoint}
          type="Member"
        />
        <DashboardCounter
          style={{ marginBottom: 23 }}
          presencePoint={summaryPoint.totalPointAttendance}
          committeePoint={summaryPoint.totalPointCommittee}
          leftTitle="presensi"
          rigthTitle="kepanitiaan"
        />
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginBottom: 11 }}>Riwayat Poin</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={{ gap: 5 }}>
          {historyPointData.map((item) => (
            <MemberPointHistory
              key={item._id}
              pointEarned={item.point}
              eventDate={new Date(item.event.startDate).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              eventTitle={item.event.name}
            />
          ))}
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
