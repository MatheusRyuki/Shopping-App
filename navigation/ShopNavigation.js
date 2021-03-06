import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import ProductsOverviewScreen, { screenOptions as OverviewOptions } from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen, { screenOptions as ProductsDetailOptions } from "../screens/shop/ProductDetailsScreen";
import UserProductsScreen, { screenOptions as UsersOptions }from "../screens/user/UserProductScreen";
import EditProductsScreen, { screenOptions as EditsOptions } from "../screens/user/EditProductScreen";
import CartScreen, { screenOptions as CartOptions } from "../screens/shop/CartScreen";
import OrderScreen, { screenOptions as OrdersOptions}  from "../screens/shop/OrdersScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AuthScreen, { screenOptions as AuthOptions } from "../screens/user/AuthScreen";
import { SafeAreaView, Button, View } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerTintColor: "white"
};


const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <ProductsStackNavigator.Screen name="ProductsOverview" component={ProductsOverviewScreen} options={OverviewOptions}/>
    <ProductsStackNavigator.Screen name="ProductDetail" component={ProductDetailScreen} options={ProductsDetailOptions} />
    <ProductsStackNavigator.Screen name="Cart" component={CartScreen} options={CartOptions} />
  </ProductsStackNavigator.Navigator>
};

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <OrdersStackNavigator.Screen name="Order" component={OrderScreen} options={OrdersOptions} />
  </OrdersStackNavigator.Navigator>
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <AdminStackNavigator.Screen name="UserProducts" component={UserProductsScreen} options={UsersOptions} />
    <AdminStackNavigator.Screen name="EditProduct" component={EditProductsScreen} options={EditsOptions} />
  </AdminStackNavigator.Navigator>
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (<ShopDrawerNavigator.Navigator drawerContent={props => {
    return (
      <View style={{ flex: 1, paddingTop: 25 }}>
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <DrawerItemList {...props} />
        <Button
          title="Sair"
          color={Colors.primary}
          onPress={() => {
            dispatch(authActions.logout());
          }}
        />
      </SafeAreaView>
    </View>)}}
    drawerContentOptions={{activeTintColor: Colors.primary}}>

    <ShopDrawerNavigator.Screen name="Produtos" component={ProductsNavigator} options={{drawerIcon: props => (
        <Ionicons name={"md-cart"} size={23} color={props.color} />
      )}} />
    <ShopDrawerNavigator.Screen name="Pedidos" component={OrdersNavigator} options={{
      drawerIcon: props => (
        <Ionicons name={"md-list"} size={23} color={props.color} />
      )
    }} />
    <ShopDrawerNavigator.Screen name="Admin" component={AdminNavigator} options={{drawerIcon: props => (
        <Ionicons name={"md-create"} size={23} color={props.color} />
      )}} />
  </ShopDrawerNavigator.Navigator>)
}

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={AuthOptions} />
  </AuthStackNavigator.Navigator>
};