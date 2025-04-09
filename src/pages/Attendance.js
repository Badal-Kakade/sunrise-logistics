import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkInUser, checkOutUser, fetchAttendance } from '../services/attendanceService';

const Attendance = () => {
  const user = useSelector((state) => state.auth.user);
  const handleCheckIn = async () => {
    try {
      await checkInUser(user.user_id, user.username);
      Alert.alert('Check In', 'Successfully Checked In!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOutUser(user.user_id);
      Alert.alert('Check Out', 'Successfully Checked Out!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Page</Text>
      <Button title="Check In" onPress={handleCheckIn} />
      <View style={{ marginTop: 20 }}>
        <Button title="Check Out" onPress={handleCheckOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default Attendance;
