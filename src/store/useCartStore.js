import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (cartItem) =>
    set((state) => ({ cart: [...state.cart, cartItem] })),
  removeItem: (productId) =>
    set((state) => ({
      cart: state.cart.filter(
        (cartItem) => cartItem.product.productId !== productId,
      ),
    })),
  updateItemQuantity: (productId, quantity) => {
    set((state) => ({
      cart: state.cart.map((cartItem) =>
        cartItem.product.productId === productId
          ? { ...cartItem, quantity }
          : cartItem,
      ),
    }));
  },
  updateItemUnit: (productId, unit) => {
    set((state) => ({
      cart: state.cart.map((cartItem) =>
        cartItem.product.productId === productId
          ? {
              ...cartItem,
              unit,
              unitPrice: cartItem.product.productUnits.find(
                (productUnit) => productUnit.unit.unitId === unit.unitId,
              ).sellingPrice,
            }
          : cartItem,
      ),
    }));
  },
  clearCart: () => set({ cart: [] }),
}));
