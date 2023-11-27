import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DropdownInput, Loading, NavbarBottom, NavbarTop, PrimaryButton, Separator, UserInput,
} from '../../components';
import { API_HOST, CallAPI, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminAddAdmin({ navigation }) {
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studyProgram, setStudyProgram] = useState('');
  const [divisionData, setDivisionData] = useState([]);
  const [eventDivision, setEventDivision] = useState({
    state: 'initial',
    onDropdown: false,
    data: { id: '', value: '' },
  });

  const getAllDivisionData = () => {
    setLoadingScreen(true);
    CallAPI({ url: `${API_HOST}/division`, method: 'GET', data: null })
      .then((r) => {
        const { divisions } = r;

        const dropdownDataState = divisions.map((division) => ({
          id: division._id,
          value: division.divisionName,
        }));
        setEventDivision({
          state: 'initial',
          onDropdown: false,
          data: dropdownDataState[0],
        });
        setDivisionData(dropdownDataState);
        setLoadingScreen(false);
      })
      .catch(() => {
        showToast('Gagal mendapatkan data divisi, silahkan coba beberapa saat lagi!', 'danger', insets.top);
        setLoadingScreen(false);
      });
  };

  const createUserAdminAPI = (data) => {
    console.log(data);
    setLoadingScreen(true);
    CallAPI({ url: `${API_HOST}/user/admin`, method: 'POST', data })
      .then(() => {
        setLoadingScreen(false);
        navigation.navigate('AdminAdminList', { refresh: true });
        showToast('Berhasil membuat data User Admin baru!', 'success', insets.top);
      })
      .catch((e) => {
        setLoadingScreen(false);
        showToast(
          'Gagal membuat data User Admin, silahkan coba lagi',
          'danger',
          insets.top,
        );
      });
  };

  const onSubmit = () => {
    createUserAdminAPI({
      userName: fullName,
      email,
      studyProgram,
      divisionId: eventDivision.data.id,
    });
  };

  useEffect(() => {
    getAllDivisionData();
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
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavbarTop title="Tambah Admin" />
      <View style={styles.wrapper}>
        <ScrollView style={styles.content}>
          <UserInput
            value={fullName}
            onChange={(val) => setFullName(val)}
            type="Basic"
            label="Nama Lengkap"
          />
          <Separator height={14} />
          <UserInput
            value={email}
            onChange={(val) => setEmail(val)}
            type="Basic"
            label="Email"
          />
          <Separator height={14} />
          <UserInput
            value={studyProgram}
            onChange={(val) => setStudyProgram(val)}
            type="Basic"
            label="Program Studi"
          />
          <Separator height={14} />
          {divisionData.length !== 0 && (
          <DropdownInput
            type="Dropdown"
            label="Acara Divisi"
            dropdownInitialId={eventDivision.data}
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
          )}
          <Separator height={40} />
          <PrimaryButton title="Simpan Perubahan" onPress={onSubmit} />
          <Separator height={40} />
        </ScrollView>
      </View>
      {loadingScreen && <Loading />}
      <NavbarBottom type="Admin" isActive="Event" />
    </View>
  );
}

export default AdminAddAdmin;

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
