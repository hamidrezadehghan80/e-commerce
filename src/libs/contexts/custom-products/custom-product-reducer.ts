import { ICustomProductsState, ICustomProductAction } from "./types";

const CUSTOM_PRODUCT_STORAGE_KEY = "custom_product_state";

export const saveStateToLocalStorage = (state: ICustomProductsState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(CUSTOM_PRODUCT_STORAGE_KEY, serializedState);
  } catch (error) {
    console.error("Could not save cart state:", error);
  }
};

export const loadStateFromLocalStorage = ():
  | ICustomProductsState
  | undefined => {
  try {
    const serializedState = localStorage.getItem(CUSTOM_PRODUCT_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load cart state:", error);
    return undefined;
  }
};

export const initialState: ICustomProductsState =
  loadStateFromLocalStorage() || {
    products: [],
  };

export const customProductReducer = (
  state: ICustomProductsState,
  action: ICustomProductAction
): ICustomProductsState => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        products: [...state.products, action.payload],
      };

    case "EDIT_PRODUCT":
      return {
        products: state.products.map((product) =>
          product.id !== action.payload.id
            ? product
            : action.payload.product
        ),
      };
    case "REMOVE_PRODUCT":
      return {
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};
