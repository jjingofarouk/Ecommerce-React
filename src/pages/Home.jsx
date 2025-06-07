import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardMedia, 
  CardContent, 
  Grid, 
  Chip,
  IconButton,
  TextField,
  InputAdornment
} from "@mui/material";
import { 
  TrendingUp, 
  Star, 
  ShoppingBag, 
  LocalShipping, 
  Security, 
  Verified,
  Email,
  ArrowForward,
  PlayArrow
} from "@mui/icons-material";
import styled, { keyframes } from "styled-components";

// Styled components for custom styling
const StyledHeroSection = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: #000;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const GlassmorphismCard = styled(Card)`
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1) !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 35px 60px rgba(0, 0, 0, 0.15) !important;
  }
`;

const ParallaxSection = styled.div`
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 500px;
  display: flex;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const PulsingButton = styled(Button)`
  animation: ${pulse} 2s infinite;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4) !important;
  color: white !important;
  font-weight: 700 !important;
  padding: 15px 40px !important;
  border-radius: 50px !important;
  text-transform: none !important;
  font-size: 1.1rem !important;
`;

const StatsCard = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  // Mock data for demonstration
  const heroSlides = [
    {
      title: "Step Into Tomorrow",
      subtitle: "Revolutionary comfort meets cutting-edge design",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop",
      cta: "Explore Collection"
    },
    {
      title: "Urban Legends",
      subtitle: "Street-ready sneakers for the modern athlete",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop",
      cta: "Shop Sneakers"
    },
    {
      title: "Timeless Elegance",
      subtitle: "Classic designs that never go out of style",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=800&fit=crop",
      cta: "View Classics"
    }
  ];

  const mockProducts = [
    {
      id: 1,
      name: "Air Max Revolution",
      price: 149.99,
      currency: "USD",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: ["sneakers"],
      rating: 4.8,
      isNew: true
    },
    {
      id: 2,
      name: "Classic Canvas",
      price: 79.99,
      currency: "USD",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
      category: ["casual"],
      rating: 4.6,
      isHot: true
    },
    {
      id: 3,
      name: "Business Pro",
      price: 199.99,
      currency: "USD",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop",
      category: ["formal"],
      rating: 4.9,
      isNew: false
    },
    {
      id: 4,
      name: "Kids Explorer",
      price: 59.99,
      currency: "USD",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      category: ["children"],
      rating: 4.7,
      isHot: false
    }
  ];

  const brands = [
    "https://logo.clearbit.com/nike.com",
    "https://logo.clearbit.com/adidas.com",
    "https://logo.clearbit.com/puma.com",
    "https://logo.clearbit.com/newbalance.com",
    "https://logo.clearbit.com/converse.com",
    "https://logo.clearbit.com/vans.com"
  ];

  useEffect(() => {
    // Simulate loading featured products
    setTimeout(() => {
      setFeaturedProducts(mockProducts);
      setLoading(false);
    }, 1000);

    // Auto-rotate hero slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Announcement Bar */}
      <Box sx={{ backgroundColor: '#000', color: 'white', py: 1 }}>
        <Marquee speed={50} pauseOnHover>
          <Typography sx={{ mx: 4, fontSize: '0.9rem' }}>
            🔥 Flash Sale: Up to 50% off on selected items | Free shipping on orders over $100 | New arrivals every week
          </Typography>
        </Marquee>
      </Box>

      {/* Hero Section */}
      <StyledHeroSection>
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 900, 
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      lineHeight: 1.2,
                      mb: 2
                    }}
                  >
                    {heroSlides[currentSlide].title}
                  </Typography>
                </motion.div>
                
                <motion.div variants={fadeInUp}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.8)', 
                      mb: 4,
                      fontWeight: 300 
                    }}
                  >
                    {heroSlides[currentSlide].subtitle}
                  </Typography>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <PulsingButton
                    size="large"
                    endIcon={<ArrowForward />}
                    component={Link}
                    to="/products"
                  >
                    {heroSlides[currentSlide].cta}
                  </PulsingButton>
                </motion.div>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8 }}
              >
                <Box
                  component="img"
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '20px',
                    boxShadow: '0 25px 50px rgba(255,255,255,0.1)'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>

          {/* Floating Stats */}
          <FloatingElement
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            style={{ top: '20%', right: '10%' }}
          >
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
              50K+
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Happy Customers
            </Typography>
          </FloatingElement>

          <FloatingElement
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            style={{ bottom: '30%', left: '5%' }}
          >
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
              4.9★
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Average Rating
            </Typography>
          </FloatingElement>
        </Container>

        {/* Slide Indicators */}
        <Box sx={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
          {heroSlides.map((_, index) => (
            <IconButton
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 12,
                height: 12,
                mx: 0.5,
                backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.3)',
                '&:hover': { backgroundColor: 'white' }
              }}
            />
          ))}
        </Box>
      </StyledHeroSection>

      {/* Brand Marquee */}
      <Box sx={{ py: 4, backgroundColor: '#f8f9fa' }}>
        <Container>
          <Typography variant="h6" textAlign="center" sx={{ mb: 3, color: '#666' }}>
            Trusted by Leading Brands
          </Typography>
          <Marquee speed={40} pauseOnHover>
            {brands.map((brand, index) => (
              <Box
                key={index}
                component="img"
                src={brand}
                alt={`Brand ${index}`}
                sx={{
                  height: 40,
                  mx: 4,
                  filter: 'grayscale(100%)',
                  opacity: 0.6,
                  transition: 'all 0.3s',
                  '&:hover': {
                    filter: 'grayscale(0%)',
                    opacity: 1
                  }
                }}
              />
            ))}
          </Marquee>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <Grid container spacing={4}>
            {[
              { icon: <LocalShipping />, title: "Free Shipping", desc: "On orders over $100" },
              { icon: <Security />, title: "Secure Payment", desc: "256-bit SSL encryption" },
              { icon: <Verified />, title: "Quality Guarantee", desc: "30-day return policy" },
              { icon: <Star />, title: "5-Star Service", desc: "Rated by 50,000+ customers" }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={scaleIn}>
                  <StatsCard whileHover={{ y: -5 }}>
                    <Box sx={{ color: '#FF6B6B', mb: 2 }}>
                      {React.cloneElement(feature.icon, { fontSize: 'large' })}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.desc}
                    </Typography>
                  </StatsCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Featured Products */}
      <Container sx={{ py: 8 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Typography 
            variant="h2" 
            textAlign="center" 
            sx={{ 
              fontWeight: 900, 
              mb: 6,
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Featured Collection
          </Typography>

          <Grid container spacing={4}>
            {featuredProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassmorphismCard>
                    <Box sx={{ position: 'relative' }}>
                      {product.isNew && (
                        <Chip 
                          label="NEW" 
                          size="small" 
                          sx={{ 
                            position: 'absolute', 
                            top: 10, 
                            left: 10, 
                            zIndex: 1,
                            backgroundColor: '#FF6B6B',
                            color: 'white',
                            fontWeight: 700
                          }} 
                        />
                      )}
                      {product.isHot && (
                        <Chip 
                          label="HOT" 
                          size="small" 
                          sx={{ 
                            position: 'absolute', 
                            top: 10, 
                            right: 10, 
                            zIndex: 1,
                            backgroundColor: '#4ECDC4',
                            color: 'white',
                            fontWeight: 700
                          }} 
                        />
                      )}
                      <CardMedia
                        component="img"
                        height="250"
                        image={product.image}
                        alt={product.name}
                        sx={{ objectFit: 'cover' }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        {product.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Star sx={{ color: '#FFD700', fontSize: '1rem', mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          {product.rating}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: '#FF6B6B', 
                          fontWeight: 700,
                          mb: 2
                        }}
                      >
                        ${product.price}
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<ShoppingBag />}
                        sx={{
                          backgroundColor: '#000',
                          '&:hover': { backgroundColor: '#333' },
                          borderRadius: '25px',
                          textTransform: 'none',
                          fontWeight: 600
                        }}
                        component={Link}
                        to={`/product/${product.id}`}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </GlassmorphismCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" sx={{ mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              endIcon={<ArrowForward />}
              component={Link}
              to="/products"
              sx={{
                borderColor: '#FF6B6B',
                color: '#FF6B6B',
                borderRadius: '25px',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#FF6B6B',
                  color: 'white'
                }
              }}
            >
              View All Products
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* Parallax CTA Section */}
      <ParallaxSection 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920&h=500&fit=crop)' 
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Typography 
              variant="h2" 
              textAlign="center" 
              sx={{ 
                color: 'white', 
                fontWeight: 900, 
                mb: 3,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Join the Shoe Revolution
            </Typography>
            <Typography 
              variant="h5" 
              textAlign="center" 
              sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}
            >
              Get exclusive access to new releases and special offers
            </Typography>
            
            <Box sx={{ maxWidth: 600, mx: 'auto' }}>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: 'rgba(0,0,0,0.5)' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '25px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '25px'
                    }
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#FF6B6B',
                    borderRadius: '25px',
                    px: 4,
                    minWidth: 150,
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': { backgroundColor: '#e55a5a' }
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </ParallaxSection>

      {/* Video Section */}
      <Container sx={{ py: 8 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Typography 
            variant="h3" 
            textAlign="center" 
            sx={{ fontWeight: 900, mb: 6 }}
          >
            See Our Craftsmanship
          </Typography>
          
          <Box 
            sx={{ 
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
              cursor: 'pointer'
            }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&h=600&fit=crop"
              alt="Shoe craftsmanship"
              sx={{ width: '100%', height: 400, objectFit: 'cover' }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: '50%',
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}
            >
              <PlayArrow sx={{ fontSize: '2rem', color: '#FF6B6B', ml: 0.5 }} />
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;