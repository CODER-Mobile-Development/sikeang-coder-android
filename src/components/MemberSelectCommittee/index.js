import React, { useEffect, useState } from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { API_HOST, CallAPI, showToast } from '../../utils';

function MemberSelectCommittee({
  name, email, imageUri, studyProgram, status, eventId, userId, setLoadingScreen,
}) {
  const insets = useSafeAreaInsets();
  const [selectedState, setSelectedState] = useState({
    state: 'initial',
    active: status,
  });

  const addCommitteePointTransactionAPI = (data) => {
    setLoadingScreen(true);
    CallAPI({
      url: `${API_HOST}/point-transaction`,
      method: 'POST',
      data,
    })
      .then(() => {
        showToast(
          data.status
            ? `Berhasil menambahkan panitia ${name}!`
            : `Berhasil menghapus panitia ${name}!`,
          'success',
          insets.top,
        );
        setLoadingScreen(false);
      })
      .catch(() => {
        setSelectedState({
          state: 'error',
          active: !data.status,
        });
        showToast(
          'Gagal mengubah status panitia!',
          'danger',
          insets.top,
        );
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    if (selectedState.state === 'onChangeData') {
      addCommitteePointTransactionAPI({
        activities: 'committee',
        userId,
        eventId,
        status: selectedState.active,
      });
    }
  }, [selectedState]);

  return (
    <View style={styles.item}>
      <View>
        <Image source={{ uri: imageUri }} style={styles.photo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textSemiBold} ellipsizeMode="tail" numberOfLines={2}>{name}</Text>
        <Text style={styles.textMedium} ellipsizeMode="tail" numberOfLines={2}>{email}</Text>
        <Text style={styles.textMedium} ellipsizeMode="tail" numberOfLines={2}>{studyProgram}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => setSelectedState({
          state: 'onChangeData',
          active: !selectedState.active,
        })}
        >
          <View style={styles.radioOuterCircle}>
            {selectedState.active && <View style={styles.radioInnerCircle} />}
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
});

export default MemberSelectCommittee;
