import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

function EventOption({ optionText, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{optionText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#B81519',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  text: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    alignSelf: 'center',
  },
});

export default EventOption;
