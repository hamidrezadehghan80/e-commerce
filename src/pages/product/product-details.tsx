import { useParams } from "react-router-dom";
import MainHeader from "../../components/layout/main-header";
import { productHooks } from "../../libs/endpoints/products/products-endpoints";
import PageLoader from "../../components/common/page-loader";
import NotFoundCard from "../../components/common/not-found-card";
import {
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Trash,
  User,
} from "@phosphor-icons/react";
import { Button } from "../../components/ui/button";
import Select from "../../components/ui/select";
import { useContext, useState } from "react";
import Modal from "../../components/ui/modal";
import CartContext from "../../libs/contexts/cart/cart-context";

export default function ProductDetails() {
  const { id = "" } = useParams();

  const { data: product, isLoading } = productHooks.useQueryProductById(
    {
      params: {
        id,
      },
    },
    {
      enabled: !!id,
    }
  );

  const starCount = Math.floor(product?.rating.rate || 0);

  const cartContext = useContext(CartContext);
  if (!cartContext)
    throw new Error("CartContext must be used within CartProvider");

  const { state: cart, addProduct, removeProduct, editProduct } = cartContext;

  const foundedProduct = cart.products.find(
    (cartItem) => cartItem.product.id === product?.id
  );
  
  return (
    <div className="h-full container flex flex-col px-6">
      <MainHeader className="px-0" />
      <PageLoader isLoading={isLoading}>
        {product ? (
          <div className="grid grid-cols-2 w-full items-center">
            <div className="w-full px-36 py-12 flex items-center justify-center h-full">
              <img
                alt=""
                src={product.image}
                className="max-w-72 h-auto scale-100 hover:scale-110 transition-all"
              />
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold">{product.title}</h1>
                <div className="flex flex-col gap-1">
                  <div className="flex items-end gap-2">
                    <div className="flex items-center gap-0.5">
                      {[
                        ...Array.from(
                          { length: starCount },
                          (_, index) => index
                        ),
                      ].map((index) => (
                        <Star
                          key={index}
                          weight="fill"
                          className="size-4 fill-yellow-600"
                        />
                      ))}

                      {[
                        ...Array.from(
                          { length: 5 - starCount },
                          (_, index) => index
                        ),
                      ].map((index) => (
                        <Star key={index} className="size-4" />
                      ))}
                    </div>

                    <p>({product.rating.rate})</p>
                  </div>
                  <p className="text-sm text-neutral-500">{`${product.rating.count} user reviews`}</p>
                </div>
              </div>

              <p className="text-4xl text-sky-700 font-semibold">
                ${product.price}
              </p>

              <p className="text-neutral-500">{product.description}</p>

              {foundedProduct ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-1 text-sm">
                    <p>In your cart</p>
                    <a className="text-sky-600 hover:underline" href={"/cart"}>
                      Cart
                    </a>
                  </div>
                  <div className="shadow p-3 rounded-md flex items-center justify-between gap-4 text-sm font-semibold text-sky-600">
                    <button
                      onClick={() =>
                        foundedProduct.orderNum === 1
                          ? removeProduct(product.id)
                          : editProduct(product.id, foundedProduct.orderNum - 1)
                      }
                    >
                      {foundedProduct.orderNum === 1 ? (
                        <Trash size={20} className="fill-sky-600" />
                      ) : (
                        <Minus size={20} className="fill-sky-600" />
                      )}
                    </button>

                    <p>{foundedProduct.orderNum}</p>
                    <button
                      onClick={() =>
                        editProduct(product.id, foundedProduct.orderNum + 1)
                      }
                    >
                      <Plus size={20} className="fill-sky-600" />
                    </button>
                  </div>
        
                </div>
              ) : (
                <Button
                  className="flex items-center gap-2 w-fit min-w-[15rem] mt-6"
                  onClick={() => addProduct(product)}
                >
                  <ShoppingBag width={24} height={24} weight="duotone" />
                  <p className="font-semibold capitalize">Add to cart</p>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <NotFoundCard />
        )}
      </PageLoader>
    </div>
  );
}
