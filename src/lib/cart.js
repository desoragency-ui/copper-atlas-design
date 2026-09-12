'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const KEY = 'copper-atlas-cart-v1';
const CartCtx = createContext(null);

const lineId = (slug, finish, size) => `${slug}::${finish}::${size ?? 'one'}`;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  // localStorage can throw in private windows / blocked-storage contexts.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* start empty */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* not fatal — cart just won't survive a reload */
    }
  }, [items, ready]);

  const add = useCallback((line) => {
    const id = lineId(line.slug, line.finish, line.size);
    setItems((prev) => {
      const hit = prev.find((l) => l.id === id);
      if (hit) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + (line.qty || 1) } : l));
      return [...prev, { ...line, id, qty: line.qty || 1 }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((id, qty) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))
    );
  }, []);

  const remove = useCallback((id) => setItems((prev) => prev.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((n, l) => n + l.qty, 0);
    // Quote-only lines carry price: null and are excluded from the subtotal.
    const subtotal = items.reduce((n, l) => n + (l.price ?? 0) * l.qty, 0);
    const hasQuoteOnly = items.some((l) => l.price == null);
    return { items, count, subtotal, hasQuoteOnly, ready, open, setOpen, add, setQty, remove, clear };
  }, [items, ready, open, add, setQty, remove, clear]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
