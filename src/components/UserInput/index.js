import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { ChevronDown, ChevronUp, SmallCalendarIcon } from '../../assets/svgs';

function UserInput({
  label,
  type,
  value,
  onChange,
  onPress,
  data, // type: Dropdown
  initialValue, // type: Dropdown
  dropdownState, // type: Dropdown
  onDropdown, // type: Dropdown
}) {
  const [showDropdownItem, setShowDropdownItem] = useState(false);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState(initialValue);
  const [dataDropdownItem, setDataDropdownItem] = useState([]);
  let textAreaInputRef = useRef();

  useEffect(() => {
    if (data) {
      setDataDropdownItem(data.filter((item) => !(item.id === selectedDropdownItem.id)));
    }
  }, [selectedDropdownItem]);

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
      {type === 'Dropdown' && (
      <View>
        <TouchableOpacity
          style={{
            ...styles.dropdownButton,
            height: 44,
            borderBottomRightRadius: showDropdownItem ? 0 : 12,
            borderBottomLeftRadius: showDropdownItem ? 0 : 12,
          }}
          onPress={() => {
            setShowDropdownItem(!showDropdownItem);
            if (dropdownState) onDropdown(!showDropdownItem);
          }}
        >
          <Text style={{ fontFamily: 'Poppins-Medium' }}>{selectedDropdownItem.value}</Text>
          {showDropdownItem
            ? <ChevronUp width={17} height={11} />
            : <ChevronDown width={17} height={11} />}
        </TouchableOpacity>
        {showDropdownItem && (
        <View style={{ ...styles.wrapperMenuDropdown, marginTop: 44 }}>
          {dataDropdownItem.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{ ...styles.menuDropdownButton, height: 44 }}
              onPress={(() => {
                setShowDropdownItem(false);
                onDropdown(false);
                setSelectedDropdownItem({ id: item.id, value: item.value });
                onChange({ id: item.id, value: item.value });
              })}
            >
              <Text style={{ fontFamily: 'Poppins-Medium' }}>{item.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
        )}
      </View>
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
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    alignItems: 'center',
    paddingHorizontal: 15,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'white',
  },
  wrapperMenuDropdown: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    zIndex: 1,
  },
  menuDropdownButton: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
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
