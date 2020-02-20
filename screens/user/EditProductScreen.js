import React, { useCallback, useState, useEffect, useReducer } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderBUtton";
import { useSelector } from "react-redux";
import * as productsActions from "../../store/actions/products";
import { useDispatch } from "react-redux";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";

const FORM_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };

    let formIsValid = true;

    for (const key in updatedValidities) {
      formIsValid = formIsValid && updatedValidities[key];
    }
    return {
      formIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const prodId = props.route.params ? props.route.params.productId : null;
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

  useEffect(() => {
    if (error) {
      Alert.alert("Um erro ocorreu!", error, [{ text: "Ok" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert(
        "Informações erradas!",
        "Por favor, cheque as informações do formulário.",
        [{ text: "Ok" }]
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.url
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.url,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err);
    }

    setIsLoading(false);
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Menu" iconName={"md-checkmark"} onPress={submitHandler} />
        </HeaderButtons>
      )});
  }, [submitHandler]);

  const inputHandlerChange = useCallback(
    (inputIdentifier, value, isValid) => {
      dispatchForm({
        type: FORM_UPDATE,
        value,
        isValid,
        input: inputIdentifier
      });
    },
    [dispatchForm]
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Título"
            errorMsg="Por favor, coloque um título válido"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            initialValue={editedProduct ? editedProduct.title : ""}
            initialValid={editedProduct ? true : false}
            onInputChange={inputHandlerChange}
            required
          />
          <Input
            id="url"
            label="Imagem"
            errorMsg="Por favor, coloque uma imagem válido"
            keyboardType="default"
            returnKeyType="next"
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initialValid={editedProduct ? true : false}
            onInputChange={inputHandlerChange}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Preço"
              errorMsg="Por favor, coloque um preço válido"
              keyboardType="decimal-pad"
              returnKeyType="next"
              required
              min={0.1}
              onInputChange={inputHandlerChange}
            />
          )}
          <Input
            id="description"
            label="Descrição"
            errorMsg="Por favor, coloque uma descrição válida"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            initialValue={editedProduct ? editedProduct.description : ""}
            initialValid={editedProduct ? true : false}
            required
            onInputChange={inputHandlerChange}
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = navData => {
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.productId
      ? "Editar Produto"
      : "Adicionar Produto",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default EditProductScreen;
