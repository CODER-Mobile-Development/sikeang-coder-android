import {
  ActivityIndicator, StyleSheet, Text, View,
} from 'react-native';
import React from 'react';

function Loading() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.box}>
        <ActivityIndicator size="large" color="#C13338" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 140,
    height: 120,
    borderRadius: 10,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginTop: 12,
    color: 'black',
  },
});
