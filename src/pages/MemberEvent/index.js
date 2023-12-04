import React, { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  RefreshControl, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  EventListView, EventOption, Loading, UserTab,
} from '../../components';
import { API_HOST, CallAPI, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function MemberEvent({ navigation }) {
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [isLoadingOnChange, setIsLoadingOnChange] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [eventType, setEventType] = useState('division');
  const [eventTime, setEventTime] = useState('live');
  const [eventData, setEventData] = useState([]);
  const [userTabData, setUserTabData] = useState({
    position: '', division: '', profilePicture: '', name: '', totalPoint: 0,
  });

  const getTotalPointAPI = () => {
    CallAPI({ url: `${API_HOST}/point-transaction/total`, method: 'GET', data: null })
      .then((r) => {
        setRefreshing(false);
        setIsLoadingOnChange(false);
        const {
          name,
          division,
          position, totalPoint, profilePicture,
        } = r;

        setUserTabData({
          name,
          division,
          position,
          totalPoint,
          profilePicture,
        });
      })
      .catch((e) => {
        setRefreshing(false);
        setIsLoadingOnChange(false);
        showToast(
          `Error: ${e.message}`,
          'danger',
          insets.top,
        );
      });
  };

  const getEventDataAPI = () => {
    CallAPI({ url: `${API_HOST}/event?query=eventStatus&eventTime=${eventTime}&eventType=${eventType}`, method: 'GET', data: null })
      .then((r) => {
        setEventData(r.events);
      })
      .catch((e) => {
        setRefreshing(false);
        setIsLoadingOnChange(false);
        showToast(
          `Error: ${e.message}`,
          'danger',
          insets.top,
        );
      });
  };

  useEffect(() => {
    setIsLoadingOnChange(true);
    getTotalPointAPI();
    getEventDataAPI();
  }, [eventType, eventTime]);

  const handlePageOnRefresh = () => {
    setRefreshing(true);
    getTotalPointAPI();
    getEventDataAPI();
  };

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
      <StatusBar style="light" />
      <ScrollView
        refreshControl={
        (<RefreshControl refreshing={refreshing} onRefresh={handlePageOnRefresh} />)
      }
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
            points={userTabData.totalPoint}
            type="Member"
          />
          <Text style={{ ...styles.eventOptionsTitle, marginTop: 30 }}>
            Tipe Event
          </Text>
          <View style={styles.frameParent}>
            <ScrollView style={{ flexDirection: 'row', paddingVertical: 5 }} horizontal>
              <EventOption
                optionText="Divisi"
                isActive={eventType === 'division'}
                onPress={() => setEventType('division')}
              />
              <EventOption
                optionText="Umum"
                isActive={eventType === 'global'}
                onPress={() => setEventType('global')}
              />
            </ScrollView>
          </View>
          <Text style={{ ...styles.eventOptionsTitle, marginTop: 15 }}>
            Waktu Event
          </Text>
          <View style={styles.frameParent}>
            <ScrollView style={{ flexDirection: 'row', paddingVertical: 5 }} horizontal>
              <EventOption
                optionText="Mendatang"
                isActive={eventTime === 'upcoming'}
                onPress={() => setEventTime('upcoming')}
              />
              <EventOption
                optionText="Berlangsung"
                isActive={eventTime === 'live'}
                onPress={() => setEventTime('live')}
              />
              <EventOption
                optionText="Selesai"
                isActive={eventTime === 'finished'}
                onPress={() => setEventTime('finished')}
              />
            </ScrollView>
          </View>
          <Text style={styles.contentItemTitle}>
            Daftar Event
          </Text>
          <View style={{ gap: 5 }}>
            {eventData.length < 1 && (
            <Text style={styles.textZeroData}>
              Data tidak ditemukan!
            </Text>
            )}
            {eventData.map((event) => (
              <EventListView
                key={event._id}
                imageUri={event.photoUrl}
                name={event.eventName}
                onPress={() => navigation.navigate('MemberDetailEvent', { event })}
                date={new Date(event.startDate).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      {isLoadingOnChange && <Loading />}
    </View>
  );
}

export default MemberEvent;

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
  eventOptionsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 5,
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
  frameParent: {
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  textZeroData: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: 100,
  },
});
