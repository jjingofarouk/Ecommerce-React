// src/reducer/handleCart.js
const getInitialState = () => {
  const storedCart = localStorage.getItem("cart");
  const storedSavedItems = localStorage.getItem("savedItems");
  const storedDiscount = localStorage.getItem("discount");
  return {
    cart: storedCart ? JSON.parse(storedCart) : [],
    savedItems: storedSavedItems ? JSON.parse(storedSavedItems) : [],
    discount: storedDiscount ? parseFloat(storedDiscount) : 0,
    prevState: null,
  };
};

const handleCart = (state = getInitialState(), action) => {
  let updatedCart;
  let updatedSavedItems;

  switch (action.type) {
    case "ADDITEM":
      const product = action.payload;
      const exist = state.cart.find((x) => x.id === product.id);
      if (exist && exist.qty >= (product.stockQuantity || Infinity)) {
        return state;
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
      updatedCart = updatedCart.sort((a, b) => a.id - b.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart, prevState: { ...state, prevState: null } };

    case "DELITEM":
      const exist2 = state.cart.find((x) => x.id === action.payload.id);
      if (exist2.qty === 1) {
        updatedCart = state.cart.filter((x) => x.id !== exist2.id);
      } else {
        updatedCart = state.cart.map((x) =>
          x.id === action.payload.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      updatedCart = updatedCart.sort((a, b) => a.id - b.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart, prevState: { ...state, prevState: null } };

    case "UPDATEQTY":
      updatedCart = state.cart
        .map((x) =>
          x.id === action.payload.id
            ? { ...x, qty: Math.max(0, Math.min(action.payload.qty, x.stockQuantity || Infinity)) }
            : x
        )
        .filter((x) => x.qty > 0);
      updatedCart = updatedCart.sort((a, b) => a.id - b.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart, prevState: { ...state, prevState: null } };

    case "CLEARCART":
      updatedCart = [];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart, prevState: { ...state, prevState: null } };

    case "SAVEFORLATER":
      const existInCart = state.cart.find((x) => x.id === action.payload.id);
      if (existInCart) {
        updatedCart = state.cart.filter((x) => x.id !== action.payload.id);
        updatedSavedItems = [...state.savedItems, { ...action.payload, qty: 1 }].sort((a, b) =>
          a.id - b.id
        );
        updatedCart = updatedCart.sort((a, b) => a.id - b.id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        localStorage.setItem("savedItems", JSON.stringify(updatedSavedItems));
        return {
          ...state,
          cart: updatedCart,
          savedItems: updatedSavedItems,
          prevState: { ...state, prevState: null },
        };
      }
      return state;

    case "ADDBACKTOCART":
      const existInSaved = state.savedItems.find((x) => x.id === action.payload.id);
      if (
        existInSaved &&
        (existInSaved.stockQuantity || Infinity) >
          state.cart.reduce((acc, item) => (item.id === action.payload.id ? acc + item.qty : acc), 0)
      ) {
        updatedSavedItems = state.savedItems.filter((x) => x.id !== action.payload.id).sort((a, b) =>
          a.id - b.id
        );
        updatedCart = [...state.cart, { ...existInSaved, qty: 1 }].sort((a, b) => a.id - b.id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        localStorage.setItem("savedItems", JSON.stringify(updatedSavedItems));
        return {
          ...state,
          cart: updatedCart,
          savedItems: updatedSavedItems,
          prevState: { ...state, prevState: null },
        };
      }
      return state;

    case "APPLYDISCOUNT":
      localStorage.setItem("discount", action.payload);
      return { ...state, discount: action.payload, prevState: { ...state, prevState: null } };

    case "TOGGLEFAVORITE":
      updatedCart = state.cart
        .map((x) => (x.id === action.payload ? { ...x, isFavorite: !x.isFavorite } : x))
        .sort((a, b) => a.id - b.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart, prevState: { ...state, prevState: null } };

    case "SYNCCART":
      updatedCart = action.payload.sort((a, b) => a.id - b.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case "UNDO":
      if (state.prevState) {
        updatedCart = state.prevState.cart.sort((a, b) => a.id - b.id);
        updatedSavedItems = state.prevState.savedItems.sort((a, b) => a.id - b.id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        localStorage.setItem("savedItems", JSON.stringify(updatedSavedItems));
        localStorage.setItem("discount", state.prevState.discount);
        return { ...state.prevState, prevState: null };
      }
      return state;

    default:
      return state;
  }
};

export default handleCart;