// userThunks.js
import { fetchAllEmployees } from './firestoreService';
import { setUsers } from '../redux/slices/userSlice';

// Thunk to fetch users from Firebase
export const fetchUsers = () => async (dispatch) => {
  try {
    const users = await fetchAllEmployees();
    dispatch(setUsers(users));
  } catch (error) {
    console.error('Error in fetchUsers thunk:', error);
  }
};
