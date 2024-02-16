"use client";

import { createContext, useEffect, useState } from "react";

export const CartContex = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const setCartToState = () => {
    setCartProducts(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  useEffect(() => {
    setCartToState();
  }, []);

  function addProduct(productId, name, price, photoUrl, quantity = 1) {
    const item = {
      id: productId,
      name: name,
      price: price,
      photoUrl: photoUrl,
      quantity: quantity,
    };

    const isExist = cartProducts.find((product) => product.id === item.id);
    let newProduct;
    if (isExist) {
      cartProducts
        .map((product) => {
          if (product.id === item.id) {
            product.quantity += 1;
          }
        })
        .filter(Boolean);
      newProduct = [...cartProducts];
    } else {
      newProduct = [...cartProducts, item];
    }
    localStorage.setItem("cart", JSON.stringify(newProduct));
    setCartToState();
  }

  const decreseQty = (cartItem) => {
    cartItem.quantity -= 1;
    let newProduct;
    if (cartItem.quantity <= 0) {
      newProduct = cartProducts.filter((product) => product.id != cartItem.id);
    } else {
      newProduct = cartProducts.map((product) =>
        product.id === cartItem.id ? cartItem : product
      );
    }
    localStorage.setItem("cart", JSON.stringify(newProduct));
    setCartToState();
  };
  
  return (
    <CartContex.Provider
      value={{ cartProducts, setCartProducts, addProduct, setCartProducts, decreseQty }}
    >
      {children}
    </CartContex.Provider>
  );
}
