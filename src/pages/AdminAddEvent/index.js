import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DropdownInput, Loading, NavbarBottom, NavbarTop, PrimaryButton, Separator, UserInput,
} from '../../components';
import {
  API_HOST, CallAPI, dateTimeParsing, showToast,
} from '../../utils';
import { requestPreSignedURLUpload, uploadPhoto } from '../../utils/UploadImage';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminAddEvent({ navigation }) {
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [datePicker, setDatePicker] = useState({ type: '', isOpen: false });
  const [timePicker, setTimePicker] = useState({ type: '', isOpen: false });
  const [startDateTimePicker, setStartDateTimePicker] = useState(new Date());
  const [endDateTimePicker, setEndDateTimePicker] = useState(new Date());

  const eventTypeOption = useRef([
    { id: 'global', value: 'Global' },
    { id: 'division', value: 'Divisi' },
  ]);
  const [eventType, setEventType] = useState({
    state: 'initial',
    onDropdown: false,
    data: eventTypeOption.current[0],
  });

  const [divisionData, setDivisionData] = useState([]);
  const [eventDivision, setEventDivision] = useState({
    state: 'initial',
    onDropdown: false,
    data: { id: '', value: '' },
  });

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const imageDataPicker = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 1,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!imageDataPicker.canceled) {
      setImage(imageDataPicker.assets[0]);
    }
  };

  const createEventData = (data) => {
    CallAPI({ url: `${API_HOST}/event`, method: 'POST', data })
      .then(() => {
        setLoadingScreen(false);
        navigation.navigate('AdminEventList');
        showToast(
          'Berhasil membuat data Acara baru!',
          'success',
          insets.top,
        );
      })
      .catch(() => {
        setLoadingScreen(false);
        showToast(
          'Gagal membuat data Acara, silahkan coba lagi',
          'danger',
          insets.top,
        );
      });
  };

  const onSubmit = async () => {
    setLoadingScreen(true);
    const errorFields = [];
    if (!eventName) errorFields.push('• Nama Acara wajib diisi!');
    if (!eventDescription) errorFields.push('• Deskripsi wajib diisi!');
    if (!image) errorFields.push('• Foto wajib diunggah!');

    if (errorFields.length > 0) {
      setLoadingScreen(false);
      return showToast(
        `Error:\n${errorFields.join('\n')}`,
        'danger',
        insets.top,
      );
    }

    try {
      const imageExtension = image.uri.split('/').pop().split('.').pop();
      const { url, photoURI } = await requestPreSignedURLUpload(imageExtension);
      const { imageURI } = await uploadPhoto(image, url, photoURI);

      return createEventData({
        eventName,
        eventLocation,
        startDate: startDateTimePicker,
        endDate: endDateTimePicker,
        description: eventDescription,
        photoUrl: imageURI,
        eventType: eventType.data.id,
        eventDivision: eventDivision.data.id,
      });
    } catch (e) {
      setLoadingScreen(false);
      return showToast(
        e.message,
        'danger',
        insets.top,
      );
    }
  };

  const getAllDivisionData = () => {
    CallAPI({ url: `${API_HOST}/division`, method: 'GET', data: null })
      .then((r) => {
        const { divisions } = r;
        const divisionState = divisions.map((division) => ({
          id: division._id,
          value: division.divisionName,
        }));

        setDivisionData(divisionState);
        setEventDivision({
          state: 'initial',
          onDropdown: false,
          data: divisionState[0],
        });
        setLoadingScreen(false);
      })
      .catch(() => {
        showToast(
          'Gagal mendapatkan data divisi, silahkan coba beberapa saat lagi!',
          'danger',
          insets.top,
        );
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    if (eventType.data.id === 'division' && (eventType.state === 'onChangeData' || eventType.state === 'initial')) {
      setLoadingScreen(true);
      getAllDivisionData();
    }
  }, [eventType]);

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
      <NavbarTop title="Buat Acara" />
      <View style={styles.wrapper}>
        <ScrollView style={styles.content}>
          <UserInput
            type="Basic"
            label="Nama Acara"
            value={eventName}
            onChange={(val) => setEventName(val)}
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
            value={eventDescription}
            onChange={(val) => setEventDescription(val)}
          />
          <Separator height={14} />
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16 }}>
            Upload Foto
          </Text>
          <View style={{
            paddingVertical: 10,
            borderWidth: 2,
            borderRadius: 12,
            paddingHorizontal: 15,
            justifyContent: 'center',
          }}
          >
            <View style={{ gap: 10 }}>
              {image && (
              <>
                <View style={{
                  alignItems: 'center',
                }}
                >
                  <Image
                    source={{ uri: image.uri }}
                    style={{ width: 200, height: 200, borderRadius: 10 }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setImage(null)}
                  style={{ borderWidth: 1, borderRadius: 5 }}
                >
                  <Text style={{ fontFamily: 'Poppins-Medium', textAlign: 'center' }}>Batalkan</Text>
                </TouchableOpacity>
              </>
              )}
              {!image && (
              <TouchableOpacity
                onPress={pickImage}
                style={{ borderWidth: 1, borderRadius: 5 }}
              >
                <Text style={{ fontFamily: 'Poppins-Medium', textAlign: 'center' }}>Pilih Foto</Text>
              </TouchableOpacity>
              )}
            </View>
          </View>
          <Separator height={14} />
          <UserInput
            type="Basic"
            label="Lokasi Acara"
            value={eventLocation}
            onChange={(val) => setEventLocation(val)}
          />
          <Separator height={14} />
          <DropdownInput
            type="Dropdown"
            label="Jenis Acara"
            dropdownInitialId={{ id: '' }}
            data={eventTypeOption.current}
            dropdownState
            onDropdown={(val) => setEventType({
              state: 'onDropdown',
              onDropdown: val,
              data: eventType.data,
            })}
            onChange={(val) => setEventType({
              state: 'onChangeData',
              onDropdown: false,
              data: val,
            })}
          />
          {(eventType.data.id === 'division' && divisionData.length !== 0) && (
          <>
            <Separator
              height={14}
            />
            <DropdownInput
              type="Dropdown"
              label="Acara Divisi"
              dropdownInitialId={eventDivision}
              data={divisionData}
              dropdownState
              onDropdown={(val) => setEventDivision({
                state: 'onDropdown',
                onDropdown: val,
                data: eventDivision.data,
              })}
              onChange={(val) => setEventDivision({
                state: 'onChangeData',
                onDropdown: false,
                data: val,
              })}
            />
          </>
          )}
          <Separator height={40} />
          <PrimaryButton title="Simpan Perubahan" onPress={onSubmit} />
          <Separator height={40} />
        </ScrollView>
      </View>
      <NavbarBottom type="Admin" />
      {loadingScreen && <Loading />}
    </View>
  );
}

export default AdminAddEvent;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 35,
  },
});
