import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css"; // Assuming you’re using the CSS approach

const ProductCard = ({ product, onAddToCart }) => {
  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event from bubbling up to the Link
    onAddToCart(product); // Trigger Add to Cart action
  };

  return (
    <Link to={`/product/${product.id}`} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
      <div className="card text-center h-100 product-card">
        <img
          className="card-img-top p-3 product-card-img"
          src={product.imageUrl}
          alt={product.name}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name.substring(0, 12)}...</h5>
          <p className="card-text">{product.description.substring(0, 90)}...</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item lead">
            {product.price.toLocaleString()} {product.currency}
          </li>
        </ul>
        <div className="card-body">
          <button className="btn btn-dark m-1" onClick={handleButtonClick}>
            Add to Cart
          </button>
          {/* Optional: Keep Buy Now if you want a distinct action */}
          <Link
            to={`/product/${product.id}`}
            className="btn btn-dark m-1"
            onClick={(e) => e.stopPropagation()} // Prevent double navigation
          >
            Buy Now
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;