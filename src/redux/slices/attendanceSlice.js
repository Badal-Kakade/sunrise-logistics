import { createSlice } from '@reduxjs/toolkit';
import { attendance } from '../../data/data';

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: attendance,
  reducers: {},
});

export default attendanceSlice.reducer;
