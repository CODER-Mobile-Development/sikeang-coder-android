import React, { useState } from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

function MemberSelectCommittee({ name, email, imageUri }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.circle}>
            <Image source={{ uri: imageUri }} style={styles.photo} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>
        <View style={styles.radioContainer}>
          <TouchableOpacity onPress={() => setIsSelected(!isSelected)}>
            <View style={styles.radioOuterCircle}>
              {isSelected && (<View style={styles.radioInnerCircle} />)}
            </View>
          </TouchableOpacity>
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
  radioOuterCircle: {
    height: 28,
    width: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInnerCircle: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: 'white',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  circle: {
    marginRight: 15,
    marginTop: 0,
    marginLeft: 18,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  radioContainer: {
    marginRight: 20,
  },
  photo: {
    width: 51,
    height: 51,
    borderRadius: 26,
    backgroundColor: '#D9D9D9',
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

export default MemberSelectCommittee;
