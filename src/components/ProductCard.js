// src/components/ProductCard.js
import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductCard = memo(({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const buttonVariants = {
    hover: { scale: 1.1, backgroundColor: "#ffffff", color: "#000000" },
    tap: { scale: 0.9 },
  };

  return (
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} perspective={1000}>
      <motion.div
        className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="card h-100 text-center shadow-sm modern-card">
          <LazyLoadImage
            src={product.imageUrl}
            alt={product.name}
            effect="blur"
            className="card-img-top p-3"
            style={{
              objectFit: "contain",
              maxHeight: "300px",
              width: "100%",
              transition: "transform 0.5s ease",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
          />
          <motion.div
            className="card-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.9 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="quick-view">Quick View</span>
          </motion.div>
          <div className="card-body">
            <h5 className="card-title fw-light text-uppercase">
              {product.name.length > 12
                ? `${product.name.substring(0, 12)}...`
                : product.name}
            </h5>
            <p className="card-text text-muted">
              {product.description.length > 90
                ? `${product.description.substring(0, 90)}...`
                : product.description}
            </p>
            <p className="text-muted small">
              {product.stockStatus === "in-stock" ? "In Stock" : "Low Stock"}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item lead fw-bold">
              {product.price.toLocaleString()} {product.currency}
            </li>
          </ul>
          <div className="card-body d-flex justify-content-center gap-2">
            <Link to={`/product/${product.id}`} className="modern-btn">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="btn btn-outline-dark m-1"
              >
                Buy Now
              </motion.button>
            </Link>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="btn btn-dark m-1"
              onClick={() => onAddToCart(product)}
              disabled={product.stockStatus === "out-of-stock"}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;