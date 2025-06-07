import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import {
  GitHub,
  Instagram,
  WhatsApp,
  YouTube,
  Skype,
  ArrowUpward,
} from "@mui/icons-material";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

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
      className="site-footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            <motion.div variants={sectionVariants}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Typography variant="h4" className="brand-title">
                  <a href="/" className="text-white text-decoration-none">
                    <span className="text-gold">ZANO!</span>
                  </a>
                </Typography>
              </motion.div>
              <Typography variant="body2" className="text-muted">
                Step into Style with premium footwear from Kampala's finest.
                Quality, comfort, and elegance in every stride.
              </Typography>
              <Typography variant="body2" className="text-muted">
                © {new Date().getFullYear()} ZANO!. All Rights Reserved.
              </Typography>
              <Typography variant="body2" className="text-muted">
                Crafted by{" "}
                <a
                  href="https://github.com/jjingofarouk"
                  className="text-gold text-decoration-underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  @jjingofarouk
                </a>
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <motion.div variants={sectionVariants}>
              <Typography variant="h5" className="section-title">
                Explore
              </Typography>
              <List>
                {[
                  { to: "/story", text: "Our Story" },
                  { to: "/products", text: "Products" },
                  { to: "/faq", text: "FAQs" },
                  { to: "/contact", text: "Contact Us" },
                  { to: "/privacy", text: "Privacy Policy" },
                ].map((link) => (
                  <motion.div
                    key={link.to}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ListItem disablePadding>
                      <ListItemText>
                        <a
                          href={link.to}
                          className="text-muted text-decoration-none hover-text-gold"
                        >
                          {link.text}
                        </a>
                      </ListItemText>
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </motion.div>
          </Grid>

          <Grid item xs={12} lg={4}>
            <motion.div variants={sectionVariants}>
              <Typography variant="h5" className="section-title">
                Connect With Us
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
                {[
                  { icon: GitHub, url: "https://github.com/jjingofarouk" },
                  {
                    icon: Instagram,
                    url: "https://instagram.com/frankshoeworld",
                  },
                  { icon: WhatsApp, url: "https://wa.me/256123456789" },
                  {
                    icon: YouTube,
                    url: "https://youtube.com/@frankshoeworld",
                  },
                  { icon: Skype, url: "skype:frankshoeworld?call" },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    variants={iconVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <IconButton
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white"
                    >
                      <social.icon fontSize="large" />
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
              <Typography variant="body2" className="text-muted">
                Email:{" "}
                <a href="mailto:info@frankshoeworld.com" className="text-gold">
                  info@frankshoeworld.com
                </a>
              </Typography>
              <Typography variant="body2" className="text-muted">
                Phone: +256 123 456 789
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center", mt: 4 }}>
            <motion.div variants={sectionVariants}>
              <Typography variant="h5" className="section-title">
                Stay in Step
              </Typography>
              <Typography variant="body2" className="text-muted" sx={{ mb: 2 }}>
                Subscribe for exclusive offers and style updates.
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubscribe}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  maxWidth: 400,
                  mx: "auto",
                }}
              >
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <TextField
                    type="email"
                    variant="outlined"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    fullWidth
                    sx={{ maxWidth: 250 }}
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="submit" className="btn-gold">
                    Subscribe
                  </Button>
                </motion.div>
              </Box>
              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Typography variant="body2" className="text-gold" sx={{ mt: 2 }}>
                      Thanks for subscribing! Check your inbox soon.
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Grid>
        </Grid>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
            <a
              href="#"
              className="text-muted text-decoration-none hover-text-gold"
            >
              Back to Top <ArrowUpward fontSize="small" sx={{ ml: 0.5, verticalAlign: "middle" }} />
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </motion.footer>
  );
};

export default Footer;