import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const FormModal = ({ visible, onClose, data, onSave }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
      setFormData(data || {});
    }, [data]);

    const handleChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
      onSave(formData);
      onClose();
    };
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Edit Profile</Text>

          <TextInput style={styles.input} value={formData.first_name} placeholder="First Name" onChangeText={(text) => handleChange('first_name', text)} />
          <TextInput style={styles.input} value={formData.last_name} placeholder="Last Name" onChangeText={(text) => handleChange('last_name', text)} />
          <TextInput style={styles.input} value={formData.contact_number} placeholder="Contact Number" keyboardType="phone-pad" onChangeText={(text) => handleChange('contact_number', text)} />
          <TextInput style={styles.input} value={formData.email} placeholder="Email ID" onChangeText={(text) => handleChange('email', text)} />
          <TextInput style={styles.input} value={formData.address} placeholder="Address" onChangeText={(text) => handleChange('address', text)} />
          <TextInput style={styles.input} value={formData.city} placeholder="City" onChangeText={(text) => handleChange('city', text)} />
          <TextInput style={styles.input} value={formData.pincode} placeholder="Pincode" keyboardType="phone-pad" onChangeText={(text) => handleChange('pincode', text)} />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

  );
};

export default FormModal;
const styles = StyleSheet.create({
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: '90%', backgroundColor: '#fff', borderRadius: 20, padding: 20, elevation: 5 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginVertical: 5 },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
    cancelBtn: { backgroundColor: 'gray', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20 },
    saveBtn: { backgroundColor: '#007bff', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20 },
    btnText: { color: 'white', fontWeight: '600' },
  });
