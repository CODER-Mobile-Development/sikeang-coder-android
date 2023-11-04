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

function AdminMemberList() {
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
            <NavbarTop title="Divisi Mobile" />
            <View style={styles.wrapper}>
                <ScrollView style={styles.content}>
                    <SearchBar placeholder={"cari nama anggota divisi"} />
                    <Separator height={34} />
                    <Text style={styles.Text}>Daftar Anggota</Text>
                    <Separator height={16} />
                    <MemberListView name="Dito" email="dito@example.com" photo={<AdminIcon width={24} height={24} isActive={true} />} />
                    <Separator height={16} />
                    <MemberListView name="Dito" email="dito@example.com" photo={<AdminIcon width={24} height={24} isActive={true} />} />
                    <Separator height={336} />
                    <PrimaryButton title="Tambah Anggota" />
                </ScrollView>
            </View>
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
        marginTop: 20,
        paddingHorizontal: 35,
    },
    Text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
    },
});
