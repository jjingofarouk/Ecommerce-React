// Retrieve initial state from localStorage if available
const getInitialState = () => {
  const storedCart = localStorage.getItem("cart");
  const storedSavedItems = localStorage.getItem("savedItems");
  const storedDiscount = localStorage.getItem("discount");
  return {
    cart: storedCart ? JSON.parse(storedCart) : [],
    savedItems: storedSavedItems ? JSON.parse(storedSavedItems) : [],
    discount: storedDiscount ? parseFloat(storedDiscount) : 0,
    prevState: null, // For undo functionality
  };
};

const handleCart = (state = getInitialState(), action) => {
  const product = action.payload;
  let updatedCart;
  let updatedSavedItems;

  switch (action.type) {
    case "ADDITEM":
      const exist = state.cart.find((x) => x.id === product.id);
      if (exist && exist.qty >= (product.stockQuantity || Infinity)) {
        return state; // Stock limit reached
      }
      if (exist) {
        updatedCart = state.cart.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else if ((product.stockQuantity || Infinity) >= 1) {
        updatedCart = [...state.cart, { ...product, qty: 1, isFavorite: false }];
      } else {
        return state;
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart, prevState: { ...state, prevState: null } };

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
      return { ...state, cart: updatedCart, prevState: { ...state, prevState: null } };

    case "UPDATEQTY":
      updatedCart = state.cart
        .map((x) =>
          x.id === action.payload.id
            ? { ...x, qty: Math.max(0, Math.min(action.payload.qty, x.stockQuantity || Infinity)) }
            : x
        )
        .filter((x) => x.qty > 0); // Remove if qty set to 0
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart, prevState: { ...state, prevState: null } };

    case "CLEARCART":
      updatedCart = [];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart, prevState: { ...state, prevState: null } };

    case "SAVEFORLATER":
      const existInCart = state.cart.find((x) => x.id === product.id);
      if (existInCart) {
        updatedCart = state.cart.filter((x) => x.id !== product.id);
        updatedSavedItems = [...state.savedItems, { ...product, qty: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        localStorage.setItem("savedItems", JSON.stringify(updatedSavedItems));
        return {
          cart: updatedCart,
          savedItems: updatedSavedItems,
          prevState: { ...state, prevState: null },
          discount: state.discount,
        };
      }
      return state;

    case "ADDBACKTOCART":
      const existInSaved = state.savedItems.find((x) => x.id === product.id);
      if (existInSaved && (existInSaved.stockQuantity || Infinity) > state.cart.reduce((acc, item) => (item.id === product.id ? acc + item.qty : acc), 0)) {
        updatedSavedItems = state.savedItems.filter((x) => x.id !== product.id);
        updatedCart = [...state.cart, { ...existInSaved, qty: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        localStorage.setItem("savedItems", JSON.stringify(updatedSavedItems));
        return {
          cart: updatedCart,
          savedItems: updatedSavedItems,
          prevState: { ...state, prevState: null },
          discount: state.discount,
        };
      }
      return state;

    case "APPLYDISCOUNT":
      localStorage.setItem("discount", action.payload);
      return { ...state, discount: action.payload };

    case "TOGGLEFAVORITE":
      updatedCart = state.cart.map((x) =>
        x.id === action.payload ? { ...x, isFavorite: !x.isFavorite } : x
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart, prevState: { ...state, prevState: null } };

    case "SYNCCART":
      localStorage.setItem("cart", JSON.stringify(action.payload));
      return { ...state, cart: action.payload };

    case "UNDO":
      if (state.prevState) {
        localStorage.setItem("cart", JSON.stringify(state.prevState.cart));
        localStorage.setItem("savedItems", JSON.stringify(state.prevState.savedItems));
        return { ...state.prevState, prevState: null };
      }
      return state;

    default:
      return state;
  }
};

export default handleCart;