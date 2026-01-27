import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addItem(item) {
    setCart(prev => {
      const existing = prev.find(p => p.name === item.name);

      if(existing) {
        return prev.map(p => p.name === item.name ? {...p, quantity: p.quantity + 1} : p
      );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function increaseQuantity(name) {
    setCart((prev) =>
      prev.map((item) =>
      item.name === name ? {...item, quantity: item.quantity + 1 } : item )
  );
  }

  function decreaseQuantity(name) {
    setCart((prev) =>
    prev.map((item) =>
    item.name === name ? {...item, quantity: item.quantity - 1} : item)
    .filter((item) => item.quantity > 0)
  );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addItem, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
