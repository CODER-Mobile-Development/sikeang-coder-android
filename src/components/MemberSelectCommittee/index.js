import React, { useState } from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

function MemberSelectCommittee({ name, email, imageUri }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View style={styles.item}>
      <View>
        <Image source={{ uri: imageUri }} style={styles.photo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name} ellipsizeMode="tail" numberOfLines={2}>{name}</Text>
        <Text style={styles.email} ellipsizeMode="tail" numberOfLines={2}>{email}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => setIsSelected(!isSelected)}>
          <View style={styles.radioOuterCircle}>
            {isSelected && (<View style={styles.radioInnerCircle} />)}
          </View>
        </TouchableOpacity>
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
  textContainer: {
    width: '65%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  photo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#D9D9D9',
    marginRight: 10,
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

export default MemberSelectCommittee;
