import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
      <div className="card text-center h-100">
        <img
          className="card-img-top p-3"
          src={product.imageUrl} // Use imageUrl directly
          alt={product.name}
          style={{
            objectFit: "contain", // Maintains aspect ratio
            maxHeight: "300px", // Limits height
            width: "100%", // Fits card width
          }}
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
          <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
            Buy Now
          </Link>
          <button
            className="btn btn-dark m-1"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
