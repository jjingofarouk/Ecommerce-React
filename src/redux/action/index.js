// For Add Item to Cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

// For Delete Item from Cart
export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};

// For Clear Cart
export const clearCart = () => {
  return {
    type: "CLEARCART",
  };
};

// For Save Item for Later
export const saveForLater = (product) => {
  return {
    type: "SAVEFORLATER",
    payload: product,
  };
};

// For Add Item Back to Cart from Saved
export const addBackToCart = (product) => {
  return {
    type: "ADDBACKTOCART",
    payload: product,
  };
};