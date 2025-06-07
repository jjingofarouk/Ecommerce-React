import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./AuthContext";
import {
  Home,
  Product,
  ProductsPage,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
} from "./pages";
import Navbar from "./components/Navbar"; // Import your Navbar component
import Footer from "./components/Footer"; // Import your Footer component
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar /> {/* Navbar placed here to appear on all pages */}
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/product/*" element={<PageNotFound />} />
            </Routes>
          </ScrollToTop>
          <Footer /> {/* Footer placed here to appear on all pages */}
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
};

export default App;