import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Property } from '../types';

// Define the type for the cart state
interface CartState {
  items: Property[];
}

// Initialize state from localStorage or default to an empty array
const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Property>) => {
      state.items.push(action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items)); // Update localStorage
    },
    removeFromCart: (state, action: PayloadAction<Property>) => {
      state.items = state.items.filter(item => item.title !== action.payload.title);
      localStorage.setItem('cartItems', JSON.stringify(state.items)); // Update localStorage
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems'); // Clear localStorage
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
