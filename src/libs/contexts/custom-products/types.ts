import { IProduct } from "../../endpoints/products/products-schemas";
export interface ICustomProductsState {
  products: IProduct[];
}

export type ICustomProductAction =
  | { type: "ADD_PRODUCT"; payload: IProduct }
  | { type: "EDIT_PRODUCT"; payload: { id: number; product: IProduct } }
  | { type: "REMOVE_PRODUCT"; payload: { id: number } };

export interface ICustomProductContext {
  state: ICustomProductsState;
  addProduct: (product: IProduct) => void;
  editProduct: (id: number, product: IProduct) => void;
  removeProduct: (id: number) => void;
  getLastId: () => number;
}
