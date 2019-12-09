import PRODUCTS from "../../data/data";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerID === "u1")
};

export default (state = initialState, action) => {
  return state;
};
