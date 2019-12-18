import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import ProductsOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrdersScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerTintColor: "white"
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name={"md-cart"} size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Order: OrderScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name={"md-list"} size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Produtos: ProductsNavigator,
    Pedidos: OrdersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

export default createAppContainer(ShopNavigator);
