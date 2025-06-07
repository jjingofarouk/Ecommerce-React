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
            <div key={index} className="col