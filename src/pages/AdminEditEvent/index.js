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

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminEditEvent({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const {
    _id,
    eventName,
    startDate,
    endDate,
    description,
    photoUrl,
    eventType,
    eventDivision,
    eventLocation,
  } = route.params.event;
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const eventTypeOption = useRef([
    { id: 'global', value: 'Global' },
    { id: 'division', value: 'Divisi' },
  ]);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [divisionData, setDivisionData] = useState([]);
  const [datePicker, setDatePicker] = useState({ type: '', isOpen: false });
  const [timePicker, setTimePicker] = useState({ type: '', isOpen: false });
  const [startDateTimePicker, setStartDateTimePicker] = useState(new Date(startDate));
  const [endDateTimePicker, setEndDateTimePicker] = useState(new Date(endDate));
  const [newDescription, setNewDescription] = useState(description);
  const [newEventName, setNewEventName] = useState(eventName);
  const [newEventLocation, setNewEventLocation] = useState(eventLocation);
  const [newEventType, setNewEventType] = useState({
    state: 'initial',
    onDropdown: false,
    data: eventTypeOption.current.filter((item) => item.id === eventType)[0],
  });
  const [newEventDivision, setNewEventDivision] = useState({
    state: 'initial',
    onDropdown: false,
    data: { id: eventDivision, value: '' },
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
    CallAPI({ url: `${API_HOST}/event?id=${_id}`, method: 'PUT', data })
      .then((r) => {
        const { eventName: updatedEventName } = r;
        setLoadingScreen(false);
        navigation.navigate('AdminEventList');
        showToast(
          `Berhasil mengubah data Acara ${updatedEventName}!`,
          'success',
          insets.top,
        );
      })
      .catch(() => {
        setLoadingScreen(false);
        showToast('Gagal mengubah data Acara, silahkan coba lagi!', 'danger', insets.top);
      });
  };

  const uploadPhoto = (url, photoURI) => {
    try {
      fetch(image.uri)
        .then((fetchImage) => fetchImage.blob()
          .then((imageBlob) => {
            const imageData = new File([imageBlob], imageBlob._data.name);
            fetch(url, {
              method: 'PUT',
              body: imageData,
              headers: {
                'Content-Type': imageBlob._data.type,
              },
            })
              .then((r) => {
                if (r.ok) {
                  createEventData({
                    eventName: newEventName,
                    startDate: startDateTimePicker,
                    endDate: endDateTimePicker,
                    description: newDescription,
                    photoUrl: photoURI,
                    eventType: newEventType.data.id,
                    eventDivision: newEventDivision.data.id,
                    eventLocation: newEventLocation,
                  });
                } else {
                  setLoadingScreen(false);
                  showToast(
                    'Gagal upload foto!',
                    'danger',
                    insets.top,
                  );
                }
              });
          }));
    } catch (e) {
      setLoadingScreen(false);
      showToast(
        e.toString(),
        'danger',
        insets.top,
      );
    }
  };

  const requestPreSignedURLUpload = (imageFormat) => {
    CallAPI({ url: `${API_HOST}/event/upload-request?fileFormat=${imageFormat}` })
      .then((r) => {
        const { url, photoURI } = r;
        uploadPhoto(url, photoURI);
      })
      .catch(() => {
        setLoadingScreen(false);
        showToast(
          'Gagal request upload foto, silahkan coba beberapa saat lagi!',
          'danger',
          insets.top,
        );
      });
  };

  const onSubmit = () => {
    setLoadingScreen(true);
    if (image) {
      const imageFormat = image.uri.split('/').pop().split('.').pop();

      return requestPreSignedURLUpload(imageFormat);
    }

    return createEventData({
      eventName: newEventName,
      startDate: startDateTimePicker,
      endDate: endDateTimePicker,
      description: newDescription,
      photoUrl,
      eventType: newEventType.data.id,
      eventDivision: newEventDivision.data.id,
      eventLocation: newEventLocation,
    });
  };

  const getAllDivisionData = () => {
    CallAPI({ url: `${API_HOST}/division`, method: 'GET', data: null })
      .then((r) => {
        const { divisions } = r;

        setDivisionData(divisions.map((division) => ({
          id: division._id,
          value: division.divisionName,
        })));
        setLoadingScreen(false);
      })
      .catch(() => {
        showToast('Gagal mendapatkan data divisi, silahkan coba beberapa saat lagi!', 'danger', insets.top);
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    if (newEventType.data.id === 'division' && (newEventType.state === 'onChangeData' || newEventType.state === 'initial')) {
      setLoadingScreen(true);
      getAllDivisionData();
    }
  }, [newEventType]);

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
              <View style={{
                alignItems: 'center',
              }}
              >
                <Image
                  source={{ uri: image ? image.uri : photoUrl }}
                  style={{ width: 200, height: 200, borderRadius: 10 }}
                />
              </View>
              {image && (
              <TouchableOpacity
                onPress={() => setImage(null)}
                style={{ borderWidth: 1, borderRadius: 5 }}
              >
                <Text style={{ fontFamily: 'Poppins-Medium', textAlign: 'center' }}>Batalkan</Text>
              </TouchableOpacity>
              )}
              {!image && (
              <TouchableOpacity
                onPress={pickImage}
                style={{ borderWidth: 1, borderRadius: 5 }}
              >
                <Text style={{ fontFamily: 'Poppins-Medium', textAlign: 'center' }}>Ubah Foto</Text>
              </TouchableOpacity>
              )}
            </View>
          </View>
          <Separator height={14} />
          <UserInput
            type="Basic"
            label="Lokasi Acara"
            value={newEventLocation}
            onChange={(val) => setNewEventLocation(val)}
          />
          <Separator height={14} />
          <DropdownInput
            type="Dropdown"
            label="Jenis Acara"
            dropdownInitialId={newEventType.data.id}
            data={eventTypeOption.current}
            dropdownState
            onDropdown={(val) => setNewEventType({
              state: 'onDropdown',
              onDropdown: val,
              data: newEventType.data,
            })}
            onChange={(val) => setNewEventType({
              state: 'onChangeData',
              onDropdown: false,
              data: val,
            })}
          />
          {(newEventType.data.id === 'division' && divisionData.length !== 0) && (
          <>
            <Separator
              height={14}
            />
            <DropdownInput
              type="Dropdown"
              label="Acara Divisi"
              dropdownInitialId={eventDivision}
              initialValue={{ id: '65536181849ddeb78412fad0', value: 'Comp. Programming' }}
              data={divisionData}
              dropdownState
              onDropdown={(val) => setNewEventDivision({
                state: 'onDropdown',
                onDropdown: val,
                data: newEventDivision.data,
              })}
              onChange={(val) => setNewEventDivision({
                state: 'onChangeData',
                onDropdown: false,
                data: val,
              })}
            />
          </>
          )}
          <Separator height={30} />
          <PrimaryButton
            title="Simpan Perubahan"
            onPress={onSubmit}
          />
          <Separator height={40} />
        </ScrollView>
      </View>
      <NavbarBottom type="Admin" isActive="Event" />
      {(loadingScreen) && <Loading />}
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
