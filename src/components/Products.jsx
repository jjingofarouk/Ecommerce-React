import React, { useState, useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion"; // For animations
import { addCart } from "../redux/action";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer"; // For lazy loading animations

// Lazy-loaded components
const ProductCard = lazy(() => import("./ProductCard"));
const FilterButtons = lazy(() => import("./FilterButtons"));
const Pagination = lazy(() => import("./Pagination"));
const LoadingSkeleton = lazy(() => import("./LoadingSkeleton"));
const ProductGrid = lazy(() => import("./ProductGrid"));

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isStickyFilter, setIsStickyFilter] = useState(false); // For sticky filter
  const productsPerPage = 8;
  const dispatch = useDispatch();

  // Intersection Observer for sticky filter
  const { ref: filterRef, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    setIsStickyFilter(!inView);
  }, [inView]);

  // Fetch products with error handling
  useEffect(() => {
    let isMounted = true;
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/products.json", {
          headers: { "Cache-Control": "no-cache" }, // Fresh data
        });
        if (!response.ok) throw new Error("Failed to fetch products");
        const products = await response.json();
        if (isMounted) {
          setData(products.products);
          setFilter(products.products);
        }
      } catch (error) {
        toast.error("Error loading products");
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
      return () => {
        isMounted = false;
      };
    };
    getProducts();
  }, []);

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("Added to Cart", { position: "top-right" });
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category.includes(cat));
    setFilter(updatedList);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filter.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filter.length / productsPerPage);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const ShowProducts = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div ref={filterRef}>
        <motion.div
          className={`filter-container ${isStickyFilter ? "sticky-top shadow-sm" : ""}`}
          animate={{ y: isStickyFilter ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={<div>Loading filters...</div>}>
            <FilterButtons
              onFilter={filterProduct}
              resetFilter={() => {
                setFilter(data);
                setCurrentPage(1);
              }}
            />
          </Suspense>
        </motion.div>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <ProductGrid>
          <AnimatePresence>
            {currentProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants} layout>
                <ProductCard product={product} onAddToCart={addProduct} />
              </motion.div>
            ))}
          </AnimatePresence>
        </ProductGrid>
      </Suspense>

      <Suspense fallback={<div>Loading pagination...</div>}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Suspense>
    </motion.div>
  );

  return (
    <section className="products-section container my-5 py-5 position-relative">
      <motion.h2
        className="display-4 text-center fw-light text-uppercase mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Latest Footwear
      </motion.h2>
      <hr className="w-25 mx-auto mb-5" style={{ borderColor: "#ddd" }} />
      {loading ? (
        <Suspense fallback={<div>Loading...</div>}>
          <LoadingSkeleton />
        </Suspense>
      ) : (
        <ShowProducts />
      )}
      {/* Floating decorative element */}
      <motion.div
        className="position-absolute top-0 end-0 text-muted opacity-25"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 0.25 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Zano
      </motion.div>
    </section>
  );
};

export default Products;