import React from 'react';
import { Image } from 'react-native';
import { View, StyleSheet, TextInput } from 'react-native-web';

const SearchBar = () => {
    return (
        <View style={style.Wrapper}>
            <View style={style.Icon}>
                <Image style={{ width: 24, height: 24 }} source={require('../../assets/Search.png')} />
            </View>
            <TextInput placeholder="cari nama anggota divisi" style={style.text}>
                {/* cari nama anggota divisi */}
            </TextInput>
        </View>
    )
}

export default SearchBar;

const style = StyleSheet.create({
    Wrapper: {
        borderColor: '#6A6A6A',
        flexDirection: 'row',
        textAlign: 'center',
        alignItem: 'center',
        borderWidth: 3,
        borderRadius: 12,
        marginRight: 35,
        marginLeft: 35,
        height: 38
    }, 
    Icon: {
        marginLeft: 16,
        marginRight: 14,
        paddingTop: 5,
    },
    text: {
        marginRight: 10,
        fontSize: 12,
        color: '#ABABAB',
        width: '100%'
    }
})