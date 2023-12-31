import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import {
  Loading,
  MemberListView,
  NavbarBottom,
  NavbarTop,
  OutlineButton,
  PrimaryButton,
  SearchBar,
} from '../../components';
import { API_HOST, CallAPI, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminMemberList({ route, navigation }) {
  const { divisionId, divisionName } = route.params;
  const isFocus = useIsFocused();
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const getMembersDivision = () => {
    setLoadingScreen(true);
    CallAPI({ url: `${API_HOST}/user?query=division&value=${divisionId}`, method: 'GET', data: null })
      .then((r) => {
        setLoadingScreen(false);
        const { users } = r;
        setUsersData(users);
      })
      .catch((e) => {
        setLoadingScreen(false);
        showToast(
          `Error: ${e.message}`,
          'danger',
          insets.top,
        );
      });
  };

  useEffect(() => {
    if (isFocus) {
      getMembersDivision();
    }
  }, [isFocus]);

  const deleteDataDivision = () => {
    setLoadingScreen(true);
    CallAPI({ url: `${API_HOST}/division/${divisionId}`, method: 'DELETE', data: null })
      .then(() => {
        setLoadingScreen(false);
        navigation.goBack();
      })
      .catch((e) => {
        setLoadingScreen(false);
        showToast(
          `Error: ${e.message}`,
          'danger',
          insets.top,
        );
      });
  };

  const onDelete = () => {
    deleteDataDivision();
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
      <NavbarTop title="Anggota Divisi" />
      <View style={styles.wrapper}>
        <View style={{ paddingHorizontal: 35 }}>
          <View style={{ paddingVertical: 20 }}>
            <SearchBar placeholder="cari nama anggota divisi" />
          </View>
          <Text style={styles.titleText}>Daftar Anggota</Text>
        </View>
        <ScrollView style={styles.content}>
          <View style={{ gap: 10, paddingBottom: 20 }}>
            {usersData.map((item) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => navigation.navigate('UserEditMember', { type: 'member', user: item })}
              >
                <MemberListView
                  name={item.userName}
                  email={item.email}
                  photo={item.profilePicture}
                  studyProgram={item.studyProgram}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 35, marginVertical: 10, gap: 7 }}>
          <View style={{ flexDirection: 'row', gap: 7 }}>
            <OutlineButton
              title="Ubah Divisi"
              buttonStyle={{ borderWidth: 2, borderColor: '#8E8E8E', flex: 1 }}
              textStyle={{ color: '#8E8E8E' }}
              onPress={() => navigation.navigate('AdminEditDivision', { divisionId, divisionName })}
            />
            <OutlineButton
              title="Hapus Divisi"
              buttonStyle={{ borderWidth: 2, borderColor: '#8E8E8E', flex: 1 }}
              textStyle={{ color: '#8E8E8E' }}
              onPressIn={() => showToast('Tekan dan tahan 3 detik untuk menghapus data divisi!', 'info', insets.top)}
              onLongPress={onDelete}
            />
          </View>
          <PrimaryButton title="Tambah Anggota" onPress={() => navigation.navigate('UserAddMember', { type: 'member', divisionId })} />
        </View>
      </View>
      {loadingScreen && <Loading />}
      <NavbarBottom type="Admin" isActive="Home" />
    </View>
  );
}

export default AdminMemberList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  content: {
    marginTop: 5,
    paddingHorizontal: 35,
  },
  titleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});
