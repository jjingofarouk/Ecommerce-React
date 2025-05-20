// src/actions/cartActions.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const addCart = (product) => {
  return async (dispatch) => {
    dispatch({ type: "ADDITEM", payload: product });
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch(syncCart(updatedCart));
  };
};

export const delCart = (product) => {
  return async (dispatch) => {
    dispatch({ type: "DELITEM", payload: product });
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch(syncCart(updatedCart));
  };
};

export const updateCartQuantity = (productId, qty) => {
  return async (dispatch) => {
    dispatch({ type: "UPDATEQTY", payload: { id: productId, qty } });
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch(syncCart(updatedCart));
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    dispatch({ type: "CLEARCART" });
    const updatedCart = [];
    dispatch(syncCart(updatedCart));
  };
};

export const saveForLater = (product) => {
  return async (dispatch) => {
    dispatch({ type: "SAVEFORLATER", payload: product });
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch(syncCart(updatedCart));
  };
};

export const addBackToCart = (product) => {
  return async (dispatch) => {
    dispatch({ type: "ADDBACKTOCART", payload: product });
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch(syncCart(updatedCart));
  };
};

export const applyDiscount = (discountPercentage) => {
  return async (dispatch) => {
    dispatch({ type: "APPLYDISCOUNT", payload: discountPercentage });
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, "carts", user.uid), { discount: discountPercentage }, { merge: true });
    }
  };
};

export const toggleFavorite = (productId) => {
  return async (dispatch) => {
    dispatch({ type: "TOGGLEFAVORITE", payload: productId });
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch(syncCart(updatedCart));
  };
};

export const syncCart = (cart) => {
  return async (dispatch) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "carts", user.uid), { cart }, { merge: true });
        dispatch({ type: "SYNCCART", payload: cart });
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({ type: "SYNCCART", payload: cart });
      }
    } catch (error) {
      console.error("Sync failed:", error);
    }
  };
};

export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const cartDoc = await getDoc(doc(db, "carts", user.uid));
        let firestoreCart = cartDoc.exists() ? cartDoc.data().cart : [];
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const mergedCart = [...firestoreCart];
        localCart.forEach((localItem) => {
          const existingItem = mergedCart.find((item) => item.id === localItem.id);
          if (existingItem) {
            existingItem.qty = Math.min(
              existingItem.qty + localItem.qty,
              existingItem.stockQuantity || Infinity
            );
          } else if ((localItem.stockQuantity || Infinity) >= localItem.qty) {
            mergedCart.push(localItem);
          }
        });
        await setDoc(doc(db, "carts", user.uid), { cart: mergedCart });
        localStorage.setItem("cart", JSON.stringify(mergedCart));
        dispatch({ type: "SYNCCART", payload: mergedCart });
      } else {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          dispatch({ type: "SYNCCART", payload: JSON.parse(storedCart) });
        }
      }
    } catch (error) {
      console.error("Fetch cart failed:", error);
    }
  };
};

export const undoCart = () => {
  return async (dispatch) => {
    dispatch({ type: "UNDO" });
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch(syncCart(updatedCart));
  };
};