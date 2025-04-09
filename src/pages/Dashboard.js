import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import TableView from '../components/TableView';
import ButtonTile from '../components/ButtonTile';
import { fetchAttendData, fetchUsers } from '../services/userThunks';

const Dashboard = ({ navigation }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userInfo = useSelector((state) => state.users.find((u) => u.user_id === user?.user_id));
  const attendanceLogs = useSelector((state) => state.attendance.find((a) => a.user_id === user?.user_id)?.logs || []);
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAttendData());
  }, [dispatch]);
  useEffect(()=>{
    console.log(attendanceLogs);
  });
  const handleLogout = () =>{
    dispatch(logout());
    navigation.navigate('Login');
  };
  const handleProfile = () =>{
    navigation.navigate('Profile');
  };
  const handleAttend = () =>{
    navigation.navigate('Attendance');
  };
  const handleEmpList = () =>{
    navigation.navigate('EmployeeList');
  };
  const attendanceHeader = ['Date', 'Location', 'Check In' , 'Check Out' ];
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.profile_sec}>
          <View style={styles.profile_view}>
            <Text style={styles.welcome_txt}>Welcome, <Text style={styles.name_text}> {userInfo?.first_name} {userInfo?.last_name}</Text> </Text>
            <Text style={styles.sub_text}>Position: {userInfo?.position}</Text>
            <Text style={styles.sub_text}>City: {userInfo?.city}</Text>
          </View>
        </View>
        <View style={styles.btn_view}>
          <ButtonTile handleClick = {handleAttend} btn_label={'Attendance'} />
          <ButtonTile handleClick = {handleProfile} btn_label={'View Profile'} />
          {(userInfo?.position === 'Manager' || userInfo?.position === 'Supervisor' ) && <ButtonTile handleClick = {handleEmpList} btn_label={'Employee List'} />}
          {userInfo?.position === 'Manager'  && <ButtonTile handleClick = {handleEmpList} btn_label={'Supervisor List'} />}
        </View>
        <View style={styles.atte_view}>
        <Text style={{fontSize: 20, fontWeight:'600'}}>Attendance:</Text>
        {/* <TableView data = {attendanceLogs} headerData={attendanceHeader} perPageCount="5" /> */}
        </View>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1},
    container :{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#edebeb', gap: 10},
    btn_view: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 10 },
    profile_sec:{width:'100%', backgroundColor:'#d9117e', height: 220, justifyContent: 'flex-end' , alignItems : 'center', borderBottomLeftRadius: 40, borderBottomRightRadius: 40},
    profile_view:{height: 150, backgroundColor: '', padding:10, gap:3},
    welcome_txt:{ fontSize:25, fontWeight:'600', color:'white' },
    name_text:{ fontSize:40, fontWeight:'bold', fontFamily: 'cursive', color:'yellow'},
    sub_text:{fontSize: 20, fontWeight:'600', color:'white'},
    atte_view:{ height: 550, alignContent:'center', justifyContent:'flex-start'},
});

export default Dashboard;
