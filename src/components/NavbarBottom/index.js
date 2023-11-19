import React, { Fragment, useEffect, useState } from 'react';
import {
  Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function NavbarBottom({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  });
  if (state) {
    return (
      <View style={{
        ...styles.wrapper,
        display: keyboardVisible ? 'none' : 'flex',
        paddingBottom: Platform.OS === 'ios' ? insets.bottom : insets.bottom + 10,
      }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isActive = state.index === index;

          return (
            <View
              key={route.key}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                });

                if (!isActive && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              >
                {options.tabBarIcon({ isActive })}
              </TouchableOpacity>
              <Text style={{
                textAlign: 'center',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 12,
              }}
              >
                {options.tabBarLabel}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }

  return (<></>);
}

export default NavbarBottom;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 15,
    backgroundColor: 'white',
    paddingHorizontal: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderTopColor: '#F0F0F0',
  },
});
