import { collection, getDocs, getDoc, doc, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

// Collection name
const EMPLOYEES_COLLECTION = 'employees';

// 🔍 Get all employees
export const fetchAllEmployees = async () => {
  try {
    const snapshot = await getDocs(collection(db, EMPLOYEES_COLLECTION));
    const employees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return employees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
};

// 🔍 Get single employee by user_id
export const fetchEmployeeByUserId = async (user_id) => {
  try {
    const q = query(collection(db, EMPLOYEES_COLLECTION), where('user_id', '==', user_id));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching employee by user_id:', error);
    return null;
  }
};

// ➕ Add new employee
export const addEmployee = async (employeeData) => {
  try {
    const docRef = await addDoc(collection(db, EMPLOYEES_COLLECTION), employeeData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding employee:', error);
    return null;
  }
};

// ✏️ Update employee
export const updateEmployee = async (docId, updatedData) => {
  try {
    const employeeRef = doc(db, EMPLOYEES_COLLECTION, docId);
    await updateDoc(employeeRef, updatedData);
    return true;
  } catch (error) {
    console.error('Error updating employee:', error);
    return false;
  }
};

// ❌ Delete employee
export const deleteEmployee = async (docId) => {
  try {
    await deleteDoc(doc(db, EMPLOYEES_COLLECTION, docId));
    return true;
  } catch (error) {
    console.error('Error deleting employee:', error);
    return false;
  }
};
