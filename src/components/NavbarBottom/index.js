import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {
  AdminIcon, CalendarIcon, HomeIcon, StarIcon,
} from '../../assets/svgs';

function NavbarBottom({ type, isActive }) {
  return (
    <View style={{ overflow: 'hidden', paddingTop: 6 }}>
      <View style={{ ...styles.wrapper, justifyContent: type === 'Member' ? 'space-around' : 'space-between' }}>
        <View style={styles.menuSection}>
          <TouchableOpacity><HomeIcon width={32} height={32} isActive={isActive === 'Home'} /></TouchableOpacity>
          <Text style={styles.menuTitle}>home</Text>
        </View>
        <View style={styles.menuSection}>
          <TouchableOpacity><CalendarIcon width={32} height={32} isActive={isActive === 'Event'} /></TouchableOpacity>
          <Text style={styles.menuTitle}>event</Text>
        </View>
        {type === 'Admin' && (
        <View style={styles.menuSection}>
          <TouchableOpacity><StarIcon width={32} height={32} isActive={isActive === 'Poin'} /></TouchableOpacity>
          <Text style={styles.menuTitle}>poin</Text>
        </View>
        )}
        {type === 'Admin' && (
        <View style={styles.menuSection}>
          <TouchableOpacity><AdminIcon width={32} height={32} isActive={isActive === 'Admin'}/></TouchableOpacity>
          <Text style={styles.menuTitle}>admin</Text>
        </View>
        )}
      </View>
    </View>
  );
}

export default NavbarBottom;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 15,
    backgroundColor: 'white',
    paddingHorizontal: 35,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  menuSection: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  menuTitle: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
});
