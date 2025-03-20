import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled components
const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CardContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  height: 100%;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: contain;
  padding: 20px;
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 20px;
  text-align: center;
`;

const ProductName = styled.h5`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 10px;
  font-weight: 600;
`;

const ProductDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const PriceTag = styled.div`
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffd700;
  font-size: 1.2rem;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  padding: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  background: ${props => props.primary ? 
    'linear-gradient(45deg, #ffd700, #d4af37)' : 
    'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.primary ? '#1a1a1a' : '#ffffff'};
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
  }
`;

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <ProductLink to={`/product/${product.id}`}>
      <CardContainer
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.02 }}
      >
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
        />
        <CardContent>
          <ProductName>
            {product.name.length > 20 ? 
              `${product.name.substring(0, 20)}...` : 
              product.name}
          </ProductName>
          <ProductDescription>
            {product.description.length > 100 ?
              `${product.description.substring(0, 100)}...` :
              product.description}
          </ProductDescription>
        </CardContent>
        <PriceTag>
          ${product.price.toLocaleString()} USD
        </PriceTag>
        <ButtonContainer>
          <ActionButton 
            primary 
            as={Link} 
            to={`/product/${product.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            View Details
          </ActionButton>
          <ActionButton onClick={handleAddToCart}>
            Add to Cart
          </ActionButton>
        </ButtonContainer>
      </CardContainer>
    </ProductLink>
  );
};

export default ProductCard;