import React from "react";
import { Footer, Navbar } from "../components";
import { motion } from "framer-motion"; // Added for animations
import styled from "styled-components"; // Added for custom styling

// Styled components for custom styling
const ContactContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 80px 0;
  color: #ffffff;
`;

const ContactTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  background: linear-gradient(to right, #ffd700, #ffffff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 500;
  color: #ffd700;
  letter-spacing: 1px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
  resize: none;
  min-height: 150px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  padding: 12px 32px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(45deg, #ffd700, #d4af37);
  color: #1a1a1a;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ContactPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Navbar />
      <ContactContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ContactTitle variants={itemVariants}>
            Contact Frank Shoe World
          </ContactTitle>
          <FormContainer>
            <StyledForm>
              <FormField variants={itemVariants}>
                <Label htmlFor="Name">Name</Label>
                <Input
                  type="text"
                  id="Name"
                  placeholder="Enter your name"
                  required
                />
              </FormField>
              <FormField variants={itemVariants}>
                <Label htmlFor="Email">Email</Label>
                <Input
                  type="email"
                  id="Email"
                  placeholder="name@example.com"
                  required
                />
              </FormField>
              <FormField variants={itemVariants}>
                <Label htmlFor="Message">Message</Label>
                <TextArea
                  id="Message"
                  placeholder="How can we assist you today?"
                  required
                />
              </FormField>
              <SubmitButton type="submit">
                Send Message
              </SubmitButton>
            </StyledForm>
          </FormContainer>
        </motion.div>
      </ContactContainer>
      <Footer />
    </>
  );
};

export default ContactPage;