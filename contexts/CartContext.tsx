"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { CartItem } from "@/types";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, color: string, size: string) => void;
  updateQty: (productId: string, color: string, size: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "naty-cart";

function itemKey(productId: string, color: string, size: string) {
  return `${productId}__${color}__${size}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  function addItem(item: CartItem) {
    setItems((prev) => {
      const key = itemKey(item.productId, item.color, item.size);
      const exists = prev.find(
        (i) => itemKey(i.productId, i.color, i.size) === key
      );
      if (exists) {
        return prev.map((i) =>
          itemKey(i.productId, i.color, i.size) === key
            ? { ...i, qty: i.qty + item.qty }
            : i
        );
      }
      return [...prev, item];
    });
  }

  function removeItem(productId: string, color: string, size: string) {
    const key = itemKey(productId, color, size);
    setItems((prev) =>
      prev.filter((i) => itemKey(i.productId, i.color, i.size) !== key)
    );
  }

  function updateQty(productId: string, color: string, size: string, qty: number) {
    if (qty <= 0) {
      removeItem(productId, color, size);
      return;
    }
    const key = itemKey(productId, color, size);
    setItems((prev) =>
      prev.map((i) =>
        itemKey(i.productId, i.color, i.size) === key ? { ...i, qty } : i
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}
