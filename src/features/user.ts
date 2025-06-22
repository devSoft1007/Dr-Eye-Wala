import { createSlice } from '@reduxjs/toolkit';
import { UserSliceInitialState } from './types/user.type';

const initialState: UserSliceInitialState = {
  id: 'userManagement',
  isAuth: false,
  isLoading: false,
  error: null,
  user: {
    id: 1
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    }
  }
});

export const { login, logout } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
