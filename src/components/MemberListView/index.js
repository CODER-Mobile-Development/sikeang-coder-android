import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';

function MemberListView({ name, email, photo }) {
  return (
    <View style={styles.item}>
      <View>
        <Image
          style={{
            width: 51, height: 51, borderRadius: 26, marginRight: 10,
          }}
          source={{ uri: photo }}
        />
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
    borderWidth: 2,
    borderColor: '#E0E0E0',
    padding: 15,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '80%',
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
