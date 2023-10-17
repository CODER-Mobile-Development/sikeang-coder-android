import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BackButton } from '../../assets/svgs';

function NavbarTop({ title }) {
  return (
    <View style={style.wrapper}>
      <View>
        <BackButton height={24} width={24} />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={style.title}>{title}</Text>
      </View>
    </View>
  );
}

export default NavbarTop;

const style = StyleSheet.create({
  wrapper: {
    height: 30,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 20,
    margin: 'auto',
    paddingRight: 30,
  },
});
