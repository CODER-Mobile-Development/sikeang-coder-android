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

function AdminAddMember({ route, navigation }) {
  const { divisionId } = route.params;
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [studyProgram, setStudyProgram] = useState('');

  const [divisionData, setDivisionData] = useState([]);
  const [division, setDivision] = useState({
    state: 'initial',
    onDropdown: false,
    data: { id: divisionId, value: '' },
  });

  const getAllDivisionData = () => {
    setLoadingScreen(true);
    CallAPI({ url: `${API_HOST}/division`, method: 'GET', data: null })
      .then((r) => {
        const { divisions } = r;

        setDivisionData(divisions.map((item) => ({
          id: item._id,
          value: item.divisionName,
        })));
        setLoadingScreen(false);
      })
      .catch(() => {
        showToast('Gagal mendapatkan data divisi, silahkan coba beberapa saat lagi!', 'danger', insets.top);
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    getAllDivisionData();
  }, []);

  const createMemberUserAPI = (data) => {
    setLoadingScreen(true);
    CallAPI({ url: `${API_HOST}/user/member`, method: 'POST', data })
      .then(() => {
        setLoadingScreen(false);
        navigation.goBack();
      })
      .catch(() => {
        showToast(
          'Gagal membuat data anggota, silahkan coba beberapa saat lagi!',
          'danger',
          insets.top,
        );
        setLoadingScreen(false);
      });
  };

  const onSubmit = () => {
    createMemberUserAPI({
      userName,
      email,
      studyProgram,
      divisionId,
    });
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
      <NavbarTop title="Tambah Anggota" />
      <View style={styles.wrapper}>
        <ScrollView style={styles.content}>
          <UserInput
            type="Basic"
            label="Nama Lengkap"
            value={userName}
            onChange={(val) => setUserName(val)}
          />
          <Separator height={14} />
          <UserInput
            type="Basic"
            label="Alamat Email"
            value={email}
            onChange={(val) => setEmail(val)}
          />
          <Separator height={14} />
          <UserInput
            type="Basic"
            label="Program Studi"
            value={studyProgram}
            onChange={(val) => setStudyProgram(val)}
          />
          <Separator height={14} />
          {divisionData.length !== 0 && (
          <DropdownInput
            type="Dropdown"
            label="Acara Divisi"
            dropdownInitialId={division.data.id}
            data={divisionData}
            dropdownState
            onDropdown={(val) => setDivision({
              state: 'onDropdown',
              onDropdown: val,
              data: division.data,
            })}
            onChange={(val) => setDivision({
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
      <NavbarBottom type="Admin" />
      {loadingScreen && <Loading />}
    </View>
  );
}

export default AdminAddMember;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 35,
  },
});
