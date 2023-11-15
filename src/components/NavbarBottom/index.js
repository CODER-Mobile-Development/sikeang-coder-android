import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {
  AdminIcon, CalendarIcon, HomeIcon, ScanQRIcon, StarIcon,
} from '../../assets/svgs';

function NavbarBottom({ type, isActive }) {
  return (
    <View style={{
      overflow: 'hidden',
      borderTopWidth: 2,
      borderTopColor: '#F0F0F0',
    }}
    >
      <View style={{ ...styles.wrapper, justifyContent: type === 'Member' ? 'space-around' : 'space-between' }}>
        <View style={styles.menuSection}>
          <TouchableOpacity><HomeIcon width={32} height={32} isActive={isActive === 'Home'} /></TouchableOpacity>
          <Text style={styles.menuTitle}>home</Text>
        </View>
        {type === 'Member' && (
        <View style={styles.menuSection}>
          <TouchableOpacity><ScanQRIcon width={32} height={32} isActive={isActive === 'ScanQR'} /></TouchableOpacity>
          <Text style={styles.menuTitle}>presensi</Text>
        </View>
        )}
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
            <TouchableOpacity><AdminIcon width={32} height={32} isActive={isActive === 'Admin'} /></TouchableOpacity>
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
