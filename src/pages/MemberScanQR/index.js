import React, { useCallback, useEffect, useState } from 'react';
import {
  Linking, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { API_HOST, CallAPI, showToast } from '../../utils';
import { Loading, NavbarTop } from '../../components';
import { CameraFlashIcon, CameraFlip } from '../../assets/svgs';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function MemberScanQR({ navigation }) {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const heightRatio = Math.round((width * 16) / 9);
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);

  const [isLoadingCallAPI, setIsLoadingCallAPI] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(status === 'granted');
      })();
    }
  }, [isFocused]);

  const onQRCodeScanned = ({ data }) => {
    setIsLoadingCallAPI(true);
    setScanned(true);
    CallAPI({ url: `${API_HOST}/point-transaction/attendance`, method: 'POST', data: { token: data } })
      .then(() => {
        showToast(
          'Berhasil melakukan presensi!',
          'success',
          insets.top,
        );
        setIsLoadingCallAPI(false);
        setTimeout(() => {
          navigation.navigate('MemberHome', { refresh: true });
          setScanned(false);
        }, 50);
      })
      .catch((e) => {
        showToast(
          `Error: ${e.message}`,
          'danger',
          insets.top,
        );
        setIsLoadingCallAPI(false);
        setTimeout(() => {
          navigation.navigate('MemberHome');
          setScanned(false);
        }, 1000);
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

  if (hasCameraPermission === null) {
    return (
      <>
        <NavbarTop title="Scan QR Presensi" noButton />
        <View style={styles.viewPermissionWrapper}>
          <Text style={styles.viewPermissionText}>
            Waiting for camera permissions...
          </Text>
        </View>
      </>
    );
  }

  if (hasCameraPermission === false) {
    return (
      <>
        <NavbarTop title="Scan QR Presensi" noButton />
        <View style={styles.viewPermissionWrapper}>
          <Text style={styles.viewPermissionText}>
            No camera permission
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openSettings()}
            style={styles.viewPermissionButton}
          >
            <Text style={styles.viewPermissionText}>
              Open Settings
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {isFocused && <StatusBar style="dark" />}
      <View style={{ zIndex: 999 }}>
        <NavbarTop title="Scan QR Presensi" noButton />
      </View>
      <View
        style={styles.cameraWrapper}
      >
        {isFocused && (
          <Camera
            ratio="16:9"
            style={{
              height: heightRatio,
              width: '100%',
            }}
            type={type}
            flashMode={flash}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            onBarCodeScanned={scanned ? null : onQRCodeScanned}
          >
            <View
              style={{ ...styles.cameraOptionsWrapper, paddingTop: insets.top + 30 }}
            >
              <TouchableOpacity
                style={{
                  ...styles.cameraOptionsButton,
                  backgroundColor: '#525151',
                }}
                onPress={() => {
                  setType(
                    type === CameraType.back ? CameraType.front : CameraType.back,
                  );
                }}
              >
                <CameraFlip height={32} width={32} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.cameraOptionsButton,
                  backgroundColor: flash === FlashMode.off ? '#525151' : '#FFFFFF',
                }}
                onPress={() => setFlash(
                  flash === FlashMode.off
                    ? FlashMode.torch
                    : FlashMode.off,
                )}
              >
                <CameraFlashIcon
                  height={32}
                  width={32}
                  fill={flash === FlashMode.off ? '#FFFFFF' : '#525151'}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        )}
        {isLoadingCallAPI && <Loading />}
      </View>
    </View>
  );
}

export default MemberScanQR;

const styles = StyleSheet.create({
  cameraWrapper: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  cameraOptionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
  },
  cameraOptionsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  viewPermissionWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  viewPermissionText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
  viewPermissionButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#525151',
  },
});
