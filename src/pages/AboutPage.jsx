import React from "react";
import { Footer, Navbar } from "../components";
import "./AboutPage.css"; // Custom styles for a powerful design

const AboutPage = () => {
  return (
    <>
      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-overlay">
            <h1 className="hero-title">Frank Shoe World</h1>
            <p className="hero-subtitle">
              Where Timeless Craftsmanship Meets Modern Elegance
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="about-story container my-5 py-5">
          <h2 className="section-title text-center">Our Story</h2>
          <hr className="section-divider" />
          <p className="lead text-center">
            At Frank Shoe World, we believe footwear is more than function—it’s
            an expression of identity. Founded with a passion for impeccable
            design and unparalleled quality, we craft each pair to elevate your
            every step. From urban-ready sneakers to statement dress loafers,
            our collections blend heritage techniques with contemporary flair,
            offering a wardrobe of sophistication for the discerning soul.
          </p>
        </section>

        {/* Our Craftsmanship Section */}
        <section className="about-craftsmanship container my-5 py-5">
          <h2 className="section-title text-center">Our Craftsmanship</h2>
          <hr className="section-divider" />
          <div className="row">
            <div className="col-md-6">
              <p className="craft-text">
                Every stitch, every sole, every detail is a testament to our
                dedication. We source premium materials—breathable canvas,
                butter-soft leather, high-shine patents—to create shoes that
                feel as extraordinary as they look. Our artisans pour their
                expertise into each design, ensuring durability and comfort
                without compromising on style.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="/assets/images/shoes/canvas.jpg" // Use your own image
                alt="Craftsmanship"
                className="craft-image img-fluid"
              />
            </div>
          </div>
        </section>

        {/* Our Collections Section */}
        <section className="about-collections container my-5 py-5">
          <h2 className="section-title text-center">Our Collections</h2>
          <hr className="section-divider" />
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="collection-card">
                <img
                  src="/assets/images/shoes/canvas.jpg"
                  alt="Sneakers"
                  className="collection-img img-fluid"
                />
                <h5 className="collection-title text-center">Sneakers</h5>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="collection-card">
                <img
                  src="/assets/images/shoes/casualloafers.jpg"
                  alt="Casual Loafers"
                  className="collection-img img-fluid"
                />
                <h5 className="collection-title text-center">Casual Loafers</h5>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="collection-card">
                <img
                  src="/assets/images/shoes/dress_loafers.jpg"
                  alt="Dress Loafers"
                  className="collection-img img-fluid"
                />
                <h5 className="collection-title text-center">Dress Loafers</h5>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="collection-card">
                <img
                  src="/assets/images/shoes/canvas.jpg" // Replace with a children’s shoe image if available
                  alt="Children’s Shoes"
                  className="collection-img img-fluid"
                />
                <h5 className="collection-title text-center">Children’s Shoes</h5>
              </div>
            </div>
          </div>
        </section>
      </div>


    </>
  );
};

export default AboutPage;