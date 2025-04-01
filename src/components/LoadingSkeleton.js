import React from "react";
import { motion } from "framer-motion";

const PulsingSkeleton = ({ count = 6 }) => {
  const pulseVariants = {
    animate: {
      opacity: [0.4, 1, 0.4],
      scale: [1, 1.02, 1],
      transition: { repeat: Infinity, duration: 1.5 },
    },
  };

  const skeletonCard = (
    <motion.div
      variants={pulseVariants}
      animate="animate"
      style={{
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        height: "592px",
        width: "100%",
      }}
    />
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 py-5 text-center">
          <motion.div
            variants={pulseVariants}
            animate="animate"
            style={{
              backgroundColor: "#e0e0e0",
              borderRadius: "5px",
              height: "40px",
              width: "560px",
            }}
          />
        </div>
        {[...Array(count)].map((_, index) => (
          <div key={index} className="col-md-4 col-sm- Englishman col-xs-8 col-12 mb-4">
            {skeletonCard}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PulsingSkeleton;