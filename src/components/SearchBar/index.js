import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { PersonSearch } from '../../assets/svgs';

function SearchBar({ placeholder }) {
  return (
    <View style={style.wrapper}>
      <View style={style.Icon}>
        <PersonSearch height={24} width={24} />
      </View>
      <TextInput placeholder={placeholder} style={style.text} />
    </View>
  );
}

export default SearchBar;

const style = StyleSheet.create({
  wrapper: {
    borderColor: '#6A6A6A',
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 12,
    height: 38,
    paddingTop: 1,
  },
  Icon: {
    marginLeft: 19,
    marginRight: 14,
    paddingTop: 6,
  },
  text: {
    marginRight: 10,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    width: '100%',
  },
});
