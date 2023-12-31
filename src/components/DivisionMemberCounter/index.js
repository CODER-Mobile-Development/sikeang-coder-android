import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function DivisionMemberCounter({ divisonTitle, memberCounter }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.textContainer}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>{divisonTitle}</Text>
          <Text style={styles.memberCounter} ellipsizeMode="tail" numberOfLines={1}>
            {memberCounter}
            {' '}
            Anggota
          </Text>
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
    paddingHorizontal: 22,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    maxWidth: '100%',
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: 13,
  },
  memberCounter: {
    maxWidth: '100%',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginBottom: 13,
  },
});

export default DivisionMemberCounter;
