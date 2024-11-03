import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, User } from "../types";

const CartContext = createContext({
  cart: [],
  addToCart: () => { },
  clearCart: () => { },
  user: null,
  loginUser: () => { },
  logoutUser: () => { }
} as UseCart);

type UseCart = {
  cart: Product[] | [],
  addToCart: (product: Product) => void,
  clearCart: () => void,
  user: User | null,
  loginUser: (userData: User) => void,
  logoutUser: () => void
};

export const useCart: () => UseCart = () => useContext(CartContext);

type CartProvider = {
  children: ReactNode,
}

export const CartProvider = ({ children }: CartProvider) => {
  const [cart, setCart] = useState<Product[] | []>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") as string) || [])
    setUser(JSON.parse(localStorage.getItem("user") as string) || null);
  }, [])

  const addToCart = (product: Product) => {
    setCart((prev: Product[] | []) => {
      if (prev.find((prevItem) => prevItem.id === product.id)) {
        const foundIndex = prev.findIndex(prevItem => prevItem.id == product.id);
        prev[foundIndex] = {...product, pcs: product.pcs ? product?.pcs + 1 : 2};

        return [...prev];
      }
      return [...prev, product]
    });
  };

  const clearCart = () => setCart([]);

  const loginUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, user, loginUser, logoutUser }}>
      {children}
    </CartContext.Provider>
  );
};
