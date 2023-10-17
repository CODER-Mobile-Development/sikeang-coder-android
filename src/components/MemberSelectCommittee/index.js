import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { RadioButton } from 'react-native-paper';

function MemberSelectCommittee() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.circle}>
            <Image style={styles.photo} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>Muhammad Adib F</Text>
            <Text style={styles.email}>adib@gmail.com</Text>
          </View>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            value="isSelected"
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={() => setIsSelected(!isSelected)}
            color="#FFFFFF"
            uncheckedColor="#FFFFFF"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#3F5671",
    height: 74,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  circle: {
    marginRight: 15,
    marginTop: 0,
    marginLeft: 18,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  radioContainer: {
    marginRight: 20,
  },
  photo: {
    width: 51,
    height: 51,
    borderRadius: 26,
    backgroundColor: "#D9D9D9",
  },
  name: {
    maxWidth: "100%",
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  email: {
    maxWidth: "100%",
    color: "#FFFFFF",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
});

export default MemberSelectCommittee;
