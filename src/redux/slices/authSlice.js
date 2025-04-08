import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { validateUserLogin } from '../../services/authService';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const result = await validateUserLogin(username, password);

      if (result.error) {return rejectWithValue(result.error);}
      if (result.setPass) {return { setPass: true, user: result.user };}
      return { user: result.user };
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

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
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.setPass = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.setPass) {
          state.setPass = true;
          state.user = action.payload.user;
          state.error = null;
        } else {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.error = null;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
