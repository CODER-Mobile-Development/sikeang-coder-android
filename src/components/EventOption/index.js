import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EventOption = ({ optionText, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{optionText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#B81519',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    alignSelf: 'center',
  },
});

export default EventOption;
