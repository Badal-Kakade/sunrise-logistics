import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchAllEmployees } from '../services/firestoreService';
import TableView from '../components/TableView';
import { useSelector } from 'react-redux';
const EmployeeList = () => {
  const allUsers = useSelector(state => state.users); // from Redux
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const headerData = ['User ID', 'First Name', 'Last Name', 'Position', 'City'];

  const handleRowClick = (user_id) => {
    navigation.navigate('Profile', { user_id });
  };


  useEffect(() => {
    const loadData = async () => {
      const usersFromDB = await fetchAllEmployees();
      setFilteredUsers(usersFromDB); // show all initially
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    const lowerSearch = searchText.toLowerCase();
    const filtered = allUsers.filter(user =>
      user.user_id.toLowerCase().includes(lowerSearch) ||
      user.first_name.toLowerCase().includes(lowerSearch) ||
      user.last_name.toLowerCase().includes(lowerSearch)
    );
    setFilteredUsers(filtered);
  }, [searchText, allUsers]);


  // STEP 1: Slice fields for table (clean data for search to work properly)
  const slicedData = filteredUsers.map(user => {
    const { user_id, first_name, last_name, position, city } = user;
    return { user_id, first_name, last_name, position, city };
  });

  // STEP 2: Format user_id to make it clickable
  const formattedData = slicedData.map(user => ({
    ...user,
    user_id: (
      <TouchableOpacity onPress={() => handleRowClick(user.user_id)}>
        <Text style={styles.linkText}>{user.user_id}</Text>
      </TouchableOpacity>
    ),
  }));
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by User ID, First Name, or Last Name"
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />
      <TableView
        data={formattedData}
        headerData={headerData}
        perPageCount={5}
      />
    </View>
  );
};

export default EmployeeList;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10},
  searchInput: { marginHorizontal: 15, marginBottom: 10, padding: 10, backgroundColor: '#f2f2f2', borderRadius: 8, fontSize: 16, borderWidth: 1, borderColor: '#ccc', marginVertical: 5},
  linkText: { color: '#007bff', textDecorationLine: 'underline'},
});
