import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function OutlineButton({
  title, color, onPress, onPressIn, onLongPress,
}) {
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPress={onPress}
      style={{ ...styles.wrapper, borderWidth: 2, borderColor: color }}
      delayLongPress={3000}
    >
      <Text style={{ ...styles.text, color }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default OutlineButton;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
