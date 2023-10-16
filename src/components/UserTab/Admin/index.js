import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserTabAdmin = ({ imageUri, name, division }) => {
  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.division}>{division}</Text>
        </View>
      </View>
    </View>
  );
};

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
    padding: 9,
    margin: 16,
    flex: 1, 
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    display: 'flex',
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 9999,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '700',
    wordWrap: 'break-word',
  },
  division: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '600',
    wordWrap: 'break-word',
  },
  divider: {
    width: 2,
    height: '100%',
    backgroundColor: 'white',
  },
});

export default UserTabAdmin;
