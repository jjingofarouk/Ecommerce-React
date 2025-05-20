// src/components/Navbar.js
import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSignInAlt, FaUserPlus, FaShoppingCart, FaSearch, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const cart = useSelector((state) => state.handleCart.cart);
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${searchQuery}`;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Sign out failed');
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-top shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink className="navbar-brand fw-bold fs-3" to="/">
            <span className="text-gold">Zano</span> !
          </NavLink>
        </motion.div>

        <motion.button
          className="navbar-toggler border-0"
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="times"
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 90 }}
              >
                <FaTimes size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="bars"
                initial={{ rotate: 90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: -90 }}
              >
                <FaBars size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          <motion.div 
            className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ul className="navbar-nav mx-auto my-2 text-center align-items-lg-center">
              {['/', '/products', '/about', '/contact'].map((path, index) => (
                <motion.li 
                  key={path} 
                  className="nav-item"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    className={({ isActive }) => `nav-link px-3 ${isActive ? 'active-link' : ''}`}
                    to={path}
                    end={path === '/'}
                  >
                    {['Home', 'Products', 'About', 'Contact'][index]}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            <motion.div 
              className="d-flex flex-column flex-lg-row align-items-center gap-3"
              variants={itemVariants}
            >
              <form onSubmit={handleSearch} className="d-flex align-items-center">
                <motion.input
                  type="text"
                  className="form-control rounded-0 border-0 search-input"
                  placeholder="Search shoes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  whileFocus={{ scale: 1.02, borderColor: '#d4af37' }}
                />
                <motion.button 
                  type="submit" 
                  className="btn btn-gold ms-2"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaSearch />
                </motion.button>
              </form>

              <div className="buttons d-flex gap-2">
                {currentUser ? (
                  <>
                    <motion.div
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button 
                        className="btn btn-outline-light rounded-0 px-3"
                        onClick={handleSignOut}
                      >
                        <FaSignOutAlt className="me-1" /> Sign Out
                      </button>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <NavLink 
                        to="/cart" 
                        className="btn btn-gold rounded-0 px-3 position-relative"
                      >
                        <FaShoppingCart className="me-1" /> Cart
                        {cart.length > 0 && (
                          <motion.span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          >
                            {cart.length}
                          </motion.span>
                        )}
                      </NavLink>
                    </motion.div>
                  </>
                ) : (
                  <>
                    {[
                      { to: '/login', icon: FaSignInAlt, text: 'Login' },
                      { to: '/register', icon: FaUserPlus, text: 'Register' },
                      { to: '/cart', icon: FaShoppingCart, text: 'Cart', hasBadge: true }
                    ].map((btn) => (
                      <motion.div
                        key={btn.to}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <NavLink 
                          to={btn.to} 
                          className={`btn ${btn.hasBadge ? 'btn-gold' : 'btn-outline-light'} rounded-0 px-3 position-relative`}
                        >
                          <btn.icon className="me-1" /> {btn.text}
                          {btn.hasBadge && cart.length > 0 && (
                            <motion.span
                              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 500 }}
                            >
                              {cart.length}
                            </motion.span>
                          )}
                        </NavLink>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx>{`
        .navbar {
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }
        .navbar-brand {
          font-family: 'Inter', sans-serif;
          letter-spacing: 1px;
          background: linear-gradient(45deg, #d4af37, #fff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .nav-link {
          color: #fff !important;
          font-weight: 500;
          position: relative;
          overflow: hidden;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #d4af37;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .active-link::after {
          width: 100%;
        }
        .btn-gold {
          background: linear-gradient(45deg, #d4af37, #b8860b);
          color: #fff;
          border: none;
          box-shadow: 0 2px 5px rgba(212, 175, 55, 0.3);
        }
        .search-input {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          transition: all 0.3s ease;
        }
        .search-input:focus {
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        }
        @media (max-width: 991px) {
          .navbar-collapse.show {
            background: rgba(33, 37, 41, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 0 0 15px 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;