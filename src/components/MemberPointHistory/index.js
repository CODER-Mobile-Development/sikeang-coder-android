import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MemberPointHistory = () => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <View style={styles.textContainer}>
                        <Text style={styles.kegiatan}>Rapat Anggota</Text>
                        <Text style={styles.tanggal}>Kamis, 12 Oktober 2023</Text>
                    </View>
                </View>
                <Text style={styles.point}>30</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     borderWidth: 1,
    //     borderColor: 'black',
    //     borderRadius: 10,
    //     padding: 10,
    // },

    item: {
        backgroundColor: '#3F5671',
        width: 360,
        height: 74,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#E0E0E0',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    point: {
        maxWidth: '100%',
        color: '#FFFFFF',
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
        //bagian margin bagian marginnya
        marginTop: 8,
        marginRight: 22,

    },
    textContainer: {
        flexDirection: 'column', alignItems: 'flex-start',
    },
    kegiatan: {
        maxWidth: '100%',
        color: '#FFFFFF',
        // borderWidth: 1,
        // borderColor: 'black',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        //bagian margin
        marginTop: 13,
        marginLeft: 22,
    },
    tanggal: {
        maxWidth: '100%',
        color: '#FFFFFF',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        //bagian margin
        marginBottom: 13,
        marginLeft: 22,
    },
});

export default MemberPointHistory;
