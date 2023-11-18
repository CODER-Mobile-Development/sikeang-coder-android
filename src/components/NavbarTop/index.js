import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton } from '../../assets/svgs';

function NavbarTop({ title, onPress, noButton }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ ...styles.wrapper, paddingTop: insets.top + 10 }}>
      {!noButton && (
      <TouchableOpacity onPress={onPress}>
        <BackButton height={24} width={24} />
      </TouchableOpacity>
      )}
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
    paddingBottom: 15,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#F0F0F0',
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
