import { productHooks } from "../../libs/endpoints/products/products-endpoints";
import ProductCard from "./product-card";

export default function Products(){

  const {data} = productHooks.useQueryProducts();

  const productsList = data || [];
  

  return(
    <div className="container w-full flex flex-col gap-8 mt-10">
      <p className="text-3xl/7 self-center capitalize font-bold">Explore our products</p>

      <div className="grid grid-cols-5 gap-x-8 gap-y-12 items-stretch">
        {productsList.map((product) => (<ProductCard key={product.id} product={product}/>) )}
      </div>

    </div>
  )
}

