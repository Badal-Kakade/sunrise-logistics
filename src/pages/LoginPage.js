import React, { useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';

const LoginPage = ({ navigation }) => {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(login({ username, password }));
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigation.navigate('Dashboard');
    }
  }, [auth.isAuthenticated, navigation]);
  const handleSetPassword = () => {
    navigation.navigate('SetPassword');
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
      <Card style={styles.card}>
        <Card.Content>
        <View>
          <Image source={require('../../assets/CompImg.png')} style={styles.logo} />
        </View>
          <Text style={styles.text}>Login</Text>
          <View style={styles.inputContainer}>
            <TextInput
            style={styles.txtbox}
              label="Username"
              value={username}
              mode="outlined" // Fixed incorrect mode
              onChangeText={setUsername}
            />
            <TextInput
            style={styles.txtbox}
              label="Password"
              value={password}
              mode="outlined" // Fixed incorrect mode
              secureTextEntry // Hides password input
              onChangeText={setPassword}
            />
          </View>
          {auth.setPass && auth.error !== null ? <TouchableOpacity style={styles.button} onPress={handleSetPassword}>
            <Text style={styles.btnLabel}>Set Password</Text>
          </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.btnLabel}>Login</Text>
          </TouchableOpacity>}
            {auth.error && <Text style={styles.error}>{auth.error}</Text>}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9117e',
    paddingTop: StatusBar.currentHeight || 0,
  },
  logo: {
    width: 250, // Adjust size
    height: 100,
    resizeMode: 'contain', // Ensure it fits properly
  },
  card: {
    width: '80%',
    padding: 20,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop:'10%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  inputContainer: {
    gap: 15, // Adds spacing between input fields (Works in React Native 0.71+)
    marginBottom: 20, // Space before button
  },
  txtbox:{
    fontSize:16,
  },
  button: {
    backgroundColor: '#001c3c',
    borderRadius: 10, paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  btnLabel: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default LoginPage;
