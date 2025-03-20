// Retrieve initial state from localStorage if available
const getInitialState = () => {
  const storedCart = localStorage.getItem("cart");
  const storedSavedItems = localStorage.getItem("savedItems");
  return {
    cart: storedCart ? JSON.parse(storedCart) : [],
    savedItems: storedSavedItems ? JSON.parse(storedSavedItems) : [],
  };
};

const handleCart = (state = getInitialState(), action) => {
  const product = action.payload;
  let updatedCart;
  let updatedSavedItems;

  switch (action.type) {
    case "ADDITEM":
      const exist = state.cart.find((x) => x.id === product.id);
      if (exist) {
        updatedCart = state.cart.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        updatedCart = [...state.cart, { ...product, qty: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case "DELITEM":
      const exist2 = state.cart.find((x) => x.id === product.id);
      if (exist2.qty === 1) {
        updatedCart = state.cart.filter((x) => x.id !== exist2.id);
      } else {
        updatedCart = state.cart.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case "CLEARCART":
      updatedCart = [];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case "SAVEFORLATER":
      const existInCart = state.cart.find((x) => x.id === product.id);
      if (existInCart) {
        updatedCart = state.cart.filter((x) => x.id !== product.id);
        updatedSavedItems = [...state.savedItems, { ...product, qty: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        localStorage.setItem("savedItems", JSON.stringify(updatedSavedItems));
        return { cart: updatedCart, savedItems: updatedSavedItems };
      }
      return state;

    case "ADDBACKTOCART":
      const existInSaved = state.savedItems.find((x) => x.id === product.id);
      if (existInSaved) {
        updatedSavedItems = state.savedItems.filter((x) => x.id !== product.id);
        updatedCart = [...state.cart, { ...existInSaved, qty: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        localStorage.setItem("savedItems", JSON.stringify(updatedSavedItems));
        return { cart: updatedCart, savedItems: updatedSavedItems };
      }
      return state;

    default:
      return state;
  }
};

export default handleCart;