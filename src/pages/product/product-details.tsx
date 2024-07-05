import { useParams } from "react-router-dom";
import MainHeader from "../../components/layout/main-header";
import { productHooks } from "../../libs/endpoints/products/products-endpoints";
import PageLoader from "../../components/common/page-loader";
import NotFoundCard from "../../components/common/not-found-card";
import { ShoppingBag, Star, User } from "@phosphor-icons/react";
import { Button } from "../../components/ui/button";

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

              <Button className="flex items-center gap-2 w-fit min-w-[15rem] mt-6">
                <ShoppingBag width={24} height={24} weight="duotone" />
                <p className="font-semibold capitalize">Add to cart</p>
              </Button>
            </div>
          </div>
        ) : (
          <NotFoundCard />
        )}
      </PageLoader>
    </div>
  );
}
