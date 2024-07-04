import { ShoppingCart, Star } from "@phosphor-icons/react";
import { IProduct } from "../../libs/endpoints/products/products-schemas";
// import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../libs/routes";

export default function ProductCard({ product }: { product: IProduct }) {
  const starCount = Math.floor(product.rating.rate);

  // const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="w-full p-12 flex items-center justify-center shadow h-80 border rounded-md border-neutral-200 relative group/item">
        <img alt="" src={product.image} className="w-full h-auto" />
        <button
          // onClick={() => navigate(AppRoutes.Product + "/" + product.id)}
          className="opacity-0 absolute bottom-2 start-2  p-1 aspect-square -translate-x-14 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all "
        >
          <ShoppingCart weight="duotone" className="size-7" />
        </button>
      </div>

      <div className="flex flex-col items-start gap-1 flex-1">
        <p className="text-neutral-500 capitalize no-underline hover:underline">
          {product.category}
        </p>
        <a
          href={AppRoutes.Product + "/" + product.id}
          className="font-semibold"
        >
          {product.title}
        </a>
        <p className="mt-auto text-xl font-bold">${product.price}</p>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array.from({ length: starCount }, (_, index) => index)].map(
              (index) => (
                <Star
                  key={index}
                  weight="fill"
                  className="size-3.5 fill-yellow-600"
                />
              )
            )}

            {[
              ...Array.from({ length: 5 - starCount }, (_, index) => index),
            ].map((index) => (
              <Star key={index} className="size-3.5" />
            ))}
          </div>

          <p className="text-sm text-neutral-500 font-semibold">{product.rating.rate}</p>
        </div>
      </div>
    </div>
  );
}
