import React from "react";
import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as actions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderBUtton";
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      title: title
    });
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title={"Ver detalhes"}
            onPress={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)
            }
          />
          <Button
            color={Colors.primary}
            title={"Carrinho"}
            onPress={() => dispatch(actions.addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "Todos Produtos",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={"md-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={"md-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    )
  };
};

export default ProductsOverviewScreen;
