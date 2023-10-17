import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
const PrimaryButton = () =>{
    const [fontsLoaded] = useFonts({
        'Poppins-Medium': poppinsMedium,
        'Poppins-SemiBold': poppinsSemiBold,
        'Poppins-Bold': poppinsBold,
      });
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null;
      }
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={{
        fontFamily: 'Poppins-Bold',
        fontSize: 40,
      }}>Tambah Divisi</Text>
          </TouchableOpacity>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor:'#B31217'
      },
      button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
      },
      countContainer: {
        alignItems: 'center',
        padding: 10,
      },
    });
export default PrimaryButton