import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { ChevronDown, ChevronUp } from '../../assets/svgs';

function UserInput({
  label, type, onChange, data, initialValue, smallSize,
}) {
  const [showDropdownItem, setShowDropdownItem] = useState(false);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState({
    id: 0,
    value: '',
  });
  const [dataDropdownItem, setDataDropdownItem] = useState([]);

  useEffect(() => {
    if (data) {
      setSelectedDropdownItem(initialValue || { id: data[0].id, value: data[0].value });
      onChange(initialValue || { id: data[0].id, value: data[0].value });
    }
  }, [data, initialValue]);

  useEffect(() => {
    if (data) {
      setDataDropdownItem(data.filter((item) => !(item.value === selectedDropdownItem.value)));
    }
  }, [data, selectedDropdownItem]);

  const handleSelectedDropdownItem = (id, value) => {
    setShowDropdownItem(false);
    setSelectedDropdownItem({ id, value });
    onChange({ id, value });
  };

  return (
    <View>
      {label && (
      <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16 }}>
        {label}
      </Text>
      )}
      {type === 'Basic' && <TextInput style={styles.textInputBasic} onChangeText={onChange} />}
      {type === 'TextArea' && <TextInput multiline style={styles.textInputArea} onChangeText={onChange} />}
      {type === 'Dropdown' && (
      <View>
        <TouchableOpacity
          style={{
            ...styles.dropdownButton,
            height: smallSize ? 24 : 44,
            borderBottomRightRadius: showDropdownItem ? 0 : 12,
            borderBottomLeftRadius: showDropdownItem ? 0 : 12,
          }}
          onPress={() => setShowDropdownItem(!showDropdownItem)}
        >
          <Text style={{ fontFamily: 'Poppins-Medium' }}>{selectedDropdownItem.value}</Text>
          {showDropdownItem
            ? <ChevronUp width={17} height={11} />
            : <ChevronDown width={17} height={11} />}
        </TouchableOpacity>
        {showDropdownItem && (
        <View style={{ ...styles.wrapperMenuDropdown, marginTop: smallSize ? 24 : 44 }}>
          {dataDropdownItem.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{ ...styles.menuDropdownButton, height: smallSize ? 24 : 44 }}
              onPress={(() => handleSelectedDropdownItem(item.id, item.value))}
            >
              <Text style={{ fontFamily: 'Poppins-Medium' }}>{item.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
        )}
      </View>
      )}
    </View>
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
    fontFamily: 'Poppins-Medium',
    borderWidth: 2,
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  textInputArea: {
    fontFamily: 'Poppins-Medium',
    borderWidth: 2,
    height: 84,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
});
