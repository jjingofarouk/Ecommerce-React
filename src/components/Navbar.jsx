import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSignInAlt, FaUserPlus, FaShoppingCart, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const cart = useSelector((state) => state.handleCart);
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
  const [searchQuery, setSearchQuery] = useState(''); // For search functionality

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${searchQuery}`; // Redirect to products with query
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-top shadow-lg">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Brand Logo */}
        <NavLink className="navbar-brand fw-bold fs-3" to="/">
          <span className="text-gold">Frank</span> Shoe World
        </NavLink>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navbar Content */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
          {/* Navigation Links */}
          <ul className="navbar-nav mx-auto my-2 text-center align-items-lg-center">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link px-3 ${isActive ? 'active-link' : ''}`}
                to="/"
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link px-3 ${isActive ? 'active-link' : ''}`}
                to="/products"
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link px-3 ${isActive ? 'active-link' : ''}`}
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link px-3 ${isActive ? 'active-link' : ''}`}
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Right Section: Search, Auth, Cart */}
          <div className="d-flex flex-column flex-lg-row align-items-center gap-3 text-center">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="d-flex align-items-center">
              <input
                type="text"
                className="form-control rounded-0 border-0 search-input"
                placeholder="Search shoes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-gold ms-2">
                <FaSearch />
              </button>
            </form>

            {/* Auth & Cart Buttons */}
            <div className="buttons d-flex gap-2">
              <NavLink to="/login" className="btn btn-outline-light rounded-0 px-3">
                <FaSignInAlt className="me-1" /> Login
              </NavLink>
              <NavLink to="/register" className="btn btn-outline-light rounded-0 px-3">
                <FaUserPlus className="me-1" /> Register
              </NavLink>
              <NavLink to="/cart" className="btn btn-gold rounded-0 px-3 position-relative">
                <FaShoppingCart className="me-1" /> Cart
                {cart.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        .navbar {
          transition: background-color 0.3s ease;
          z-index: 1000;
        }
        .navbar-brand {
          font-family: 'Inter', sans-serif;
          letter-spacing: 1px;
        }
        .text-gold {
          color: #d4af37; /* Gold accent for brand name */
        }
        .nav-link {
          color: #fff !important;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: #d4af37 !important;
        }
        .active-link {
          color: #d4af37 !important;
          border-bottom: 2px solid #d4af37;
        }
        .btn-gold {
          background-color: #d4af37;
          color: #fff;
          border: none;
          transition: transform 0.2s ease;
        }
        .btn-gold:hover {
          transform: scale(1.05);
          color: #fff;
        }
        .search-input {
          background-color: #333;
          color: #fff;
          max-width: 200px;
        }
        .search-input::placeholder {
          color: #aaa;
        }
        .badge {
          font-size: 0.7rem;
        }
        @media (max-width: 991px) {
          .navbar-collapse {
            background-color: #212529;
            padding: 1rem;
            border-radius: 0 0 8px 8px;
          }
          .nav-link {
            padding: 0.75rem 0 !important;
          }
          .buttons {
            flex-direction: column;
            gap: 1rem;
            width: 100%;
          }
          .search-input {
            max-width: 100%;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;