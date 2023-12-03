import React, { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import {
  DashboardCounter, DivisionMemberCounter, PrimaryButton, UserTab,
} from '../../components';
import { API_HOST, CallAPI, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminHome({ navigation, route }) {
  const isFocus = useIsFocused();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [refreshing, setRefreshing] = useState(true);
  const [userTabData, setUserTabData] = useState({
    position: '', division: '', profilePicture: '', name: '', totalPoint: 0,
  });
  const [totalSummaryDivision, setTotalSummaryDivision] = useState({});
  const [summaryDivisionData, setSummaryDivisionData] = useState([]);

  const getSummaryDivision = async () => {
    setRefreshing(true);
    CallAPI({ url: `${API_HOST}/dashboard`, method: 'GET', data: null })
      .then(async (r) => {
        const {
          user, totalMembers, totalDivisions, summaryDivision,
        } = r;
        setRefreshing(false);
        setUserTabData(user);
        setTotalSummaryDivision({ totalMembers, totalDivisions });
        setSummaryDivisionData(summaryDivision);
        await SplashScreen.hideAsync();
      })
      .catch(async (e) => {
        setRefreshing(false);
        showToast(`Error: ${e.message}`, 'danger');
        await SplashScreen.hideAsync();
      });
  };

  useEffect(() => {
    if (route.params?.refresh) {
      getSummaryDivision();
    }
  }, [isFocus]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await getSummaryDivision();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.wrapper} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <ScrollView
        refreshControl={(<RefreshControl refreshing={refreshing} onRefresh={getSummaryDivision} />)}
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
            type="Admin"
          />
          <DashboardCounter
            style={{ marginTop: 30 }}
            rightCount={totalSummaryDivision.totalMembers}
            leftCount={totalSummaryDivision.totalDivisions}
            rigthTitle="anggota"
            leftTitle="divisi"
          />
          <Text style={styles.contentItemTitle}>Daftar Divisi</Text>
          <View style={{ gap: 5, marginTop: 5 }}>
            {summaryDivisionData.length < 1 && (
              <Text style={styles.textZeroData}>
                Data tidak ditemukan!
              </Text>
            )}
            {summaryDivisionData.map((item) => (
              <TouchableOpacity
                key={item.divisionId}
                onPress={() => navigation.navigate('AdminMemberList', { divisionId: item.divisionId })}
              >
                <DivisionMemberCounter
                  memberCounter={item.membersCount}
                  divisonTitle={item.divisionName}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingVertical: 10, paddingHorizontal: 35 }}>
        <PrimaryButton onPress={() => navigation.navigate('AdminAddDivision')} title="Buat Divisi Baru" />
      </View>
    </View>
  );
}

export default AdminHome;

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
