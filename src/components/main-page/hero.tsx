import { ShoppingBagOpen } from "@phosphor-icons/react";

export default function Hero() {
  return (
    <div
      className="flex flex-col w-full h-screen gap-8 bg-cover"
      style={{
        backgroundImage:
          "url(" + require("../../assets/image/bg-hero.jpg") + ")",
      }}
    >
      <div className="container flex flex-col gap-4 w-full h-full relative">
        <div className="flex items-center justify-between py-6  px-12">
          <div className="flex items-center gap-1">
            <img
              alt="E-Commerce"
              src="/image/logo.png"
              width={32}
              height={32}
            />
            <h1 className="text-xl font-semibold">B Commerce</h1>
          </div>

          <button>
            <ShoppingBagOpen width={32} height={32} />
          </button>
        </div>

        <div className="flex flex-col gap-4 absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="uppercase font-bold text-6xl">Fresh Fashion Finds</h2>

          <h3 className="uppercase font-normal text-6xl">
            New collection
          </h3>

          <a href="#products" className="no-underline hover:underline text-xl">
            Discover More
          </a>
        </div>
      </div>
    </div>
  );
}
