import React, { useCallback, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  RefreshControl, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  API_HOST, CallAPI, dateParsing, showToast,
} from '../../utils';
import { DashboardCounter, MemberPointHistory, UserTab } from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function MemberHome() {
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [refreshing, setRefreshing] = useState(true);
  const [userTabData, setUserTabData] = useState({
    position: '', division: '', profilePicture: '', name: '', totalPoint: 0,
  });
  const [historyPointData, setHistoryPointData] = useState([]);
  const [summaryPoint, setSummaryPoint] = useState({ totalPointAttendance: 0, totalPointCommittee: 0 });

  const getSummaryAPI = () => {
    setRefreshing(true);
    CallAPI({ url: `${API_HOST}/dashboard`, method: 'GET', data: null })
      .then(async (r) => {
        setRefreshing(false);
        const {
          user, historyPoint, totalPointCommittee, totalPointAttendance, totalPoint,
        } = r;
        setUserTabData(user);
        setHistoryPointData(historyPoint);
        setSummaryPoint({ totalPointCommittee, totalPointAttendance, totalPoint });
        await SplashScreen.hideAsync();
      })
      .catch(async (e) => {
        setRefreshing(false);
        showToast(
          `Error: ${e.message}`,
          'danger',
          insets.top,
        );
        await SplashScreen.hideAsync();
      });
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await getSummaryAPI();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.wrapper} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <ScrollView
        refreshControl={(<RefreshControl refreshing={refreshing} onRefresh={getSummaryAPI} />)}
      >
        <View style={styles.decorationWrapper}>
          <View style={{
            marginTop: 70,
            backgroundColor: '#B81519',
            ...styles.decorationCircle,
          }}
          />
          <View style={{
            marginTop: -240,
            backgroundColor: '#C13338',
            ...styles.decorationCircle,
          }}
          />
        </View>
        <View style={styles.contentWrapper}>
          <UserTab
            division={`${userTabData.position} - ${userTabData.division}`}
            imageUri={userTabData.profilePicture}
            name={userTabData.name}
            points={summaryPoint.totalPoint}
            type="Member"
          />
          <DashboardCounter
            style={{ marginTop: 30 }}
            leftCount={summaryPoint.totalPointAttendance}
            rightCount={summaryPoint.totalPointCommittee}
            leftTitle="presensi"
            rigthTitle="kepanitiaan"
          />
          <Text style={styles.contentItemTitle}>Riwayat Poin</Text>
          <View style={{ gap: 5, marginTop: 5 }}>
            {historyPointData.length < 1 && (
            <Text style={styles.textZeroData}>
              Data tidak ditemukan!
            </Text>
            )}
            {historyPointData.map((item) => (
              <MemberPointHistory
                key={item._id}
                pointEarned={item.point}
                eventDate={dateParsing(item.event.startDate)}
                eventTitle={item.event.name}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default MemberHome;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  decorationWrapper: {
    flex: 1,
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
  textZeroData: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: 100,
  },
});
