import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MemberListView = () => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <View style={styles.circle}></View>
                    <View style={styles.textContainer}>
                        <Text style={styles.nama}>Dito Aditya Nugroho</Text>
                        <Text style={styles.gmail}>SiekangAndorind@gmail.com</Text>
                    </View>
                </View>
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
    circle: {
        width: 51,
        height: 51,
        backgroundColor: '#D9D9D9',
        // opacity: 0.4,
        borderRadius: 26,
        //bagian margin
        marginRight: 15,
        marginTop: 12,
        marginLeft: 18,
    },
    textContainer: {
        flexDirection: 'column', alignItems: 'flex-start',
    },
    nama: {
        maxWidth: '100%',
        color: '#FFFFFF',
        // borderWidth: 1,
        // borderColor: 'black',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
    },
    gmail: {
        maxWidth: '100%',
        color: '#FFFFFF',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
    },
});

export default MemberListView;
