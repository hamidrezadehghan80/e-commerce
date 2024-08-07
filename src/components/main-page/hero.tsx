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
          <h2 className="uppercase font-bold md:text-6xl text-3xl">Unleash your style</h2>

          <h3 className="uppercase font-normal md:text-6xl text-3xl">Elevate your look</h3>

          <Link to={AppRoutes.MainPage + "#products"} className="no-underline hover:underline md:text-xl text-base">
            Discover More
          </Link>
        </div>
      </div>
    </div>
  );
}
