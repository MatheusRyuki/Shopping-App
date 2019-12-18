import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}> {props.quantity} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>R$ {props.amount.toFixed(2)}</Text>
        {props.detetable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Ionicons name={"md-trash"} size={23} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center"
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 20
  }
});

export default CartItem;
