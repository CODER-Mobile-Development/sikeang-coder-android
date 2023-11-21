import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';

function MemberListView({ name, email, photo }) {
  return (
    <View style={styles.item}>
      <View style={{ marginRight: 10 }}>
        <Image style={styles.photo} source={{ uri: photo }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name} ellipsizeMode="tail" numberOfLines={2}>{name}</Text>
        <Text style={styles.email} ellipsizeMode="tail" numberOfLines={2}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#3F5671',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    padding: 15,
  },
  photo: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  textContainer: {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  name: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  email: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});

export default MemberListView;
