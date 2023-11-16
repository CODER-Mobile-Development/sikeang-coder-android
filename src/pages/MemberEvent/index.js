import React, { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Dimensions, RefreshControl, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import {
  EventListView, EventOption, Loading, UserTab,
} from '../../components';
import { API_HOST, CallAPI, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

const windowWidth = Dimensions.get('window').width;

function MemberEvent({ navigation }) {
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
  const [userTabData, setUserTabData] = useState({});

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
        showToast(`Error: ${e.message}`, 'danger');
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
        showToast(`Error: ${e.message}`, 'danger');
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
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
        refreshControl={
        (<RefreshControl refreshing={refreshing} onRefresh={handlePageOnRefresh} />)
      }
      >
        <View style={styles.wrapper} onLayout={onLayoutRootView}>
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
              marginTop: -236,
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
          <View style={{
            paddingHorizontal: 35,
            marginTop: 64,
            position: 'absolute',
          }}
          >
            <UserTab
              style={{ marginBottom: 24 }}
              division={`${userTabData.position} - ${userTabData.division}`}
              imageUri={userTabData.profilePicture}
              name={userTabData.name}
              points={userTabData.totalPoint}
              type="Member"
            />
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>Tipe Event</Text>
            <View style={styles.frameParent}>
              <ScrollView style={{ flexDirection: 'row' }} horizontal>
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
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginTop: 12 }}>Waktu Event</Text>
            <View style={styles.frameParent}>
              <ScrollView style={{ flexDirection: 'row' }} horizontal>
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
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginTop: 25 }}>Daftar Event</Text>
          </View>
          <ScrollView style={styles.content}>
            <View style={{ gap: 5 }}>
              {eventData.length < 1 && (
              <Text style={{
                textAlign: 'center',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 16,
                marginTop: 100,
              }}
              >
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
          </ScrollView>
        </View>
      </ScrollView>
      {isLoadingOnChange && <Loading />}
    </>
  );
}

export default MemberEvent;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    paddingHorizontal: 35,
    marginTop: 235,
  },
  frameParent: {
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
});
