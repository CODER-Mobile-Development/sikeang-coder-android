import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Image, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  NavbarBottom, NavbarTop, OutlineButton, PrimaryButton,
} from '../../components';
import { SmallCalendarIcon } from '../../assets/svgs';
import { dateParsing, dateTimeParsing, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminPointDetailEvent({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const {
    description,
    startDate,
    endDate,
    eventName,
    photoUrl,
    eventLocation,
  } = route.params.event;
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="dark" />
      <NavbarTop title="Event" />
      <ScrollView style={styles.wrapper} onLayout={onLayoutRootView}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image
            style={{ borderRadius: 12 }}
            height={293}
            width={293}
            source={{ uri: photoUrl }}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.eventTitle}>{eventName}</Text>
          <View style={styles.eventDate}>
            <SmallCalendarIcon />
            <Text style={styles.eventDateText}>
              {dateParsing(startDate)}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={styles.descriptionTitle}>
            Tanggal Acara
          </Text>
          <Text style={styles.descriptionText}>
            Tanggal mulai:
            {' '}
            {dateTimeParsing(startDate)}
            {'\n'}
            Perkiraan selesai:
            {' '}
            {dateTimeParsing(endDate)}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.descriptionTitle}>
            Deskripsi Acara
          </Text>
          <Text style={styles.descriptionText}>
            {description}
          </Text>
        </View>
        <View style={{ marginTop: 10, marginBottom: 30 }}>
          <Text style={styles.descriptionTitle}>Tempat Acara</Text>
          <Text style={styles.descriptionText}>{eventLocation}</Text>
        </View>
        <View style={{ gap: 7, marginBottom: 30 }}>
          <PrimaryButton
            title="Buka Presensi"
          />
          <PrimaryButton
            title="Lihat Data Presensi"
            onPress={() => navigation.navigate('AdminAttendanceList')}
          />
          <View style={{ flexDirection: 'row', gap: 7 }}>
            <OutlineButton
              title="Ubah Data"
              color="#B31217"
              onPress={() => navigation.navigate('AdminEditEvent', { event: route.params.event })}
            />
            <OutlineButton
              title="Hapus Data"
              color="#8E8E8E"
              onPressIn={() => showToast('Tekan dan tahan 3 detik untuk menghapus data!', 'info', insets.top)}
              onLongPress={() => showToast('Berhasil menghapus data!', 'success', insets.top)}
            />
          </View>
        </View>
      </ScrollView>
      <NavbarBottom type="Admin" isActive="Poin" />
    </View>
  );
}

export default AdminPointDetailEvent;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 35,
  },
  eventTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginTop: 11,
    textAlign: 'center',
  },
  eventDate: {
    flexDirection: 'row',
    gap: 7,
    justifyContent: 'center',
  },
  eventDateText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    textAlign: 'center',
    color: '#414141',
  },
  descriptionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  descriptionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginTop: 4,
  },
});
