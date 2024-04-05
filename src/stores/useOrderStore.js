import { produce } from "immer";
import { create } from "zustand";

export const useOrderStore = create((set, get) => ({
  cart: [],
  customer: {},
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
    set(
      produce((state) => {
        const cartItem = state.cart.find(
          (cartItem) => cartItem.product.productId === productId,
        );
        cartItem.unit = unit;
        cartItem.product.displayedProductUnit =
          cartItem.product.productUnits.find(
            (productUnit) => productUnit.unit.unitId === unit.unitId,
          );
      }),
    );
  },
  clearCart: () => set({ cart: [] }),
  totalCartPrice: () => {
    const { cart } = get();
    return cart.reduce((total, cartItem) => {
      return total + cartItem.unitPrice * cartItem.quantity;
    }, 0);
  },
  setCustomer: (customer) => set({ customer }),
  clearOrder: () => set({ cart: [], customer: {} }),
}));
