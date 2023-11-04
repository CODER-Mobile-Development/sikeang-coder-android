import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavbarTop, PrimaryButton, Separator, SearchBar, MemberListView, NavbarBottom } from '../../components';
import { AdminIcon } from '../../assets/svgs';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function AdminAttendanceList() {
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
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <NavbarTop title="Data Presensi" />
            <View style={styles.wrapper}>
                <ScrollView style={styles.content}>
                    <SearchBar placeholder={"cari nama peserta"} />
                    <Separator height={34} />
                    <Text style={styles.Text}>Daftar Peserta</Text>
                    <Separator height={16} />
                    <MemberListView name="Dito" email="dito@example.com" photo={<AdminIcon width={24} height={24} isActive={true} />} />
                    <Separator height={16} />
                    <MemberListView name="Dito" email="dito@example.com" photo={<AdminIcon width={24} height={24} isActive={true} />} />
                    <Separator height={336} />
                    <PrimaryButton title="Presensi Manual" />
                </ScrollView>
            </View>
            <NavbarBottom type="Admin" isActive="Event" />
        </View>
    );
}

export default AdminAttendanceList;

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
    Text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
    },
});
