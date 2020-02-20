import React from "react";
import { useSelector } from "react-redux";
import { ProductsNavigator } from "./ShopNavigation";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const MyStack = createStackNavigator();

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);

  return <NavigationContainer> 
    <ProductsNavigator />
  </NavigationContainer>;
};

export default AppNavigator;
