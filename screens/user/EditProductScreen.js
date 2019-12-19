import React, { useCallback, useEffect, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderBUtton";
import { useSelector } from "react-redux";
import * as productsActions from "../../store/actions/products";
import { useDispatch } from "react-redux";

const FORM_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
  }
};

const EditProductScreen = props => {
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      url: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: ""
    },
    inputValidities: {
      title: editedProduct ? true : false,
      url: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  });

  const submitHandler = useCallback(() => {
    if (!titleIsValid) {
      Alert.alert(
        "Informações erradas!",
        "Por favor, cheque as informações do formulário.",
        [{ text: "Ok" }]
      );
      return;
    }
    if (editedProduct) {
      dispatch(productsActions.updateProduct(prodId, title, description, url));
    } else {
      dispatch(productsActions.createProduct(title, description, url, +price));
    }
    props.navigation.goBack();
  }, [dispatch, prodId, title, url, price, description, titleIsValid]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const titleHandlerChange = text => {
    let isValid = false;
    if (text.trim().length === 0) {
      isValid = true;
    }
    dispatchForm({ type: FORM_UPDATE, value: text, isValid, input: "title" });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleHandlerChange}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          {!titleIsValid && <Text>Por favor, coloque um título válido./</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>URL da Imagem</Text>
          <TextInput
            style={styles.input}
            value={url}
            onChangeText={text => setUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Preço</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam("submit");

  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Editar Produto"
      : "Adicionar Produto",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName={"md-checkmark"} onPress={submitFn} />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: "100%"
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});

export default EditProductScreen;
