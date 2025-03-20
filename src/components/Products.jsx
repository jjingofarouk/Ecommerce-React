import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";
import FilterButtons from "./FilterButtons";
import Pagination from "./Pagination";
import LoadingSkeleton from "./LoadingSkeleton";
import ProductGrid from "./ProductGrid";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("Added to cart");
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("/products.json");
      if (componentMounted) {
        const products = await response.json();
        setData(products.products);
        setFilter(products.products);
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category.includes(cat));
    setFilter(updatedList);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filter.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filter.length / productsPerPage);

  const ShowProducts = () => (
    <>
      <FilterButtons
        onFilter={filterProduct}
        resetFilter={() => {
          setFilter(data);
          setCurrentPage(1);
        }}
      />
      <ProductGrid>
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addProduct} />
        ))}
      </ProductGrid>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Latest Footwear</h2>
          <hr />
        </div>
      </div>
      {loading ? <LoadingSkeleton /> : <ShowProducts />}
    </div>
  );
};

export default Products;