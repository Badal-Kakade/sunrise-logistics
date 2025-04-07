import { createSlice } from '@reduxjs/toolkit';
import { user_credential } from '../../data/data';

const initialState = {
  isAuthenticated: false,
  setPass: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { username, password } = action.payload;
      const user = user_credential.find((u) => u.username === username && u.password === password);
      const usern = user_credential.find((u) => u.username === username && u.password === null);
      if (user) {
        state.isAuthenticated = true;
        state.user = user;
        state.error = null;
      } else if (!user && usern ) {
        state.setPass = true;
      } else {
        state.error = 'Invalid username or password';
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
