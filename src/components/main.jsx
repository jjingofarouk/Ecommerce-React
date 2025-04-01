import React from "react";
import { motion } from "framer-motion"; // For smooth animations

const Home = () => {
  // Animation variants for elegant transitions
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const overlayFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, delay: 0.3 } },
  };

  return (
    <div className="hero position-relative overflow-hidden">
      <motion.div
        className="card bg-dark text-white border-0 mx-0"
        initial="hidden"
        animate="visible"
        variants={overlayFade}
      >
        {/* Parallax-style image with subtle animation */}
        <motion.img
          className="card-img img-fluid"
          src="./assets/main.png.jpg"
          alt="Zano New Collection"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 5, ease: "easeOut" }}
          style={{ height: "100vh", objectFit: "cover" }}
        />
        
        {/* Overlay with gradient for sophistication */}
        <div 
          className="card-img-overlay" 
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
          }}
        >
          <div className="container h-100 d-flex align-items-center justify-content-center">
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h1 className="display-3 fw-light text-uppercase tracking-wide">
                Zano New Arrivals
              </h1>
              <p className="lead fs-4 fw-light d-none d-sm-block mt-3">
                Discover the essence of elegance in our latest collection.
              </p>
              <motion.button
                className="btn btn-outline-light btn-lg mt-4"
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                Shop Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Optional decorative element */}
      <motion.div
        className="position-absolute bottom-0 w-100 text-center pb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-white fw-light">Crafted for the Modern Soul</span>
      </motion.div>
    </div>
  );
};

export default Home;