import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Router from './src/router';
import { iosClientId, webClientId } from './src/utils';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
      webClientId,
      iosClientId,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      profileImageSize: 240,
    });
  }, []);
  return (
    <NavigationContainer>
      <Router />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
