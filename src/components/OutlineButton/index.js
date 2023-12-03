import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function OutlineButton({
  title, textStyle, onPress, onPressIn, onLongPress, buttonStyle,
}) {
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPress={onPress}
      style={{ ...styles.wrapper, ...buttonStyle }}
      delayLongPress={3000}
    >
      <Text style={{ ...styles.text, ...textStyle }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default OutlineButton;

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    alignItems: 'center',
    borderRadius: 12,
  },
  text: {
    marginTop: 2,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
});
