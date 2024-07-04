import ProductCard from "./product-card";

export default function Products(){
  return(
    <div className="container w-full flex flex-col gap-8 mt-10">
      <p className="text-3xl/7 self-center capitalize font-bold">Explore our products</p>

      <div className="grid grid-cols-5 gap-8">
        {[...Array.from({ length: 16 }, (_, index) => index)].map((value) => (<ProductCard key={value}/>) )}
      </div>

    </div>
  )
}

