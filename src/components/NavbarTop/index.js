import React from 'react';
import { Image } from 'react-native';
import { View, StyleSheet, Text } from 'react-native-web';

const NavbarTop = (props) => {
    return(
        <View style={style.Wrapper}>
            <View style={style.img}>
                <Image style={{ width: 24, height: 24 }} source={require('../../assets/BackArrow.png')} />
            </View>
            <Text style={style.Title}>
                {props.title}
            </Text>
        </View>
    )
}

export default NavbarTop

const style = StyleSheet.create({
    Wrapper: {
        height: 30,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
    },
    img: {
        width: 24,
        marginLeft:35,
    },
    Title: {
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        fontSize: 20,
        margin: 'auto',
        paddingRight: 30,
    }
})