import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';

function UserTab({
  type, imageUri, name, division, points, style,
}) {
  return (
    <View style={{ ...styles.card, ...style }}>
      <View style={{ ...styles.contentContainer, justifyContent: type === 'Member' ? 'space-between' : 'flex-start' }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.division}>{division}</Text>
          </View>
        </View>

        {type === 'Member' && (
        <View style={styles.divider} />
        )}

        {type === 'Member' && (
        <View style={styles.pointsContainer}>
          <Text style={styles.points}>{points}</Text>
          <Text style={styles.pointsLabel}>poin</Text>
        </View>
        )}
      </View>
    </View>
  );
}

export default UserTab;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#B81519',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    display: 'flex',
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'column',
    display: 'flex',
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
  },
  division: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  divider: {
    width: 2,
    height: 40,
    backgroundColor: 'white',
  },
  pointsContainer: {
    width: '20%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  points: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    flexWrap: 'wrap',
    marginBottom: -9,
  },
  pointsLabel: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
  },
});
