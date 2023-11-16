import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

function NavbarBottom({ state, descriptors, navigation }) {
  return (
    <View style={styles.wrapper}>
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

export default NavbarBottom;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 15,
    backgroundColor: 'white',
    paddingHorizontal: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 2,
    borderTopColor: '#F0F0F0',
  },
});
