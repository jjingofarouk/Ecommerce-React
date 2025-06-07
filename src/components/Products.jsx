import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { 
  Collections as CollectionsIcon,
  FlashOn as FlashOnIcon,
  WbSunny as WbSunnyIcon,
  Favorite as FavoriteIcon,
  ChildCare as ChildCareIcon,
  ShoppingCart as ShoppingCartIcon 
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme, isHovered }) => ({
  borderRadius: '20px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
  boxShadow: isHovered 
    ? '0 20px 40px rgba(0,0,0,0.15)' 
    : '0 4px 20px rgba(0,0,0,0.08)',
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledButton = styled(Button)(({ theme, isActive }) => ({
  padding: '12px 24px',
  border: isActive ? '2px solid #000' : '2px solid #e9ecef',
  backgroundColor: isActive ? '#000' : '#fff',
  color: isActive ? '#fff' : '#6c757d',
  borderRadius: '50px',
  fontSize: '0.95rem',
  fontWeight: 500,
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minWidth: '120px',
  justifyContent: 'center',
  '&:hover': {
    borderColor: !isActive && '#000',
    color: !isActive && '#000',
    backgroundColor: !isActive && '#fff',
  },
}));

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Number of products per page
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
    { id: "all", label: "All Collections", icon: <CollectionsIcon /> },
    { id: "sneakers", label: "Sneakers", icon: <FlashOnIcon /> },
    { id: "casual", label: "Casual", icon: <WbSunnyIcon /> },
    { id: "formal", label: "Formal", icon: <FavoriteIcon /> },
    { id: "children", label: "Kids", icon: <ChildCareIcon /> }
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
      <Box sx={{ minHeight: '60vh' }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Skeleton 
            width={400} 
            height={60} 
            sx={{ borderRadius: '8px', mx: 'auto' }} 
          />
        </Box>
        <Grid container spacing={4}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton 
                height={480} 
                sx={{ borderRadius: '16px' }} 
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const filterProduct = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1); // Reset to first page when filtering
    if (cat === "all") {
      setFilter(data);
    } else {
      const updatedList = data.filter((item) => item.category.includes(cat));
      setFilter(updatedList);
    }
  };

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filter.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filter.length / productsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  const ShowProducts = () => {
    return (
      <>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700, 
              letterSpacing: '-0.02em', 
              color: '#1a1a1a',
              mb: 3 
            }}
          >
            Step Into Style
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: 'text.secondary', 
              fontSize: '1.2rem', 
              maxWidth: '600px', 
              mx: 'auto' 
            }}
          >
            Discover our curated collection of premium footwear, 
            where comfort meets sophistication
          </Typography>
        </Box>

        {/* Category Filter */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: 2, 
            mb: 5, 
            px: 2 
          }}
        >
          {categories.map((category) => (
            <StyledButton
              key={category.id}
              isActive={activeCategory === category.id}
              onClick={() => filterProduct(category.id)}
            >
              {category.icon}
              {category.label}
            </StyledButton>
          ))}
        </Box>

        {/* Products Grid */}
        <Grid container spacing={4}>
          {currentProducts.map((product, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={product.id}
              sx={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <StyledCard
                isHovered={hoveredProduct === product.id}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Image */}
                <Box sx={{ position: 'relative', height: 280, overflow: 'hidden', bgcolor: '#f8f9fa' }}>
                  <CardMedia
                    component="img"
                    image={product.imageUrl}
                    alt={product.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: hoveredProduct === product.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                  {/* Stock Status Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      padding: '6px 12px',
                      bgcolor: product.stockStatus === "in-stock" ? '#000' : '#ff6b6b',
                      color: '#fff',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 500
                    }}
                  >
                    {product.stockStatus === "in-stock" ? "In Stock" : "Low Stock"}
                  </Box>
                </Box>

                {/* Product Info */}
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#1a1a1a', 
                      lineHeight: 1.3, 
                      minHeight: '52px',
                      mb: 2 
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary', 
                      lineHeight: 1.5, 
                      minHeight: '60px',
                      mb: 3 
                    }}
                  >
                    {product.description.length > 85 
                      ? `${product.description.substring(0, 85)}...`
                      : product.description
                    }
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700, 
                      color: '#000',
                      mb: 3 
                    }}
                  >
                    {product.price.toLocaleString()} {product.currency}
                  </Typography>
                </CardContent>

                {/* Action Buttons */}
                <CardActions sx={{ p: 3, pt: 0, gap: 2 }}>
                  <Button
                    component={Link}
                    to={`/product/${product.id}`}
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: '#000',
                      color: '#fff',
                      borderRadius: '12px',
                      padding: '12px 20px',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: '#333',
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => addProduct(product)}
                    disabled={product.stockStatus === "out-ofstock"}
                    sx={{
                      bgcolor: product.stockStatus === "out-of-stock" ? '#e9ecef' : '#fff',
                      color: product.stockStatus === "out-of-stock" ? '#6c757d' : '#000',
                      border: '2px solid #000',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      minWidth: '50px',
                      '&:hover': {
                        bgcolor: product.stockStatus !== "out-of-stock" && '#000',
                        color: product.stockStatus !== "out-of-stock" && '#fff',
                        transform: product.stockStatus !== "out-of-stock" && 'translateY(-1px)',
                        border: '2px solid #000'
                      }
                    }}
                  >
                    <ShoppingCartIcon />
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: '1rem',
                  fontWeight: 500,
                  '&.Mui-selected': {
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  },
                },
              }}
            />
          </Box>
        )}

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
    <Box 
      sx={{ 
        width: '100vw',
        bgcolor: '#fafafa', 
        minHeight: '100vh', 
        py: 10,
        px: { xs: 2, sm: 3, md: 4, lg: 5 }
      }}
    >
      {loading ? <Loading /> : <ShowProducts />}
    </Box>
  );
};

export default Products;