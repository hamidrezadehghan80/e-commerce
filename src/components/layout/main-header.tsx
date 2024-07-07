import { ShoppingBagOpen } from "@phosphor-icons/react";
import { cn } from "../../libs/utils";
import { useContext } from "react";
import CartContext from "../../libs/contexts/cart/cart-context";

export default function MainHeader({ className }: { className?: string }) {
  const cartContext = useContext(CartContext);
  if (!cartContext)
    throw new Error("CartContext must be used within CartProvider");

  const { state: cart } = cartContext;

  const cartItemsCount = cart.products.reduce(
    (acc, cartItem) => acc + cartItem.orderNum,
    0
  );

  return (
    <div
      className={cn("flex items-center justify-between py-6 px-12", className)}
    >
      <div className="flex items-center gap-1">
        <img alt="E-Commerce" src="/image/logo.png" width={32} height={32} />
        <h1 className="text-xl font-semibold">B Commerce</h1>
      </div>

      <button className="relative">
        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -end-1 text-2xs bg-red-600 text-white rounded-full flex items-center justify-center size-4">
            {cartItemsCount}
          </span>
        )}
        <ShoppingBagOpen width={32} height={32} />
      </button>
    </div>
  );
}
