import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import Attendance from '../pages/Attendance';
import SetPassword from '../pages/SetPassword';
import EmployeeList from '../pages/EmployeeList';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="EmployeeList">
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="SetPassword" component={SetPassword} />
      <Stack.Screen name="EmployeeList" component={EmployeeList} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
