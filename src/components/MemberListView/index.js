import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';

function MemberListView({
  name, email, photo, studyProgram,
}) {
  return (
    <View style={styles.item}>
      <View style={{ marginRight: 15 }}>
        <Image style={styles.photo} source={{ uri: photo }} />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={styles.textSemiBold}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {name}
        </Text>
        <Text
          style={styles.textMedium}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {email}
        </Text>
        <Text
          style={styles.textMedium}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {studyProgram}
        </Text>
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
  photo: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  textContainer: {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'flex-start',
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

export default MemberListView;
