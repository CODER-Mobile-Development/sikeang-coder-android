import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function PrimaryButton({ title, onPress, style }) {
  return (
    <TouchableOpacity style={{ ...styles.wrapper, ...style }} onPress={onPress}>
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    backgroundColor: '#B31217',
    alignItems: 'center',
    borderRadius: 12,
  },
  text: {
    marginTop: 2,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'white',
  },
});
