import React from "react";
import {Text,StyleSheet,View,} from 'react-native';

function DashboardCounter({ presencePoint, committeePoint  }) {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={styles.presencepoint}>{presencePoint}</Text>
                <Text style={styles.presencetitle}>Presensi</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.itemRight}>
                <Text style={styles.committeepoint}>{committeePoint}</Text>
                <Text style={styles.committeetitle}>kepanitiaan</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        height: 130,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 4,
        borderColor: '#B81519',
    },
    itemLeft: {
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        display: 'flex',
    },
    itemRight: {
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        display: 'flex',
    },
    presencepoint: {
        maxWidth: '100%',
        color: '#B81519',
        fontFamily: 'Poppins-Bold',
        fontSize: 50,
        marginTop: 10,
        marginLeft: 40,
        flex: 1,
    },
    committeepoint: {
        maxWidth: '100%',
        color: '#B81519',
        fontFamily: 'Poppins-Bold',
        fontSize: 50,
        marginTop: 10,
        marginRight: 60,
        flex: 1,
    },
    presencetitle: {
        maxWidth: '100%',
        color: '#B81519',
        fontFamily: 'Poppins-Bold',
        fontSize: 25,
        marginLeft: 39,
    },
    committeetitle: {
        maxWidth: '100%',
        color: '#B81519',
        fontFamily: 'Poppins-Bold',
        fontSize: 25,
        marginRight: 25,
    },
    divider: {
        width: 2,
        height: 90,
        backgroundColor: 'red',
    },
});

export default DashboardCounter;