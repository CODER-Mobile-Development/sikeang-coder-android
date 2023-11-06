import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function DashboardCounter({
  presencePoint, committeePoint, style, rigthTitle, leftTitle,
}) {
  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <View style={styles.item}>
        <Text style={styles.pointSection}>{presencePoint}</Text>
        <Text style={styles.pointTitle}>{leftTitle}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Text style={styles.pointSection}>{committeePoint}</Text>
        <Text style={styles.pointTitle}>{rigthTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 98,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 2,
    borderColor: '#B81519',
    paddingHorizontal: 10,
  },
  item: {
    minWidth: '45%',
    maxWidth: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointSection: {
    color: '#B81519',
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    paddingBottom: 10,
    position: 'absolute',
  },
  pointTitle: {
    color: '#B81519',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 45,
  },
  divider: {
    width: 2,
    height: 69,
    backgroundColor: '#B81519',
    marginLeft: 15,
  },
});

export default DashboardCounter;
