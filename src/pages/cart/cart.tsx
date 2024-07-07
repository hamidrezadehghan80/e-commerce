import { useContext } from "react";
import MainHeader from "../../components/layout/main-header";
import CartContext from "../../libs/contexts/cart/cart-context";
import { Button } from "../../components/ui/button";
import CartProductRow from "../../components/cart/cart-product-row";
import { EmptyCartIcon } from "../../assets/icons/icons";
import { AppRoutes } from "../../libs/routes";
import { Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function Cart() {
  const cartContext = useContext(CartContext);
  if (!cartContext)
    throw new Error("CartContext must be used within CartProvider");

  const { state: cart, getCartTotalAmount, clearCart } = cartContext;

  const cartTotalAmount = getCartTotalAmount();

  const cartItemsCount = cart.products.reduce(
    (acc, cartItem) => acc + cartItem.orderNum,
    0
  );

  return (
    <div className="h-full container flex flex-col px-6">
      <MainHeader className="px-0" />

      {cart.products.length > 0 ? (
        <div className="flex gap-6 items-start mt-6">
          <div className="border rounded-md border-neutral-200 p-4 flex flex-col gap-6 flex-1">
            <div className="flex items-start gap-4 justify-between w-full">
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">Your cart</p>
                <p className="text-neutral-500 text-sm">
                  {cartItemsCount} Products
                </p>
              </div>

              <Button
                variant={"outline"}
                className="flex items-center gap-2"
                onClick={() => clearCart()}
              >
                <Trash size={20} />
                <p>Clear cart</p>
              </Button>
            </div>

            <div className="flex flex-col gap-4 divide-y divide-neutral-200">
              {cart.products.map((productCart) => (
                <CartProductRow
                  key={productCart.id}
                  productCart={productCart}
                />
              ))}
            </div>
          </div>

          <div className="p-4 rounded-md border border-neutral-200 flex flex-col gap-4 w-1/4">
            <div className="flex items-center justify-between gap-4">
              <p>Total price</p>

              <p>${cartTotalAmount}</p>
            </div>

            <Button>Pay & Checkout</Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-center p-6 flex-col gap-2 border rounded-md mt-8">
          <EmptyCartIcon />

          <p className="text-lg mt-4">Your cart is empty</p>
          <Link
            className="text-sky-600 text-sm hover:underline"
            to={AppRoutes.MainPage + "#products"}
          >
            Explore our products
          </Link>
        </div>
      )}
    </div>
  );
}
