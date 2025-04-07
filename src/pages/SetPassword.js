import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Card, TextInput } from 'react-native-paper';

const SetPassword = () => {
      const [password, setPassword] = useState('');
      const [confirmPass, setConfirmPass] = useState('');
      const handleChange = () => {
        //   dispatch(login({ username, password }));
        //   if (auth.isAuthenticated) {
        //     navigation.navigate('Dashboard');
        //   }
        };
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.text}>Login</Text>
          <View style={styles.inputContainer}>
            <TextInput
            style={styles.txtbox}
              label="Password"
              value={password}
              mode="outlined" // Fixed incorrect mode
              onChangeText={setPassword}
            />
            <TextInput
            style={styles.txtbox}
              label="Confirm Password"
              value={confirmPass}
              mode="outlined" // Fixed incorrect mode
              secureTextEntry // Hides password input
              onChangeText={setConfirmPass}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleChange}>
            <Text style={styles.btnLabel}>Set Password</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1,
    // justifyContent: 'center',
    alignItems: 'center', backgroundColor: '#d9117e'},
  card: { width: '80%', padding: 20, elevation: 4, borderRadius: 8, backgroundColor: 'white', marginTop:'10%'},
  text: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15},
  inputContainer: { gap: 15, // Adds spacing between input fields (Works in React Native 0.71+)
    marginBottom: 20, // Space before button
  },
  txtbox:{ fontSize:16, },
  button: { backgroundColor: '#001c3c', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 20, alignItems: 'center'},
  btnLabel: { color: '#ffffff', fontSize: 16},
});
export default SetPassword;
