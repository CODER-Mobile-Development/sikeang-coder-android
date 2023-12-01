import React, { useEffect, useRef, useState } from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DropdownInput from '../DropdownInput';
import { API_HOST, CallAPI, showToast } from '../../utils';

function ManualAttendanceCard({
  name, email, photo, isAttending, studyProgram, userId, eventId, setLoadingScreen,
}) {
  const insets = useSafeAreaInsets();
  const attendanceStatusOption = useRef([
    { id: true, value: 'Hadir' },
    { id: false, value: 'Tidak Hadir' },
  ]);
  const [attendanceStatusDropdown, setAttendanceStatusDropdown] = useState({
    state: 'initial',
    onDropdown: false,
    data: { id: false, value: 'Tidak Hadir' },
  });

  const addManualAttendanceTransactionAPI = (data) => {
    setLoadingScreen(true);
    CallAPI({
      url: `${API_HOST}/point-transaction/manual-attendance`,
      method: 'POST',
      data,
    })
      .then(() => {
        showToast(
          'Berhasil mengubah status presensi!',
          'success',
          insets.top,
        );
        setLoadingScreen(false);
      })
      .catch(() => {
        showToast(
          'Gagal mengubah status presensi!',
          'danger',
          insets.top,
        );
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    if (attendanceStatusDropdown.state === 'onChangeData') {
      addManualAttendanceTransactionAPI({
        userId,
        eventId,
        isAttending: attendanceStatusDropdown.data.id,
      });
    }
  }, [attendanceStatusDropdown]);

  return (
    <View style={styles.item}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginRight: 15 }}>
          <Image
            style={styles.photo}
            source={{ uri: photo }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textSemiBold} ellipsizeMode="tail" numberOfLines={2}>{name}</Text>
          <Text style={styles.textMedium} ellipsizeMode="tail" numberOfLines={2}>{email}</Text>
          <Text style={styles.textMedium} ellipsizeMode="tail" numberOfLines={2}>{studyProgram}</Text>
        </View>
      </View>
      <View style={styles.dropdownSection}>
        <DropdownInput
          data={attendanceStatusOption.current}
          dropdownInitialId={isAttending}
          dropdownState
          onDropdown={(val) => setAttendanceStatusDropdown({
            state: 'onDropdown',
            onDropdown: val,
            data: attendanceStatusDropdown.data,
          })}
          onChange={(val) => setAttendanceStatusDropdown({
            state: 'onChangeData',
            onDropdown: false,
            data: val,
          })}
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
  photo: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  textSemiBold: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  textMedium: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  textContainer: {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});
