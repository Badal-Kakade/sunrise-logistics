import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import FormModal from '../components/FormModal';
import { updateUser } from '../redux/slices/userSlice';

const ProfilePage = ({ route }) => {
  const dispatch = useDispatch();

  // Safely get user_id from route params (if available)
  const user_id = route?.params?.user_id;
  const loggedInUser = useSelector((state) => state.auth.user);

  // Choose the correct user: from param if passed, otherwise fallback to logged-in user
  const userInfo = useSelector((state) =>
    state.users.find((u) => u.user_id === (user_id || loggedInUser?.user_id))
  );
  const [isModalVisible, setModalVisible] = useState(false);

  const handleUpdateUser = (updatedUser) => {
    dispatch(updateUser(updatedUser));
    console.log('Updated user:', updatedUser);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.profile_sec}>
          <View style={styles.profile_view}>
            <Text  style={styles.name_text}> {userInfo?.first_name} {userInfo?.last_name}</Text>
            <Text style={styles.sub_text}>Position: {userInfo?.position}</Text>
            <Text style={styles.sub_text}>City: {userInfo?.city}</Text>
          </View>
        </View>
        <View>
          <Card style={styles.card}>
            <Card.Content style={styles.cardcontent}>
              <View style={styles.cardview}>
                <View style={styles.txtview}>
                  <Text style={styles.cardtxt}>First Name :</Text>
                  <Text style={styles.cardtxt}>{userInfo?.first_name}</Text>
                </View>
                <View style={styles.txtview}>
                  <Text style={styles.cardtxt}>Last Name :</Text>
                  <Text style={styles.cardtxt}>{userInfo?.last_name}</Text>
                </View>
              </View>
              <View style={styles.cardview}>
                <View style={styles.txtview}>
                  <Text style={styles.cardtxt}>Username :</Text>
                  <Text style={styles.cardtxt}>{userInfo?.username}</Text>
                </View>
                <View style={styles.txtview}>
                  <Text style={styles.cardtxt}>User ID :</Text>
                  <Text style={styles.cardtxt}>{userInfo?.user_id}</Text>
                </View>
              </View>
              <View style={styles.cardview}>
                <View style={styles.txtview}>
                  <Text style={styles.cardtxt}>Position :</Text>
                  <Text style={styles.cardtxt}>{userInfo?.position}</Text>
                </View>
                <View style={styles.txtview}>
                  <Text style={styles.cardtxt}>Work Location :</Text>
                  <Text style={styles.cardtxt}>{userInfo?.city}</Text>
                </View>
              </View>
              <View style={styles.cardview}>
                <View style={styles.txtview}>
                  <Text style={styles.cardtxt}>Contact Number :</Text>
                  <Text style={styles.cardtxt}>{userInfo?.contact_number}</Text>
                </View>
                <View style={styles.txtview}>
                  <Text style={styles.cardtxt}>Email ID :</Text>
                  <Text style={styles.cardtxt}>{userInfo?.email}</Text>
                </View>
              </View>
              <View style={styles.cardview}>
                <View style={styles.txtview}>
                  <Text style={styles.cardtxt}>Address :</Text>
                  <Text style={styles.cardtxt}>{userInfo?.address}</Text>
                </View>
                <View style={styles.txtview}>
                  <Text style={styles.cardtxt}>City :</Text>
                  <Text style={styles.cardtxt}>{userInfo?.city}</Text>
                </View>
              </View>
              <View style={styles.cardview}>
                <View style={styles.txtview}>
                  <Text style={styles.cardtxt}>Pincode No. :</Text>
                  <Text style={styles.cardtxt}>{userInfo?.pincode}</Text>
                </View>
              </View>
              <View style={styles.btnsec}>
              {!route?.params?.user_id && (
                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                  <Text style={styles.btnLabel}>Edit</Text>
                </TouchableOpacity>
              )}
                <FormModal
                  visible={isModalVisible}
                  onClose={() => setModalVisible(false)}
                  data={userInfo}
                  onSave={handleUpdateUser}
                />
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1},
    container :{ flex: 1, justifyContent: 'flex-start', backgroundColor: '#edebeb', gap: 10},
    profile_sec:{width:'100%', backgroundColor:'#d9117e', height: 200, justifyContent: 'flex-end' , alignItems : 'center', borderBottomLeftRadius: 40, borderBottomRightRadius: 40},
    profile_view:{height: 150, backgroundColor: '', padding:10, gap:3},
    name_text:{ fontSize:40, fontWeight:'bold', fontFamily: 'cursive', color:'yellow'},
    sub_text:{fontSize: 20, fontWeight:'600', color:'white'},
    btnsec:{ alignItems:'flex-end'},
    button: { backgroundColor: '#001c3c', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 20, alignItems: 'flex-end', marginEnd:10},
    btnLabel: { color: '#ffffff', fontSize: 16},
    card:{ width:'95%', borderRadius:20, marginHorizontal:'auto'},
    cardcontent:{ alignItems:'flex-start', gap:10},
    cardview:{ flexDirection:'row', justifyContent:'flex-start', alignContent:'center', width:'100%'},
    txtview:{width:'50%'},
    cardtxt:{textAlign:'left', fontSize:20}, marginLeft:10,
});

export default ProfilePage;
