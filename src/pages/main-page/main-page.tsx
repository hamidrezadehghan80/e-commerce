import Footer from "../../components/layout/footer";
import Hero from "../../components/main-page/hero";
import Products from "../../components/main-page/products";

export default function MainPage() {
  return (
    <div className="flex flex-col gap-4">
      <Hero />

      <Products/>

      <Footer/>
    </div>
  );
}
