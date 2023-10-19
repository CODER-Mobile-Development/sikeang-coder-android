import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { BackButton } from '../../assets/svgs';

function NavbarTop({ title }) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity>
        <BackButton height={24} width={24} />
      </TouchableOpacity>
      <View style={styles.wrapperTittle}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

export default NavbarTop;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 35,
    paddingVertical: 15,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  wrapperTittle: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginLeft: 24,
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    margin: 'auto',
    paddingRight: 30,
  },
});
