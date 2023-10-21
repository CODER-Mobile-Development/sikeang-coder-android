import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import UserInput from '../UserInput';

function ManualAttendanceCard({ name, email, photo }) {
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
            <View style={styles.dropdownSection}>
              <UserInput
                smallSize
                data={[{ id: 1, value: 'Hadir' }, { id: 2, value: 'Tdk Hadir' }]}
                initialValue={{ id: 2, value: 'Tdk Hadir' }}
                onChange={(val) => console.log(val)}
                type="Dropdown"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ManualAttendanceCard;

const styles = StyleSheet.create({
  dropdownSection: {
    marginTop: 5,
    height: 23,
    width: '80%',
  },
  item: {
    backgroundColor: '#3F5671',
    height: 109,
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
