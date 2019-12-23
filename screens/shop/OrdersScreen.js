import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  Text
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderBUtton";
import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constants/Colors";
import * as ordersActions from "../../store/actions/order";

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders())
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Sem pedidos para mostrar.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Seus Pedidos",
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
    )
  };
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default OrdersScreen;
