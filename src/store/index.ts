import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import categoryReducer from '@/store/slices/categorySlice';
import { cacheReducer } from '@/store/slices/cacheSlice';
import { categoryApi } from '@/store/services/categories';

const rootReducers = combineReducers({
  categories: categoryReducer,
  cache: cacheReducer,
  [categoryApi.reducerPath]: categoryApi.reducer
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['HYDRATE']
      }
    }).concat(categoryApi.middleware),
  // Optional: Add middleware or configure devtools
  devTools: process.env.NODE_ENV !== 'production'
});

// Type definitions for Redux store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for typed useDispatch and useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
