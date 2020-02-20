import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as actions from "../../store/actions/cart";

const ProductDetailScreen = props => {
  const productId = props.route.params.productId;
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title={"Adicionar ao carrinho"}
          onPress={() => {
            dispatch(actions.addToCart(selectedProduct));
          }}
        />
      </View>

      <Text style={styles.price}>R$ {selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  actions: {
    marginVertical: 10,
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: 300
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold"
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20
  }
});

export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.title
  };
};

export default ProductDetailScreen;
