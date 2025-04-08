import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    // Set all users (bulk replace, typically from Firebase)
    setUsers: (state, action) => {
      return action.payload; // action.payload should be an array of user objects
    },

    updateUser: (state, action) => {
      const index = state.findIndex(u => u.user_id === action.payload.user_id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
  },
});

export const {setUsers, updateUser } = userSlice.actions;
export default userSlice.reducer;
