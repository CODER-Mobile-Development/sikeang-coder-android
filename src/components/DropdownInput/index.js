import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { ChevronDown, ChevronUp } from '../../assets/svgs';

function DropdownInput({
  label,
  data,
  dropdownInitialId,
  dropdownState,
  onDropdown,
  onChange,
}) {
  const [showDropdownItem, setShowDropdownItem] = useState(false);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState({});
  const [dataDropdownItem, setDataDropdownItem] = useState([]);

  useEffect(() => {
    if (data) {
      const filterSelectedDropdown = data.filter((item) => item.id === dropdownInitialId);
      if (filterSelectedDropdown.length === 0) {
        setSelectedDropdownItem(data[0]);
      } else {
        setSelectedDropdownItem(filterSelectedDropdown[0]);
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      setDataDropdownItem(data.filter((item) => !(item.id === selectedDropdownItem.id)));
    }
  }, [selectedDropdownItem]);
  return (
    <View>
      {label && (
      <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16 }}>
        {label}
      </Text>
      )}
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
        <View style={{ ...styles.wrapperMenuDropdown }}>
          {dataDropdownItem.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{ ...styles.menuDropdownButton, height: 44 }}
              onPress={(() => {
                setShowDropdownItem(false);
                if (dropdownState) onDropdown(false);
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
  );
}

export default DropdownInput;

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
    width: '100%',
    backgroundColor: 'white',
    zIndex: 1,
  },
  menuDropdownButton: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
});
