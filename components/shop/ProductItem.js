import React from "react";
import Colors from "../../constants/Colors";
import { View, Text, Image, StyleSheet, Button } from "react-native";

const ProductItem = props => {
  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </View>
      <View style={styles.detail}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>R$ {props.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title={"Ver detalhes"}
          onPress={props.onViewDetail}
        />
        <Button
          color={Colors.primary}
          title={"Carrinho"}
          onPress={props.onAddToCart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    alignItems: "center",
    height: "15%",
    padding: 10
  },
  product: {
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20
  },
  image: {
    width: "100%",
    height: "100%"
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  title: {
    fontSize: 18,
    marginVertical: 4
  },
  price: {
    fontSize: 14,
    color: "#888"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20
  }
});

export default ProductItem;
