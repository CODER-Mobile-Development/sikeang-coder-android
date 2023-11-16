import React from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

function EventListView({
  name, date, onPress, imageUri,
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.square}>
        <Image source={{ uri: imageUri }} style={styles.photo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name} ellipsizeMode="tail" numberOfLines={2}>{name}</Text>
        <Text style={styles.date} ellipsizeMode="tail" numberOfLines={1}>{date}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>lihat detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#3F5671',
    borderRadius: 12,
    paddingVertical: 12,
  },
  square: {
    marginRight: 15,
    marginLeft: 18,
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  photo: {
    width: 76,
    height: 76,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
  },
  name: {
    maxWidth: '100%',
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: -6,
  },
  date: {
    maxWidth: '100%',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingTop: 1,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});

export default EventListView;
