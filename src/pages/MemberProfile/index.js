import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavbarTop, PrimaryButton, Separator } from '../../components';

const poppinsMedium = require('../../assets/fonts/Poppins-Medium.ttf');
const poppinsSemiBold = require('../../assets/fonts/Poppins-SemiBold.ttf');
const poppinsBold = require('../../assets/fonts/Poppins-Bold.ttf');

SplashScreen.preventAutoHideAsync();

function MemberProfile() {
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
            <NavbarTop title="" />
            <View style={styles.wrapper}>
                <Separator height={20} />

                <ScrollView style={styles.content}>
                    <View style={styles.item}>

                        <Text style={styles.Text}>
                            Nama Lengkap
                        </Text>
                        <Text style={styles.Text1}>
                            Dito Aditya Nugroho
                        </Text>
                    </View>
                    <View style={styles.item}>

                        <Text style={styles.Text}>
                            Alamat Email
                        </Text>
                        <Text style={styles.Text1}>
                            Dito@Gmail.com
                        </Text>
                    </View>
                    <View style={styles.item}>

                        <Text style={styles.Text}>
                            Program Studi
                        </Text>
                        <Text style={styles.Text1}>
                            Rekayasa Perangkat Lunak -2022
                        </Text>
                    </View>
                    <View style={styles.item}>

                        <Text style={styles.Text}>
                            Nama divisi
                        </Text>
                        <Text style={styles.Text1}>
                            Mobile Development
                        </Text>
                    </View>
                    <View style={styles.item}>

                        <Text style={styles.Text}>
                            Jabatan DIvisi
                        </Text>
                        <Text style={styles.Text1}>
                            Anggota
                        </Text>
                    </View>
                </ScrollView>
                <View style={styles.contentView}>
                    <PrimaryButton title="Presensi Manual" />
                </View>
                <Text style={styles.Text2}>
                    Versi 1.0.0
                </Text>
            </View>

        </View>
    );
}

export default MemberProfile;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    content: {
        marginTop: 20,
        // paddingHorizontal: 35,
    },
    item: {
        height: 77,
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#A3A3A3',
    },
    Text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        marginTop: 17,
        paddingHorizontal: 35,
        width: '35%',
    },
    Text1: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        marginTop: 17,
        paddingHorizontal: 35,
    },
    Text2: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        marginTop: 17,
        textAlign: 'center',
        marginBottom: 38,
    },
    contentView: {
        paddingHorizontal: 35,
    },
});
