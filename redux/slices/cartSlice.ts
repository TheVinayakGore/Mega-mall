import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
  color: string[];
  model: string;
  rating: number;
  review: number;
  size: string[];
  reviewDescription: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          description: action.payload.description || "No description available", // ✅ Ensure description is saved
          quantity: action.payload.quantity || 1,
        });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          ); // Remove item if quantity is 0
        }
      }
    },
    // Set the cart items, usually to be called after loading from localStorage
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  setCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
