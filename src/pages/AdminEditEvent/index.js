import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {
  NavbarBottom, NavbarTop, PrimaryButton, Separator, UserInput,
} from '../../components';
import { dateTimeParsing } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminEditEvent({ route }) {
  const {
    eventName,
    startDate,
    endDate,
    description,
    photoUrl,
    eventType,
  } = route.params;
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const eventTypeOption = useRef([
    { id: 'global', value: 'Global' },
    { id: 'division', value: 'Division' },
  ]);
  const [datePicker, setDatePicker] = useState({ type: '', isOpen: false });
  const [timePicker, setTimePicker] = useState({ type: '', isOpen: false });
  const [startDateTimePicker, setStartDateTimePicker] = useState(new Date(startDate));
  const [endDateTimePicker, setEndDateTimePicker] = useState(new Date(endDate));
  const [newDescription, setNewDescription] = useState(description);
  const [newEventName, setNewEventName] = useState(eventName);
  const [newEventType, setNewEventType] = useState(eventTypeOption.current.filter((item) => item.id === eventType)[0]);
  const [newPhotoURL, setNewPhotoURL] = useState(photoUrl);

  const onSubmit = () => {
    console.log('event name', newEventName);
    console.log('start date', startDateTimePicker.toLocaleTimeString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
    console.log('end date', endDateTimePicker.toLocaleTimeString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
    console.log('event description', newDescription);
    console.log('event type', newEventType);
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
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {datePicker.type === 'start' && datePicker.isOpen && (
      <RNDateTimePicker
        mode="date"
        value={new Date(startDateTimePicker)}
        onChange={(val) => {
          setDatePicker({ type: '', isOpen: false });
          setStartDateTimePicker(new Date(val.nativeEvent.timestamp));
          setTimePicker({ type: 'start', isOpen: true });
        }}
      />
      )}
      {timePicker.type === 'start' && timePicker.isOpen && (
      <RNDateTimePicker
        mode="time"
        is24Hour
        value={new Date(startDateTimePicker)}
        onChange={(val) => {
          setTimePicker({ type: '', isOpen: false });
          setStartDateTimePicker(new Date(val.nativeEvent.timestamp));
        }}
      />
      )}
      {datePicker.type === 'end' && datePicker.isOpen && (
      <RNDateTimePicker
        mode="date"
        value={new Date(endDateTimePicker)}
        onChange={(val) => {
          setDatePicker({ type: '', isOpen: false });
          setEndDateTimePicker(new Date(val.nativeEvent.timestamp));
          setTimePicker({ type: 'end', isOpen: true });
        }}
      />
      )}
      {timePicker.type === 'end' && timePicker.isOpen && (
      <RNDateTimePicker
        mode="time"
        is24Hour
        value={new Date(endDateTimePicker)}
        onChange={(val) => {
          setTimePicker({ type: '', isOpen: false });
          setEndDateTimePicker(new Date(val.nativeEvent.timestamp));
        }}
      />
      )}
      <NavbarTop title="Edit Acara" />
      <View style={styles.wrapper}>
        <ScrollView style={styles.content}>
          <UserInput
            type="Basic"
            label="Nama Acara"
            value={newEventName}
            onChange={(val) => setNewEventName(val)}
          />
          <Separator height={14} />
          <UserInput
            type="DateTimePicker"
            label="Tanggal dan Jam Mulai"
            onPress={() => setDatePicker({ type: 'start', isOpen: true })}
            value={dateTimeParsing(startDateTimePicker, true)}
          />
          <Separator height={14} />
          <UserInput
            type="DateTimePicker"
            label="Tanggal dan Jam Selesai"
            onPress={() => setDatePicker({ type: 'end', isOpen: true })}
            value={dateTimeParsing(endDateTimePicker, true)}
          />
          <Separator height={14} />
          <UserInput
            type="TextArea"
            label="Deskripsi"
            value={newDescription}
            onChange={(val) => setNewDescription(val)}
          />
          <Separator height={14} />
          <UserInput
            type="Basic"
            label="Foto"
            value={photoUrl}
          />
          <Separator height={14} />
          <UserInput
            type="Dropdown"
            label="Jenis Acara"
            initialValue={newEventType}
            data={eventTypeOption.current}
            dropdownState
            onDropdown={(val) => val}
            onChange={(val) => setNewEventType(val)}
          />
          <Separator height={20} />
          <PrimaryButton
            title="Simpan Perubahan"
            onPress={onSubmit}
          />
          <Separator height={40} />
        </ScrollView>
      </View>
      <NavbarBottom type="Admin" isActive="Event" />
    </View>
  );
}

export default AdminEditEvent;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 35,
  },
});
