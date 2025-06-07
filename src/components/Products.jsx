// src/components/Products.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("✨ Added to your collection", {
      style: {
        background: '#000',
        color: '#fff',
        fontWeight: '500'
      }
    });
  };

  const categories = [
    { id: "all", label: "All Collections", icon: "👟" },
    { id: "sneakers", label: "Sneakers", icon: "⚡" },
    { id: "casual", label: "Casual", icon: "☀️" },
    { id: "formal", label: "Formal", icon: "🖤" },
    { id: "children", label: "Kids", icon: "🌈" }
  ];

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (componentMounted) {
          setData(products);
          setFilter(products);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <div className="loading-container" style={{ minHeight: '60vh' }}>
        <div className="text-center mb-5">
          <div 
            className="loading-pulse"
            style={{
              width: '400px',
              height: '60px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              margin: '0 auto',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          />
        </div>
        <div className="row g-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div 
                className="skeleton-card"
                style={{
                  height: '480px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '16px',
                  animation: `pulse 1.5s ease-in-out infinite ${index * 0.1}s`
                }}
              />
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>
      </div>
    );
  };

  const filterProduct = (cat) => {
    setActiveCategory(cat);
    if (cat === "all") {
      setFilter(data);
    } else {
      const updatedList = data.filter((item) => item.category.includes(cat));
      setFilter(updatedList);
    }
  };

  const ShowProducts = () => {
    return (
      <>
        {/* Hero Section */}
        <div className="hero-section text-center mb-5">
          <h1 
            className="display-3 fw-bold mb-3"
            style={{
              letterSpacing: '-0.02em',
              color: '#1a1a1a'
            }}
          >
            Step Into Style
          </h1>
          <p 
            className="lead text-muted mb-5"
            style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}
          >
            Discover our curated collection of premium footwear, 
            where comfort meets sophistication
          </p>
        </div>

        {/* Category Filter */}
        <div 
          className="category-filter d-flex justify-content-center flex-wrap gap-3 mb-5"
          style={{ padding: '0 20px' }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => filterProduct(category.id)}
              style={{
                padding: '12px 24px',
                border: activeCategory === category.id ? '2px solid #000' : '2px solid #e9ecef',
                backgroundColor: activeCategory === category.id ? '#000' : '#fff',
                color: activeCategory === category.id ? '#fff' : '#6c757d',
                borderRadius: '50px',
                fontSize: '0.95rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minWidth: '120px',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  e.target.style.borderColor = '#000';
                  e.target.style.color = '#000';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.color = '#6c757d';
                }
              }}
            >
              <span style={{ fontSize: '1.1em' }}>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {filter.map((product, index) => (
            <div
              key={product.id}
              className="col-lg-4 col-md-6"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div
                className="product-card h-100"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: hoveredProduct === product.id ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredProduct === product.id 
                    ? '0 20px 40px rgba(0,0,0,0.15)' 
                    : '0 4px 20px rgba(0,0,0,0.08)',
                  cursor: 'pointer'
                }}
              >
                {/* Product Image */}
                <div 
                  className="image-container position-relative"
                  style={{
                    height: '280px',
                    overflow: 'hidden',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: hoveredProduct === product.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                  
                  {/* Stock Status Badge */}
                  <div
                    className="position-absolute top-0 end-0 m-3"
                    style={{
                      padding: '6px 12px',
                      backgroundColor: product.stockStatus === "in-stock" ? '#000' : '#ff6b6b',
                      color: '#fff',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}
                  >
                    {product.stockStatus === "in-stock" ? "In Stock" : "Low Stock"}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 
                    className="product-title mb-2"
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      color: '#1a1a1a',
                      lineHeight: '1.3',
                      minHeight: '52px'
                    }}
                  >
                    {product.name}
                  </h3>
                  
                  <p 
                    className="text-muted mb-3"
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      minHeight: '60px'
                    }}
                  >
                    {product.description.length > 85 
                      ? `${product.description.substring(0, 85)}...`
                      : product.description
                    }
                  </p>

                  {/* Price */}
                  <div 
                    className="price mb-4"
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: '700',
                      color: '#000'
                    }}
                  >
                    {product.price.toLocaleString()} {product.currency}
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex gap-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="btn flex-fill"
                      style={{
                        backgroundColor: '#000',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '12px 20px',
                        fontWeight: '500',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#333';
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#000';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      View Details
                    </Link>
                    
                    <button
                      className="btn"
                      onClick={() => addProduct(product)}
                      disabled={product.stockStatus === "out-of-stock"}
                      style={{
                        backgroundColor: product.stockStatus === "out-of-stock" ? '#e9ecef' : '#fff',
                        color: product.stockStatus === "out-of-stock" ? '#6c757d' : '#000',
                        border: '2px solid #000',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        fontWeight: '500',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        minWidth: '50px'
                      }}
                      onMouseEnter={(e) => {
                        if (product.stockStatus !== "out-of-stock") {
                          e.target.style.backgroundColor = '#000';
                          e.target.style.color = '#fff';
                          e.target.style.transform = 'translateY(-1px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (product.stockStatus !== "out-of-stock") {
                          e.target.style.backgroundColor = '#fff';
                          e.target.style.color = '#000';
                          e.target.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      🛒
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </>
    );
  };

  return (
    <div 
      className="container-fluid"
      style={{
        padding: '80px 40px',
        backgroundColor: '#fafafa',
        minHeight: '100vh'
      }}
    >
      <div className="container">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;