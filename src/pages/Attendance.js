import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { checkInUser, checkOutUser, fetchAttendance } from '../services/attendanceService';
import { format } from 'date-fns';

const Attendance = () => {
  const user = useSelector((state) => state.auth.user);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  useEffect(() => {
    const checkTodayAttendance = async () => {
      try {
        const attendanceData = await fetchAttendance();
        const todayDate = format(new Date(), 'yyyy-MM-dd');

        const currentUserData = attendanceData.find(item => item.user_id === user.user_id);

        if (currentUserData) {
          const todayLog = currentUserData.logs.find(log => log.date === todayDate);

          if (todayLog) {
            if (todayLog.sign_in && !todayLog.sign_out) {
              // Checked in but not yet checked out
              setIsCheckedIn(true);
              setIsCheckedOut(false);
            } else if (todayLog.sign_in && todayLog.sign_out) {
              // Checked in and checked out already
              setIsCheckedIn(true);
              setIsCheckedOut(true);
            }
          }
        }
      } catch (error) {
        console.error('Error checking attendance:', error);
      }
    };

    checkTodayAttendance();
  });

  const handleCheckIn = async () => {
    try {
      await checkInUser(user.user_id, user.username);
      Alert.alert('Check In', 'Successfully Checked In!');
      setIsCheckedIn(true);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOutUser(user.user_id);
      Alert.alert('Check Out', 'Successfully Checked Out!');
      setIsCheckedOut(true);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Page</Text>

      {!isCheckedIn && (
        <Button title="Check In" onPress={handleCheckIn} />
      )}

      {isCheckedIn && !isCheckedOut && (
        <Button title="Check Out" onPress={handleCheckOut} />
      )}

      {isCheckedIn && isCheckedOut && (
        <Text style={styles.message}>You have already checked in and checked out today.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  message: { fontSize: 18, color: 'green', marginTop: 20 }
});

export default Attendance;
