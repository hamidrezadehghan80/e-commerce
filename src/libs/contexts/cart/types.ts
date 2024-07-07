import { IProduct } from "../../endpoints/products/products-schemas";
export interface ICartState {
  products: {
    id : number;
    product: IProduct;
    orderNum: number;
  }[];
}

export type ICartAction =
  | { type: "ADD_PRODUCT"; payload: IProduct }
  | { type: "EDIT_PRODUCT"; payload: { id : number; orderNum: number } }
  | { type: "REMOVE_PRODUCT"; payload: { id: number } }
  | { type: "CLEAR_CART" };

export interface ICartContextType {
  state: ICartState;
  addProduct: (product: IProduct) => void;
  editProduct: (id: number, orderNum: number) => void;
  removeProduct: (id: number) => void;
  clearCart: () => void;
  getCartTotalAmount: () => number;
}
