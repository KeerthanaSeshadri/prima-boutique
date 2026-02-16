import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      console.log("Loaded Cart:", savedCart);
      setCart(savedCart);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    console.log("Adding to cart:", product.name);

    const existing = cart.find(item => item._id === product._id);

    if (existing) {
      if (existing.quantity < product.stock) {
        setCart(
          cart.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        alert("Cannot add more than available stock");
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const increaseQty = (id) => {
    setCart(
      cart.map(item =>
        item._id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map(item =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,          // ✅ VERY IMPORTANT FIX
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
