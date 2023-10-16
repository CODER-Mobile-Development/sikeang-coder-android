import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function MemberPointHistory({ eventTitle, eventDate, pointEarned }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{eventTitle}</Text>
          <Text style={styles.date}>{eventDate}</Text>
        </View>
      </View>
      <Text style={styles.point}>{pointEarned}</Text>
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
  point: {
    maxWidth: '100%',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    marginTop: 8,
    marginRight: 22,
  },
  textContainer: {
    flexDirection: 'column', alignItems: 'flex-start',
  },
  title: {
    maxWidth: '100%',
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: 13,
    marginLeft: 22,
  },
  date: {
    maxWidth: '100%',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginBottom: 13,
    marginLeft: 22,
  },
});

export default MemberPointHistory;
