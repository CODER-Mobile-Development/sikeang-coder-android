import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';

function MemberListView({ name, email, photo }) {
  return (
    <View>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.circle}>
            <Image style={{ width: 51, height: 51, borderRadius: 26 }} source={{ uri: photo }} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#3F5671',
    height: 74,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  circle: {
    marginRight: 15,
    marginTop: 12,
    marginLeft: 18,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  name: {
    maxWidth: '100%',
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  email: {
    maxWidth: '100%',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});

export default MemberListView;
