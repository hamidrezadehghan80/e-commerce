import MainHeader from "../layout/main-header";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../libs/routes";

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
        <MainHeader />
        <div className="flex flex-col gap-4 absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="uppercase font-bold text-6xl">Fresh Fashion Finds</h2>

          <h3 className="uppercase font-normal text-6xl">New collection</h3>

          <Link to={AppRoutes.MainPage + "#products"} className="no-underline hover:underline text-xl">
            Discover More
          </Link>
        </div>
      </div>
    </div>
  );
}
