import { ICartState, ICartAction } from "./types";

export const initialState: ICartState = {
  products: [],
};

export const cartReducer = (
  state: ICartState,
  action: ICartAction
): ICartState => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        products: [...state.products, { product: action.payload, orderNum: 1 }],
      };

    case "EDIT_PRODUCT":
      return {
        products: state.products.map((product) =>
          product.product.id !== action.payload.id
            ? product
            : { ...product, orderNum: action.payload.orderNum }
        ),
      };
    case "REMOVE_PRODUCT":
      return {
        products: state.products.filter(
          (product) => product.product.id !== action.payload.id
        ),
      };
    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};
