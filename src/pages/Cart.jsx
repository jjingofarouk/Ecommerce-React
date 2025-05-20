// src/pages/Cart.js
import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import {
  addCart,
  delCart,
  updateCartQuantity,
  clearCart,
  saveForLater,
  addBackToCart,
  applyDiscount,
  toggleFavorite,
  syncCart,
  undoCart,
} from "../redux/action";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState("");

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">Your Cart is Empty</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const addItem = (product) => dispatch(addCart(product));
  const removeItem = (product) => dispatch(delCart(product));
  const updateQty = (productId, qty) =>
    dispatch(updateCartQuantity(productId, parseInt(qty)));
  const clearAll = () => dispatch(clearCart());
  const saveItem = (product) => dispatch(saveForLater(product));
  const addBack = (product) => dispatch(addBackToCart(product));
  const toggleFav = (productId) => dispatch(toggleFavorite(productId));
  const syncWithServer = () => dispatch(syncCart(state.cart));
  const undoLast = () => dispatch(undoCart());

  const applyPromo = () => {
    const codes = { UGSAVE10: 0.1, BUYLOCAL: 0.2 };
    if (codes[promoCode]) {
      dispatch(applyDiscount(codes[promoCode]));
      alert("Promo code applied!");
    } else {
      alert("Invalid promo code.");
    }
    setPromoCode("");
  };

  const handleCheckout = () => {
    if (window.confirm("Are you sure you want to proceed to checkout?")) {
      window.location.href = "/checkout";
    }
  };

  const ShowCart = () => {
    let subtotal = 0;
    let totalItems = 0;
    state.cart.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });
    const discount = state.discount || 0;
    const discountedSubtotal = subtotal * (1 - discount);

    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={clearAll}
                    >
                      Clear Cart
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm mx-2"
                      onClick={undoLast}
                      disabled={!state.prevState}
                    >
                      Undo Last Action
                    </button>
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={syncWithServer}
                    >
                      Sync Cart
                    </button>
                  </div>
                  <div className="card-body">
                    {state.cart.map((item) => (
                      <div key={item.id}>
                        <div className="row d-flex align-items-center">
                          <div className="col-lg-3 col-md-12 mb-3 mb-lg-0">
                            <div
                              style={{
                                width: "100%",
                                maxWidth: "120px",
                                height: "auto",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="img-fluid"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </div>
                          <div className="col-lg-5 col-md-6">
                            <p>
                              <strong>{item.name}</strong>
                              {item.isFavorite && (
                                <i className="fas fa-heart text-danger mx-2"></i>
                              )}
                            </p>
                            <small>
                              {item.stockStatus
                                ? `${item.stockStatus === "in-stock" ? "In Stock" : "Low Stock"}`
                                : "Stock unlimited"}
                            </small>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div
                              className="d-flex mb-2"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                                className="btn px-3"
                                onClick={() => removeItem(item)}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <input
                                type="number"
                                className="form-control mx-2 text-center"
                                value={item.qty}
                                onChange={(e) =>
                                  updateQty(item.id, e.target.value)
                                }
                                min="0"
                                style={{ width: "60px" }}
                              />
                              <button
                                className="btn px-3"
                                onClick={() => addItem(item)}
                                disabled={item.stockStatus === "out-of-stock"}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                            <p className="text-start text-md-center">
                              <strong>
                                <span className="text-muted">{item.qty}</span> x{" "}
                                {item.price} {item.currency}
                              </strong>
                            </p>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => saveItem(item)}
                            >
                              Save for Later
                            </button>
                            <button
                              className="btn btn-outline-warning btn-sm mx-2"
                              onClick={() => toggleFav(item.id)}
                            >
                              {item.isFavorite ? "Unfavorite" : "Favorite"}
                            </button>
                          </div>
                        </div>
                        <hr className="my-4" />
                      </div>
                    ))}
                  </div>
                </div>
                {state.savedItems.length > 0 && (
                  <div className="card mb-4">
                    <div className="card-header py-3">
                      <h5 className="mb-0">Saved for Later</h5>
                    </div>
                    <div className="card-body">
                      {state.savedItems.map((item) => (
                        <div
                          key={item.id}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <p>{item.name}</p>
                          <button
                            className="btn btn-outline-dark"
                            onClick={() => addBack(item)}
                          >
                            Move to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="form-control mb-2"
                    />
                    <button
                      className="btn btn-outline-dark mb-3"
                      onClick={applyPromo}
                    >
                      Apply Promo
                    </button>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})
                        <span>{Math.round(subtotal)} {state.cart[0]?.currency || "UGX"}</span>
                      </li>
                      {discount > 0 && (
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                          Discount
                          <span>-{Math.round(subtotal * discount)} {state.cart[0]?.currency || "UGX"}</span>
                        </li>
                      )}
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>{Math.round(discountedSubtotal)} {state.cart[0]?.currency || "UGX"}</strong>
                        </span>
                      </li>
                    </ul>
                    <button
                      className="btn btn-dark btn-lg btn-block"
                      onClick={handleCheckout}
                    >
                      Go to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {state.cart.length > 0 || state.savedItems.length > 0 ? (
          <ShowCart />
        ) : (
          <EmptyCart />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;