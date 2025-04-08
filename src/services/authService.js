import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
 // Your Firebase config file

export const validateUserLogin = async (username, password) => {
  const userRef = collection(db, 'user_credential');
  const q = query(userRef, where('username', '==', username));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty){ return { error: 'User not found' };}

  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data();

  if (userData.password === password) {
    return { user: userData };
  } else if (userData.password === null) {
    return { setPass: true, user: userData };
  } else {
    return { error: 'Invalid username or password' };
  }
};
