import Providers from "./components/providers";
import { AppRoutes } from "./libs/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/product/product-details";
import MainPage from "./pages/main-page/main-page";
import Footer from "./components/layout/footer";
import NotFoundPage from "./pages/not-found/not-found";
import Cart from "./pages/cart/cart";
import CreateCustomProduct from "./pages/custom-product/create/create-custom-product";
import CustomProducts from "./pages/custom-product/custom-products";
import CustomProductDetails from "./pages/custom-product/details/custom-product-details";
import EditCustomProduct from "./pages/custom-product/edit/edit-custom-product";

function App() {
  return (
    <Providers>
      <Router>
        <div className="flex flex-col h-full">
          <Routes>
            <Route
              path={AppRoutes.MainPage}
              caseSensitive={true}
              element={<MainPage />}
            ></Route>
            <Route
              path={AppRoutes.Product + "/:id"}
              element={<ProductDetails />}
            ></Route>
            <Route path={AppRoutes.Cart} element={<Cart />}></Route>
            <Route
              path={AppRoutes.CustomProduct}
              element={<CustomProducts />}
            ></Route>
            <Route
              path={AppRoutes.CustomProduct + "/:id"}
              element={<CustomProductDetails />}
            ></Route>
            <Route
              path={AppRoutes.CreateCustomProduct}
              element={<CreateCustomProduct />}
            ></Route>
            <Route
              path={AppRoutes.EditCustomProduct + "/:id"}
              element={<EditCustomProduct />}
            ></Route>
            <Route path={"*"} element={<NotFoundPage />}></Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </Providers>
  );
}

export default App;
