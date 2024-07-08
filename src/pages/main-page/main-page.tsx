import Footer from "../../components/layout/footer";
import Hero from "../../components/main-page/hero";
import Products from "../../components/main-page/products";
import { productHooks } from "../../libs/endpoints/products/products-endpoints";

export default function MainPage() {
  const { data, isLoading } = productHooks.useQueryProducts();

  return (
    <div className="flex flex-col gap-4">
      <Hero />

      <Products
        title={"Explore our products"}
        productsList={data || []}
        isLoading={isLoading}
      />
    </div>
  );
}
