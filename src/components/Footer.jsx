import React from "react";
import { FaGithub, FaInstagram, FaWhatsapp, FaYoutube, FaSkype } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="site-footer bg-dark text-white py-5">
      <div className="container">
        <div className="row g-4">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6">
            <h4 className="mb-3">
              <a href="/" className="text-white text-decoration-none">
                <span className="fw-bold">Frank</span> Shoe World
              </a>
            </h4>
            <p className="text-muted small">
              Step into Style with premium footwear from Kampala's finest. 
              Quality, comfort, and elegance in every stride.
            </p>
            <p className="text-muted small mb-0">
              &copy; {new Date().getFullYear()} Frank Shoe World. All Rights Reserved.
            </p>
            <p className="text-muted small">
              Designed by{" "}
              <a
                href="https://jjingofarouq.xyz"
                className="text-decoration-underline text-white"
                target="_blank"
                rel="noreferrer"
              >
                Jjingo Farouk
              </a>
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-lg-4 col-md-6">
            <h5 className="mb-3">Explore</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/story" className="text-muted text-decoration-none hover-text-white">
                  Our Story
                </a>
              </li>
              <li className="mb-2">
                <a href="/products" className="text-muted text-decoration-none hover-text-white">
                  Products
                </a>
              </li>
              <li className="mb-2">
                <a href="/faq" className="text-muted text-decoration-none hover-text-white">
                  FAQs
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-muted text-decoration-none hover-text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-muted text-decoration-none hover-text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="col-lg-4 col-md-12">
            <h5 className="mb-3">Connect With Us</h5>
            <ul className="list-unstyled d-flex flex-wrap gap-3 mb-4">
              <li>
                <a href="https://github.com/jjingofarouk" target="_blank" rel="noreferrer" className="text-white">
                  <FaGithub size={24} className="hover-scale" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/frankshoeworld" target="_blank" rel="noreferrer" className="text-white">
                  <FaInstagram size={24} className="hover-scale" />
                </a>
              </li>
              <li>
                <a href="https://wa.me/256123456789" target="_blank" rel="noreferrer" className="text-white">
                  <FaWhatsapp size={24} className="hover-scale" />
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@frankshoeworld" target="_blank" rel="noreferrer" className="text-white">
                  <FaYoutube size={24} className="hover-scale" />
                </a>
              </li>
              <li>
                <a href="skype:frankshoeworld?call" target="_blank" rel="noreferrer" className="text-white">
                  <FaSkype size={24} className="hover-scale" />
                </a>
              </li>
            </ul>
            <div>
              <p className="text-muted small mb-1">Email: <a href="mailto:info@frankshoeworld.com" className="text-white">info@frankshoeworld.com</a></p>
              <p className="text-muted small">Phone: +256 123 456 789</p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="col-12 mt-4 text-center">
            <h5 className="mb-3">Stay in Step</h5>
            <p className="text-muted small mb-3">
              Subscribe to our newsletter for exclusive offers and style updates.
            </p>
            <form className="d-flex justify-content-center gap-2" style={{ maxWidth: "400px", margin: "0 auto" }}>
              <input
                type="email"
                className="form-control rounded-0"
                placeholder="Enter your email"
                style={{ maxWidth: "250px" }}
              />
              <button className="btn btn-outline-light rounded-0 px-4" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-4">
          <a href="#" className="text-muted text-decoration-none small hover-text-white">
            Back to Top <i className="bi bi-arrow-up ms-1"></i>
          </a>
        </div>
      </div>

      {/* Inline CSS for hover effects */}
      <style jsx>{`
        .hover-text-white:hover {
          color: #fff !important;
        }
        .hover-scale {
          transition: transform 0.3s ease;
        }
        .hover-scale:hover {
          transform: scale(1.2);
        }
      `}</style>
    </footer>
  );
};

export default Footer;