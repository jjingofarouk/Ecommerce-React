// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Hero section carousel images
  const heroImages = [
    {
      url: "https://raw.githubusercontent.com/jjingofarouk/Ecommerce-React/main/assets/images/shoes/canvas.jpg",
      title: "Urban Canvas Sneakers",
      subtitle: "Step into Street Style",
    },
    {
      url: "https://raw.githubusercontent.com/jjingofarouk/Ecommerce-React/main/assets/images/shoes/casualloafers.jpg",
      title: "Elegant Casual Loafers",
      subtitle: "Timeless Comfort",
    },
    {
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1920&q=80",
      title: "Bold New Arrivals",
      subtitle: "Make a Statement",
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const slideTransition = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Fetch featured products from Firestore
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          orderBy("popularityScore", "desc"),
          limit(4)
        );
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeaturedProducts(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setLoading(false);
      }
    };

    fetchFeaturedProducts();

    // Auto-rotate carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home">
      {/* Hero Section with Carousel */}
      <div className="hero position-relative overflow-hidden" style={{ height: "100vh" }}>
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            className="card bg-dark text-white border-0 mx-0"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideTransition}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          >
            <motion.img
              src={heroImages[currentSlide].url}
              alt={heroImages[currentSlide].title}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "easeOut" }}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
                filter: "brightness(70%)",
              }}
            />
            <div
              className="card-img-overlay d-flex align-items-center"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
              }}
            >
              <div className="container text-center">
                <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                  <h1 className="display-2 fw-bold text-uppercase text-white mb-3" style={{ letterSpacing: "2px" }}>
                    {heroImages[currentSlide].title}
                  </h1>
                  <p className="lead fs-3 fw-light text-white mb-4 d-none d-sm-block">
                    {heroImages[currentSlide].subtitle}
                  </p>
                  <Link to="/products">
                    <motion.button
                      className="btn btn-primary btn-lg px-5 py-3"
                      whileHover={{ scale: 1.1, backgroundColor: "#ff6f61" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      style={{ borderRadius: "30px", fontWeight: "600" }}
                    >
                      Shop Now
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`btn rounded-circle ${index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"}`}
              style={{ width: "12px", height: "12px", padding: "0" }}
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container my-5 py-5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-center display-4 fw-bold mb-5" style={{ color: "#333" }}>
            Featured Footwear
          </h2>
          <div className="row">
            {loading ? (
              [...Array(4)].map((_, index) => (
                <div key={index} className="col-md-3 col-sm-6 mb-4">
                  <div className="card h-100">
                    <div style={{ height: "250px", background: "#eee" }} />
                    <div className="card-body">
                      <div style={{ height: "20px", background: "#eee", marginBottom: "10px" }} />
                      <div style={{ height: "20px", background: "#eee" }} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              featuredProducts.map((product) => (
                <div key={product.id} className="col-md-3 col-sm-6 mb-4">
                  <Link to={`/product/${product.id}`} className="text-decoration-none">
                    <motion.div
                      className="card h-100 border-0 shadow-sm"
                      whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <LazyLoadImage
                        src={product.imageUrl}
                        alt={product.name}
                        effect="blur"
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "250px",
                          padding: "20px",
                        }}
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title fw-bold" style={{ color: "#333" }}>
                          {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                        </h5>
                        <p className="text-muted">
                          {product.price.toLocaleString()} {product.currency}
                        </p>
                        <p className="text-muted small">
                          {product.stockStatus === "in-stock" ? "In Stock" : "Low Stock"}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-4">
            <Link to="/products">
              <motion.button
                className="btn btn-outline-dark btn-lg"
                whileHover={{ scale: 1.1, backgroundColor: "#333", color: "#fff" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                View All Products
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Call-to-Action Banner */}
      <div
        className="bg-primary text-white text-center py-5"
        style={{ background: "linear-gradient(135deg, #ff6f61, #de3c9f)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="display-5 fw-bold mb-3">Join the Style Revolution</h2>
          <p className="lead fs-4 mb-4">Get exclusive offers and updates!</p>
          <form className="d-flex justify-content-center gap-2" style={{ maxWidth: "500px", margin: "0 auto" }}>
            <input
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter your email"
              style={{ maxWidth: "300px" }}
            />
            <motion.button
              className="btn btn-light rounded-pill px-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;