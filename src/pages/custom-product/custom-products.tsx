import { useContext } from "react";
import Footer from "../../components/layout/footer";

import Products from "../../components/main-page/products";
import CustomProductContext from "../../libs/contexts/custom-products/custom-product-context";
import MainHeader from "../../components/layout/main-header";

export default function CustomProducts() {
  const customProductContext = useContext(CustomProductContext);
  if (!customProductContext)
    throw new Error(
      "CustomProductContext must be used within CustomProductProvider"
    );

  const { state } = customProductContext;
  

  return (
    <div className="flex flex-col gap-6 container">
      <MainHeader className="px-0"/>
      <Products
        productsList={state.products}
        isLoading={false}
        title="Explore your products"
      />
    </div>
  );
}
