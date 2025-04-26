// userThunks.js
import { fetchAllEmployees } from './firestoreService';
import { setUsers } from '../redux/slices/userSlice';
import { fetchAttendance } from './attendanceService';
import { setAttendance } from '../redux/slices/attendanceSlice';

// Thunk to fetch users from Firebase
export const fetchUsers = () => async (dispatch) => {
  try {
    const users = await fetchAllEmployees();
    dispatch(setUsers(users));
  } catch (error) {
    console.error('Error in fetchUsers thunk:', error);
  }
};


export const fetchAttendData = () => async (dispatch) =>{
  try{
    const attendData = await fetchAttendance();
    dispatch(setAttendance(attendData));
  } catch (error){
    console.log('Error in fetchAttendData thunk:', error);
  }
}
