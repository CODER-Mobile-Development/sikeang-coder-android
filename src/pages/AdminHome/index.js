import React, { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Dimensions, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import {
  DashboardCounter, DivisionMemberCounter, Loading, NavbarBottom, UserTab,
} from '../../components';
import { API_HOST, CallAPI, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

const windowWidth = Dimensions.get('window').width;

function AdminHome() {
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [isLoadingAPI, setIsLoadingAPI] = useState(true);
  const [userTabData, setUserTabData] = useState({});
  const [totalSummaryDivision, setTotalSummaryDivision] = useState({});
  const [summaryDivisionData, setSummaryDivisionData] = useState([]);

  const getSummaryDivision = () => {
    CallAPI({ url: `${API_HOST}/dashboard`, method: 'GET', data: null })
      .then((r) => {
        const {
          user, totalMembers, totalDivisions, summaryDivision,
        } = r;
        setIsLoadingAPI(false);
        setUserTabData(user);
        setTotalSummaryDivision({ totalMembers, totalDivisions });
        setSummaryDivisionData(summaryDivision);
      })
      .catch((e) => {
        setIsLoadingAPI(false);
        showToast(`Error: ${e.message}`, 'danger');
      });
  };

  useEffect(() => {
    getSummaryDivision();
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
    <>

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
            division={`${userTabData.position} - ${userTabData.division}`}
            imageUri={userTabData.profilePicture}
            name={userTabData.name}
            type="Admin"
          />
          <DashboardCounter
            style={{ marginBottom: 23 }}
            rightCount={totalSummaryDivision.totalMembers}
            leftCount={totalSummaryDivision.totalDivisions}
            rigthTitle="anggota"
            leftTitle="divisi"
          />
          <Text style={styles.titleList}>Daftar Divisi</Text>
        </View>
        <ScrollView style={styles.content}>
          <View style={{ gap: 5 }}>
            {summaryDivisionData.map((item) => (
              <DivisionMemberCounter
                key={item.divisionId}
                memberCounter={item.membersCount}
                divisonTitle={item.divisionName}
              />
            ))}
          </View>
        </ScrollView>
        <NavbarBottom isActive="Home" type="Admin" />
      </View>
      {isLoadingAPI && <Loading />}
    </>
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
