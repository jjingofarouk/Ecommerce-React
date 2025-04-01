import React, { useState, useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";

// Lazy-loaded components
const ProductCard = lazy(() => import("./ProductCard"));
const FilterButtons = lazy(() => import("./FilterButtons"));
const LoadingSkeleton = lazy(() => import("./LoadingSkeleton"));
const ProductGrid = lazy(() => import("./ProductGrid"));

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search functionality
  const [sortOption, setSortOption] = useState("default"); // Dynamic sorting
  const [visibleProducts, setVisibleProducts] = useState(8); // Infinite scroll
  const [isStickyFilter, setIsStickyFilter] = useState(false);
  const dispatch = useDispatch();

  // Intersection Observer for sticky filter and infinite scroll
  const { ref: filterRef, inView: filterInView } = useInView({ threshold: 0 });
  const { ref: loadMoreRef, inView: loadMoreInView } = useInView({ threshold: 0.5 });

  useEffect(() => setIsStickyFilter(!filterInView), [filterInView]);

  // Fetch products with PWA offline support
  useEffect(() => {
    let isMounted = true;
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/products.json", {
          headers: { "Cache-Control": "no-cache" },
        });
        if (!response.ok) throw new Error("Failed to fetch products");
        const products = await response.json();
        if (isMounted) {
          setData(products.products);
          setFilter(products.products);
        }
      } catch (error) {
        toast.error("Error loading products. Using cached data if available.");
        if (navigator.serviceWorker && caches) {
          const cachedResponse = await caches.match("/products.json");
          if (cachedResponse) {
            const cachedProducts = await cachedResponse.json();
            setData(cachedProducts.products);
            setFilter(cachedProducts.products);
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    getProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Infinite scroll logic
  useEffect(() => {
    if (loadMoreInView && visibleProducts < filter.length) {
      setVisibleProducts((prev) => prev + 8);
    }
  }, [loadMoreInView, filter.length]);

  // Search and filter logic
  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category.includes(cat));
    setFilter(updatedList);
    setVisibleProducts(8);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const searchedList = data.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
    setFilter(searchedList);
    setVisibleProducts(8);
  };

  // Sorting logic
  const sortProducts = (products) => {
    switch (sortOption) {
      case "price-asc":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...products].sort((a, b) => b.price - a.price);
      case "popularity":
        return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "newest":
        return [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
      default:
        return products;
    }
  };

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("Added to Cart", { position: "top-right" });
  };

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

  const currentProducts = sortProducts(filter).slice(0, visibleProducts);

  const ShowProducts = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control w-50 mx-auto shadow-sm"
          placeholder="Search footwear..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Filter and Sort */}
      <div ref={filterRef}>
        <motion.div
          className={`filter-container ${isStickyFilter ? "sticky-top shadow-sm" : ""}`}
          animate={{ y: isStickyFilter ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <Suspense fallback={<div>Loading filters...</div>}>
              <FilterButtons
                onFilter={filterProduct}
                resetFilter={() => {
                  setFilter(data);
                  setVisibleProducts(8);
                  setSearchQuery("");
                }}
              />
            </Suspense>
            <select
              className="form-select w-auto shadow-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Sort By: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popularity">Popularity</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </motion.div>
      </div>

      {/* Product Grid */}
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

      {/* Infinite Scroll Trigger */}
      {visibleProducts < filter.length && (
        <div ref={loadMoreRef} className="text-center my-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading more...
          </motion.div>
        </div>
      )}
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