import { useContext } from "react";
import { IProduct } from "../../libs/endpoints/products/products-schemas";
import CartContext from "../../libs/contexts/cart/cart-context";
import { Minus, Plus, Trash } from "@phosphor-icons/react";

export default function CartProductRow({
  productCart,
}: {
  productCart: {
    product: IProduct;
    orderNum: number;
  };
}) {
  const product = productCart.product;
  const orderNum = productCart.orderNum;

  const cartContext = useContext(CartContext);
  if (!cartContext)
    throw new Error("CartContext must be used within CartProvider");

  const { removeProduct, editProduct } = cartContext;

  return (
    <div className="flex items-start gap-4 py-4">
      <img alt="" src={product.image} className="max-w-28 h-auto" />

      <div className="flex items-center justify-between w-full gap-4 flex-1 flex-col md:flex-row">
        <div className="flex flex-col gap-1 self-start md:self-auto">
          <p className="text-lg font-semibold">{product.title}</p>
          <p className="text-sm text-neutral-500">{product.category}</p>
        </div>

        <div className="flex-col gap-2 flex items-center self-end md:self-auto">
          <p className="text-sky-600 font-semibold text-xl">${product.price}</p>
          <div className="p-3 rounded-md border flex items-center justify-between gap-4 text-sm font-semibold text-sky-600">
            <button
              onClick={() =>
                orderNum === 1
                  ? removeProduct(product.id)
                  : editProduct(product.id, orderNum - 1)
              }
            >
              {orderNum === 1 ? (
                <Trash size={20} className="fill-sky-600" />
              ) : (
                <Minus size={20} className="fill-sky-600" />
              )}
            </button>

            <p>{orderNum}</p>
            <button onClick={() => editProduct(product.id, orderNum + 1)}>
              <Plus size={20} className="fill-sky-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
