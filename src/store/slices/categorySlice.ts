import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '@/types/category'; // Adjust the import path as necessary

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    // ...other reducers
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;