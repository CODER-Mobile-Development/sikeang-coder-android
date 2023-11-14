import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function MemberPointHistory({ eventTitle, eventDate, pointEarned }) {
  return (
    <View style={styles.item}>
      <View style={{ ...styles.itemLeft, width: '80%' }}>
        <View style={{ ...styles.textContainer, flex: 1 }}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>{eventTitle}</Text>
          <Text style={styles.date} ellipsizeMode="tail" numberOfLines={1}>{eventDate}</Text>
        </View>
      </View>
      <View style={{ width: '20%', alignItems: 'center' }}>
        <Text style={styles.point}>{pointEarned}</Text>
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
    paddingLeft: 16,
    borderColor: '#E0E0E0',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  point: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    marginTop: 8,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: 13,
  },
  date: {
    maxWidth: '100%',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginBottom: 13,
  },
});

export default MemberPointHistory;
