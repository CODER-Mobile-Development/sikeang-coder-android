import React, { useCallback, useEffect, useState } from 'react';
import {
  Linking, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { CameraFlashIcon, CameraFlip } from '../../assets/svgs';
import { showToast } from '../../utils';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function MemberScanQR() {
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': poppinsMedium,
    'Poppins-SemiBold': poppinsSemiBold,
    'Poppins-Bold': poppinsBold,
  });
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const onQRCodeScanned = ({ data }) => {
    showToast(`QR Scanned: ${data}`, 'info');
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
      <View style={styles.viewPermissionWrapper}>
        <Text style={styles.viewPermissionText}>
          Waiting for camera permissions...
        </Text>
      </View>
    );
  }

  if (hasCameraPermission === false) {
    return (
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
    );
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={styles.cameraWrapper}
    >
      <StatusBar style="light" />
      <Camera
        style={{ flex: 1 }}
        ratio="16:9"
        type={type}
        flashMode={flash}
        onBarCodeScanned={onQRCodeScanned}
      >
        <View
          style={{ ...styles.cameraOptionsWrapper, paddingTop: insets.top + 10 }}
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
            <CameraFlashIcon height={32} width={32} fill={flash === FlashMode.off ? '#FFFFFF' : '#525151'} />
          </TouchableOpacity>
        </View>
      </Camera>
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
