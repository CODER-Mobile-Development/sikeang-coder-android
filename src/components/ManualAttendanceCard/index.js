import React, { useState } from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import UserInput from '../UserInput';

function ManualAttendanceCard({ name, email, photo }) {
  const [onDropdown, setOnDropdown] = useState(false);

  return (
    <View style={{ ...styles.item, marginBottom: onDropdown ? 30 : 0 }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.avatar}
          source={{ uri: photo }}
        />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <View style={styles.dropdownSection}>
        <UserInput
          data={[{ id: 1, value: 'Hadir' }, { id: 2, value: 'Alfa' }]}
          initialValue={{ id: 2, value: 'Alfa' }}
          onChange={(val) => console.log('up', val)}
          type="Dropdown"
          dropdownState
          onDropdown={(value) => setOnDropdown(value)}
        />
      </View>
    </View>
  );
}

export default ManualAttendanceCard;

const styles = StyleSheet.create({
  dropdownSection: {
    marginTop: 10,
    width: '100%',
  },
  item: {
    backgroundColor: '#3F5671',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    padding: 15,
  },
  avatar: {
    width: 51, height: 51, borderRadius: 26, marginRight: 15,
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
