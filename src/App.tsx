import Providers from "./components/providers";
import { AppRoutes } from "./libs/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/product/product-details";
import MainPage from "./pages/main-page/main-page";
import Footer from "./components/layout/footer";

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
          </Routes>
          <Footer/>
        </div>
      </Router>
    </Providers>
  );
}

export default App;
