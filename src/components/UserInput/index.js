import React, { useRef } from 'react';
import {
  StyleSheet, Text, TextInput, TouchableOpacity,
} from 'react-native';
import { SmallCalendarIcon } from '../../assets/svgs';

function UserInput({
  label,
  type,
  value,
  onChange,
  onPress,
}) {
  let textAreaInputRef = useRef();

  return (
    <>
      {label && (
      <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16 }}>
        {label}
      </Text>
      )}
      {type === 'Basic' && <TextInput style={styles.textInputBasic} onChangeText={onChange} value={value} />}
      {type === 'TextArea' && (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => textAreaInputRef.focus()}
        style={styles.wrapperTextInputArea}
      >
        <TextInput
          ref={(input) => {
            textAreaInputRef = input;
          }}
          multiline
          style={styles.textInputArea}
          onChangeText={onChange}
          value={value}
        />
      </TouchableOpacity>
      )}
      {type === 'DateTimePicker' && (
      <TouchableOpacity
        style={styles.dateTimePickerArea}
        onPress={onPress}
      >
        <Text style={{ fontFamily: 'Poppins-Medium', marginTop: 1 }}>{value}</Text>
        <SmallCalendarIcon />
      </TouchableOpacity>
      )}
    </>
  );
}

export default UserInput;

const styles = StyleSheet.create({
  textInputBasic: {
    marginTop: 1,
    fontFamily: 'Poppins-Medium',
    borderWidth: 2,
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  wrapperTextInputArea: {
    height: 84,
    borderWidth: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  textInputArea: {
    paddingVertical: 5,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  dateTimePickerArea: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
});
