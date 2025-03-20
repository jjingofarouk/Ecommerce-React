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

// For Update Quantity
export const updateCartQuantity = (productId, qty) => {
  return {
    type: "UPDATEQTY",
    payload: { id: productId, qty },
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

// For Apply Discount
export const applyDiscount = (discountPercentage) => {
  return {
    type: "APPLYDISCOUNT",
    payload: discountPercentage,
  };
};

// For Toggle Favorite
export const toggleFavorite = (productId) => {
  return {
    type: "TOGGLEFAVORITE",
    payload: productId,
  };
};

// For Sync Cart with Server (async action)
export const syncCart = (cart) => {
  return async (dispatch) => {
    try {
      // Placeholder API call (replace with real endpoint)
      await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify(cart),
        headers: { "Content-Type": "application/json" },
      });
      dispatch({ type: "SYNCCART", payload: cart });
    } catch (error) {
      console.error("Sync failed:", error);
    }
  };
};

// For Undo Last Action
export const undoCart = () => {
  return {
    type: "UNDO",
  };
};