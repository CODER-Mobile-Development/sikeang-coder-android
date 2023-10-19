import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

function EventListView() {

  return (
    <View>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.circle}>
            <Image style={styles.photo} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>Rapat Anggota</Text>
            <Text style={styles.email}>Kamis, 12 Oktober 2023</Text>
             <TouchableOpacity style={styles.button}>
               <Text style={styles.buttonText}>lihat detail</Text>
             </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#3F5671",
    height: 105,
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
    flex: 1,
  },
  photo: {
    width: 68,
    height: 68,
    borderRadius: 8,
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
    fontWeight: "500",
    fontSize: 14,
  },
  button: {
      backgroundColor: "#FFFFFF",
      borderRadius: 50,
      paddingHorizontal: 15,
      alignSelf: "flex-start",
    },
    buttonText: {
      color: "black",
      fontFamily: "Poppins-Medium",
      fontSize: 14,
    },
});

export default EventListView;
