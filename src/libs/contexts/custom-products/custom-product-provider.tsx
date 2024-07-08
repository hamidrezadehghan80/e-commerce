import { ReactNode, useEffect, useReducer } from "react";
import { ICustomProductContext } from "./types";
import {
  customProductReducer,
  initialState,
  saveStateToLocalStorage,
} from "./custom-product-reducer";
import { IProduct } from "../../endpoints/products/products-schemas";
import CustomProductContext from "./custom-product-context";

export default function CustomProductsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(customProductReducer, initialState);

  useEffect(() => {
    saveStateToLocalStorage(state);
  }, [state]);

  const addProduct = (product: IProduct) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };

  const editProduct = (id: number, product: IProduct) => {
    dispatch({ type: "EDIT_PRODUCT", payload: { id, product } });
  };

  const removeProduct = (id: number) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: { id } });
  };
  const getLastId = () => {
    return state.products.length === 0
      ? 1000
      : state.products[state.products.length - 1].id;
  };

  const contextValue: ICustomProductContext = {
    state,
    addProduct,
    editProduct,
    removeProduct,
    getLastId
  };

  return (
    <CustomProductContext.Provider value={contextValue}>
      {children}
    </CustomProductContext.Provider>
  );
}
