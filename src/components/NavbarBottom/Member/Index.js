import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const BottomNavigatorMember = () => {
  const [activeButton, setActiveButton] = useState('home');

  const handleButtonPress = (button) => {
    setActiveButton(button);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          activeButton === 'home' ? styles.activeButton : null,
        ]}
        onPress={() => handleButtonPress('home')}
      >
        <Image
          source={
            activeButton === 'home'
              ? require('../../../assets/GambarHome.png')
              : require('../../../assets/GambarEvent.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          activeButton === 'event' ? styles.activeButton : null,
        ]}
        onPress={() => handleButtonPress('event')}
      >
        <Image
          source={
            activeButton === 'event'
              ? require('../../../assets/GambarHome.png')
              : require('../../../assets/GambarEvent.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    height: 70,
    backgroundColor: '#fff', // Adjust the background color as needed
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 38,
    height: 54,
  }
});

export default BottomNavigatorMember;
