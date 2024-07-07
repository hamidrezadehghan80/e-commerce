import { createContext, ReactNode, useReducer } from "react";
import { ICartContextType } from "./types";
import { cartReducer, initialState } from "./cart-reducer";
import { IProduct } from "../../endpoints/products/products-schemas";
import CartContext from "./cart-context";

export default function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addProduct = (product: IProduct) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };

  const editProduct = (id: number, orderNum: number) => {
    dispatch({ type: "EDIT_PRODUCT", payload: { id, orderNum } });
  };

  const removeProduct = (id: number) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getCartTotalAmount = () => {
    return state.products.reduce(
      (acc, product) => acc + product.product.price * product.orderNum,
      0
    );
  };

  const contextValue: ICartContextType = {
    state,
    addProduct,
    editProduct,
    removeProduct,
    getCartTotalAmount,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
