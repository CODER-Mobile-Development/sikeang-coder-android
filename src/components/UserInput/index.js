import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { ChevronDown, ChevronUp } from '../../assets/svgs';

function UserInput({
  label, type, onChange, data,
}) {
  const [showDropdownItem, setShowDropdownItem] = useState(false);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState({
    id: 0,
    value: '',
  });
  const [dataDropdownItem, setDataDropdownItem] = useState([]);

  useEffect(() => {
    if (data) {
      setSelectedDropdownItem({ id: data[0].id, value: data[0].value });
      onChange({ id: data[0].id, value: data[0].value });
    }
  }, [data]);

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
      <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16 }}>
        {label}
      </Text>
      {type === 'Basic' && <TextInput style={styles.textInputBasic} onChangeText={onChange} />}
      {type === 'TextArea' && <TextInput multiline style={styles.textInputArea} onChangeText={onChange} />}
      {type === 'Dropdown' && (
      <View>
        <TouchableOpacity
          style={{
            ...styles.dropdownButton,
            borderBottomRightRadius: showDropdownItem ? 0 : 12,
            borderBottomLeftRadius: showDropdownItem ? 0 : 12,
          }}
          onPress={() => setShowDropdownItem(!showDropdownItem)}
        >
          <Text style={{ fontFamily: 'Poppins-Medium' }}>{selectedDropdownItem.value}</Text>
          {showDropdownItem ? <ChevronUp /> : <ChevronDown />}
        </TouchableOpacity>
        {showDropdownItem && (
        <View style={styles.wrapperMenuDropdown}>
          {dataDropdownItem.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuDropdownButton}
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
    height: 44,
    paddingHorizontal: 15,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  wrapperMenuDropdown: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
  menuDropdownButton: {
    height: 44,
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
  },
  textInputArea: {
    fontFamily: 'Poppins-Medium',
    borderWidth: 2,
    height: 84,
    borderRadius: 12,
    paddingHorizontal: 15,
  },
});
