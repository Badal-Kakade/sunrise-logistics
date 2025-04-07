import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import attendanceReducer from './slices/attendanceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    attendance: attendanceReducer,
  },
});

export default store;
