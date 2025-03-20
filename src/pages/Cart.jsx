import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

const CartContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 80px 0;
`;

const CartTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  color: #ffd700;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ItemCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
`;

const SummaryCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  height: fit-content;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 5px 15px;
  width: fit-content;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: #ffd700;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const CheckoutButton = styled(Link)`
  display: block;
  padding: 15px;
  background: linear-gradient(45deg, #ffd700, #d4af37);
  color: #1a1a1a;
  text-align: center;
  border-radius: 30px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
    text-decoration: none;
    color: #1a1a1a;
  }
`;

const EmptyCartContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  max-width: 600px;
  margin: 40px auto;
  color: #ffffff;
`;

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const addItem = (product) => dispatch(addCart(product));
  const removeItem = (product) => dispatch(delCart(product));

  const EmptyCart = () => (
    <EmptyCartContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="mb-4">Your Frank Shoe World Cart is Empty</h4>
      <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        Explore our premium footwear collection
      </p>
      <Link
        to="/collection"
        style={{
          color: '#ffd700',
          textDecoration: 'none',
          fontWeight: 500,
          borderBottom: '1px solid #ffd700'
        }}
      >
        Discover Luxury Footwear
      </Link>
    </EmptyCartContainer>
  );

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 75.0; // Higher shipping for premium items
    let totalItems = 0;
    
    state.forEach(item => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <CartGrid>
        <ItemCard as={motion.div} initial={{ x: -50 }} animate={{ x: 0 }}>
          <h5 style={{ color: '#ffd700', marginBottom: '30px' }}>
            Your Premium Selections ({totalItems})
          </h5>
          {state.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4"
            >
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '10px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h6 style={{ color: '#ffffff', marginBottom: '10px' }}>
                    {item.title}
                  </h6>
                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                    <p>Style: {item.style || 'Premium'}</p>
                    <p>Size: {item.size || 'Custom'}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <QuantityControls>
                      <ControlButton onClick={() => removeItem(item)}>-</ControlButton>
                      <span style={{ color: '#ffffff' }}>{item.qty}</span>
                      <ControlButton onClick={() => addItem(item)}>+</ControlButton>
                    </QuantityControls>
                    <span style={{ color: '#ffd700', fontWeight: 500 }}>
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)', margin: '20px 0' }} />
            </motion.div>
          ))}
        </ItemCard>
        <SummaryCard as={motion.div} initial={{ x: 50 }} animate={{ x: 0 }}>
          <h5 style={{ color: '#ffd700', marginBottom: '30px' }}>
            Order Summary
          </h5>
          <div style={{ color: '#ffffff', marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>Subtotal ({totalItems} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>Premium Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
              <span>Total</span>
              <span>${(subtotal + shipping).toFixed(2)}</span>
            </div>
          </div>
          <CheckoutButton to="/checkout">
            Proceed to Checkout
          </CheckoutButton>
        </SummaryCard>
      </CartGrid>
    );
  };

  return (
    <>
      <Navbar />
      <CartContainer>
        <CartTitle as={motion.h1} initial={{ y: -20 }} animate={{ y: 0 }}>
          Your Frank Shoe World Cart
        </CartTitle>
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </CartContainer>
      <Footer />
    </>
  );
};

export default Cart;