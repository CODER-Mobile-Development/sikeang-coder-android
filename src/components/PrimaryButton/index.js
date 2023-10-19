import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function PrimaryButton({ title }) {
  return (
    <TouchableOpacity style={styles.wrapper}>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  text: {
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'white',
  },
});
