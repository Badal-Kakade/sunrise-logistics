import { createSlice } from '@reduxjs/toolkit';
import { users } from '../../data/data';


const userSlice = createSlice({
  name: 'users',
  initialState: users,
  reducers: {
    updateUser: (state, action) => {
      const index = state.findIndex(u => u.user_id === action.payload.user_id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
