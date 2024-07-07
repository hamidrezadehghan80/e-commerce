import { ICartState, ICartAction } from "./types";

const CART_STORAGE_KEY = "cart_state";

export const saveStateToLocalStorage = (state: ICartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(CART_STORAGE_KEY, serializedState);
  } catch (error) {
    console.error("Could not save cart state:", error);
  }
};

export const loadStateFromLocalStorage = (): ICartState | undefined => {
  try {
    const serializedState = localStorage.getItem(CART_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load cart state:", error);
    return undefined;
  }
};

export const initialState: ICartState = loadStateFromLocalStorage() || {
  products: [],
};

export const cartReducer = (
  state: ICartState,
  action: ICartAction
): ICartState => {
  let newState: ICartState;

  switch (action.type) {
    case "ADD_PRODUCT":
      newState = {
        products: [
          ...state.products,
          { product: action.payload, orderNum: 1, id: action.payload.id },
        ],
      };
      break;

    case "EDIT_PRODUCT":
      newState = {
        products: state.products.map((product) =>
          product.id !== action.payload.id
            ? product
            : { ...product, orderNum: action.payload.orderNum }
        ),
      };
      break;
    case "REMOVE_PRODUCT":
      newState = {
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
      break;
    case "CLEAR_CART":
      newState = { products: [] };
      break;

    default:
      return state;
  }

  saveStateToLocalStorage(newState);
  return newState;
};
