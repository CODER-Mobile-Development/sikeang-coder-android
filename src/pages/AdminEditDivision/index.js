import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Loading, NavbarBottom, NavbarTop, PrimaryButton, Separator, UserInput,
} from '../../components';
import { API_HOST, CallAPI, showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminEditEvent({ route, navigation }) {
  const { divisionId, divisionName } = route.params;
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [newDivisionName, setNewDivisionName] = useState(divisionName);
  const [loadingScreen, setLoadingScreen] = useState(false);

  const updateDivision = (data) => {
    setLoadingScreen(true);
    CallAPI({ url: `${API_HOST}/division/${divisionId}`, method: 'PUT', data })
      .then(() => {
        setLoadingScreen(false);
        navigation.navigate('AdminHomeScreen', { refresh: true });
        showToast(
          'Berhasil mengubah data Divisi!',
          'success',
          insets.top,
        );
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

  const onSubmit = () => {
    const errorFields = [];
    if (!newDivisionName) errorFields.push('• Nama Divisi wajib diisi!');

    if (errorFields.length > 0) {
      return showToast(
        `Error:\n${errorFields.join('\n')}`,
        'danger',
        insets.top,
      );
    }

    return updateDivision({ divisionName: newDivisionName });
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
      <NavbarTop title="Ubah Divisi" />
      <View style={styles.wrapper}>
        <ScrollView style={styles.content}>
          <UserInput
            value={newDivisionName}
            type="Basic"
            label="Nama Divisi"
            onChange={(val) => setNewDivisionName(val)}
          />
          <Separator height={40} />
          <PrimaryButton title="Ubah Divisi" onPress={onSubmit} />
          <Separator height={40} />
        </ScrollView>
      </View>
      {loadingScreen && <Loading />}
      <NavbarBottom type="Admin" />
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
    marginTop: 20,
    paddingHorizontal: 35,
  },
});
