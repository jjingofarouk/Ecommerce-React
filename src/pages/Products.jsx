import React from "react";
import { Footer, Navbar, Products as ProductsList } from "../components";

const Products = () => {
  return (
    <>
      <Navbar />
      <ProductsList /> {/* Use the product list component */}
      <Footer />
    </>
  );
};

export default Products;