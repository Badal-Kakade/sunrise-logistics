import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { getCurrentLocation } from './locationService';
import { format } from 'date-fns';

const ATTENDANCE_COLLECTION = 'attendance';

export const checkInUser = async (user_id, username) => {
  try {
    const docRef = doc(db, ATTENDANCE_COLLECTION, user_id);
    const docSnap = await getDoc(docRef);
    const now = new Date();
    const time = format(now, 'HH:mm');
    const date = format(now, 'yyyy-MM-dd');
    const location = await getCurrentLocation();

    const newLog = {
      date,
      location,
      sign_in: time,
      sign_out: '',
    };

    if (docSnap.exists()) {
      const data = docSnap.data();
      await updateDoc(docRef, {
        logs: [...data.logs, newLog],
      });
    } else {
      await setDoc(docRef, {
        user_id,
        username,
        logs: [newLog],
      });
    }
  } catch (error) {
    console.error('Error in checkInUser:', error);
  }
};

export const checkOutUser = async (user_id) => {
  try {
    const docRef = doc(db, ATTENDANCE_COLLECTION, user_id);
    const docSnap = await getDoc(docRef);
    const now = new Date();
    const time = format(now, 'HH:mm');

    if (docSnap.exists()) {
      const data = docSnap.data();
      const logs = [...data.logs];
      const latestLog = logs[logs.length - 1];

      if (latestLog && !latestLog.sign_out) {
        latestLog.sign_out = time;
        await updateDoc(docRef, {
          logs,
        });
      }
    }
  } catch (error) {
    console.error('Error in checkOutUser:', error);
  }
};
export const fetchAttendance = async() =>{
  try {
      const snapshot = await getDocs(collection(db, ATTENDANCE_COLLECTION));
      const attendancedata = snapshot.docs.map(doc => ({ user_id: doc.id, ...doc.data() }));
      console.log(attendancedata);
      return attendancedata;
    } catch (error) {
      console.error('Error fetching employees:', error);
      return [];
    }
};
