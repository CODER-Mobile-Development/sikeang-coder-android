import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DropdownInput,
  Loading,
  NavbarBottom,
  NavbarTop,
  OutlineButton,
  PrimaryButton,
  Separator,
  UserInput,
} from '../../components';
import { API_HOST, CallAPI, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminEditMember({ route, navigation }) {
  const {
    userName, email, studyProgram, _id, division,
  } = route.params.user;
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [newUserName, setNewUserName] = useState(userName);
  const [newEmail, setNewEmail] = useState(email);
  const [newStudyProgram, setNewStudyProgram] = useState(studyProgram);

  const [divisionData, setDivisionData] = useState([]);
  const [newDivision, setNewDivision] = useState({
    state: 'initial',
    onDropdown: false,
    data: { id: division._id, value: '' },
  });

  const getAllDivisionData = () => {
    setLoadingScreen(true);
    CallAPI({ url: `${API_HOST}/division`, method: 'GET', data: null })
      .then((r) => {
        const { divisions } = r;

        setDivisionData(divisions.map((data) => ({
          id: data._id,
          value: data.divisionName,
        })));
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
    getAllDivisionData();
  }, []);

  const updateMemberUserAPI = (data) => {
    setLoadingScreen(true);
    CallAPI({ url: `${API_HOST}/user/member/${_id}`, method: 'PUT', data })
      .then(() => {
        setLoadingScreen(false);
        navigation.goBack();
      })
      .catch(() => {
        showToast(
          'Gagal membuat data user, silahkan coba beberapa saat lagi!',
          'danger',
          insets.top,
        );
        setLoadingScreen(false);
      });
  };

  const onSubmit = () => {
    updateMemberUserAPI({
      userName: newUserName,
      email: newEmail,
      studyProgram: newStudyProgram,
      divisionId: newDivision.data.id,
    });
  };

  const deleteMemberUserAPI = () => {
    setLoadingScreen(true);
    CallAPI({ url: `${API_HOST}/user/member/${_id}`, method: 'DELETE', data: null })
      .then(() => {
        setLoadingScreen(false);
        navigation.goBack();
      })
      .catch(() => {
        showToast(
          'Gagal membuat data user, silahkan coba beberapa saat lagi!',
          'danger',
          insets.top,
        );
        setLoadingScreen(false);
      });
  };

  const onDelete = () => {
    deleteMemberUserAPI();
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
      <NavbarTop title="Ubah Anggota" />
      <View style={styles.wrapper}>
        <ScrollView style={styles.content}>
          <UserInput
            type="Basic"
            label="Nama Lengkap"
            value={newUserName}
            onChange={(val) => setNewUserName(val)}
          />
          <Separator height={14} />
          <UserInput
            type="Basic"
            label="Alamat Email"
            value={newEmail}
            onChange={(val) => setNewEmail(val)}
          />
          <Separator height={14} />
          <UserInput
            type="Basic"
            label="Program Studi"
            value={newStudyProgram}
            onChange={(val) => setNewStudyProgram(val)}
          />
          <Separator height={14} />
          {divisionData.length !== 0 && (
          <DropdownInput
            type="Dropdown"
            label="Acara Divisi"
            dropdownInitialId={newDivision.data.id}
            data={divisionData}
            dropdownState
            onDropdown={(val) => setNewDivision({
              state: 'onDropdown',
              onDropdown: val,
              data: newDivision.data,
            })}
            onChange={(val) => setNewDivision({
              state: 'onChangeData',
              onDropdown: false,
              data: val,
            })}
          />
          )}
          <Separator height={30} />
          <OutlineButton
            title="Hapus Anggota"
            buttonStyle={{ borderWidth: 2, borderColor: '#8E8E8E', flex: 1 }}
            textStyle={{ color: '#8E8E8E' }}
            onPressIn={() => showToast(
              'Tekan dan tahan 3 detik untuk menghapus data anggota!',
              'info',
              insets.top,
            )}
            onLongPress={onDelete}
          />
          <Separator height={7} />
          <PrimaryButton title="Simpan Perubahan" onPress={onSubmit} />
          <Separator height={40} />
        </ScrollView>
      </View>
      <NavbarBottom type="Admin" />
      {loadingScreen && <Loading />}
    </View>
  );
}

export default AdminEditMember;

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
