import React, { useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaSkype,
  FaArrowUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Added for animations

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000); // Reset after 3s
      setEmail("");
    }
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hover: { scale: 1.2, rotate: 10 },
    tap: { scale: 0.9 },
  };

  return (
    <motion.footer
      className="site-footer bg-dark text-white py-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="container">
        <div className="row g-4">
          {/* Brand Section */}
          <motion.div className="col-lg-4 col-md-6" variants={sectionVariants}>
            <motion.h4 className="mb-3" whileHover={{ scale: 1.05 }}>
              <a href="/" className="text-white text-decoration-none">
                <span className="fw-bold text-gold">ZANO!</span>
              </a>
            </motion.h4>
            <p className="text-muted small">
              Step into Style with premium footwear from Kampala's finest.
              Quality, comfort, and elegance in every stride.
            </p>
            <p className="text-muted small mb-0">
              © {new Date().getFullYear()} ZANO!. All Rights Reserved.
            </p>
            <p className="text-muted small">
              Crafted by{" "}
              <a
                href="https://github.com/jjingofarouk"
                className="text-decoration-underline text-gold"
                target="_blank"
                rel="noreferrer"
              >
                @jjingofarouk
              </a>
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div className="col-lg-4 col-md-6" variants={sectionVariants}>
            <h5 className="mb-3">Explore</h5>
            <ul className="list-unstyled">
              {[
                { to: "/story", text: "Our Story" },
                { to: "/products", text: "Products" },
                { to: "/faq", text: "FAQs" },
                { to: "/contact", text: "Contact Us" },
                { to: "/privacy", text: "Privacy Policy" },
              ].map((link) => (
                <motion.li
                  key={link.to}
                  className="mb-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={link.to}
                    className="text-muted text-decoration-none hover-text-gold"
                  >
                    {link.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Contact */}
          <motion.div className="col-lg-4 col-md-12" variants={sectionVariants}>
            <h5 className="mb-3">Connect With Us</h5>
            <ul className="list-unstyled d-flex flex-wrap gap-3 mb-4">
              {[
                { icon: FaGithub, url: "https://github.com/jjingofarouk" },
                {
                  icon: FaInstagram,
                  url: "https://instagram.com/frankshoeworld",
                },
                { icon: FaWhatsapp, url: "https://wa.me/256123456789" },
                { icon: FaYoutube, url: "https://youtube.com/@frankshoeworld" },
                { icon: FaSkype, url: "skype:frankshoeworld?call" },
              ].map((social, index) => (
                <motion.li
                  key={index}
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white"
                  >
                    <social.icon size={24} />
                  </a>
                </motion.li>
              ))}
            </ul>
            <div>
              <p className="text-muted small mb-1">
                Email:{" "}
                <a href="mailto:info@frankshoeworld.com" className="text-gold">
                  info@frankshoeworld.com
                </a>
              </p>
              <p className="text-muted small">Phone: +256 123 456 789</p>
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            className="col-12 mt-4 text-center"
            variants={sectionVariants}
          >
            <h5 className="mb-3">Stay in Step</h5>
            <p className="text-muted small mb-3">
              Subscribe for exclusive offers and style updates.
            </p>
            <form
              className="d-flex justify-content-center gap-2"
              style={{ maxWidth: "400px", margin: "0 auto" }}
              onSubmit={handleSubscribe}
            >
              <motion.input
                type="email"
                className="form-control rounded-0"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                whileFocus={{ scale: 1.02, borderColor: "#d4af37" }}
                style={{ maxWidth: "250px" }}
              />
              <motion.button
                className="btn btn-gold rounded-0 px-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
              >
                Subscribe
              </motion.button>
            </form>
            <AnimatePresence>
              {subscribed && (
                <motion.p
                  className="text-gold small mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Thanks for subscribing! Check your inbox soon.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Back to Top */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="#"
            className="text-muted text-decoration-none small hover-text-gold"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            Back to Top <FaArrowUp className="ms-1" />
          </motion.a>
        </motion.div>
      </div>

      {/* Enhanced Styles */}
      <style jsx>{`
        .site-footer {
          background: linear-gradient(180deg, #212529 0%, #1a1e22 100%);
          position: relative;
          overflow: hidden;
        }
        .site-footer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at top left,
            rgba(212, 175, 55, 0.1),
            transparent 70%
          );
          pointer-events: none;
        }
        .text-gold {
          color: #d4af37;
          background: linear-gradient(45deg, #d4af37, #b8860b);
          -webkit-background-clip: text;
          background-clip: text;
        }
        .hover-text-gold:hover {
          color: #d4af37 !important;
          transition: color 0.3s ease;
        }
        .btn-gold {
          background: linear-gradient(45deg, #d4af37, #b8860b);
          color: #fff;
          border: none;
          box-shadow: 0 2px 5px rgba(212, 175, 55, 0.3);
          transition: all 0.3s ease;
        }
        .form-control {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          transition: all 0.3s ease;
        }
        .form-control:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: #d4af37;
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.2);
          color: #fff;
        }
        .form-control::placeholder {
          color: #aaa;
        }
      `}</style>
    </motion.footer>
  );
};

export default Footer;
