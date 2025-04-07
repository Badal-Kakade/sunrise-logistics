import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-paper';

const ButtonTile = ({handleClick, btn_label}) => {
  return (
      <TouchableOpacity style={styles.tile_btn} onPress={handleClick}>
          <Icon name="person-outline" size={30} color="#333" />
          <Text style={styles.btn_text}>{btn_label}</Text>
        </TouchableOpacity>
  );
};

export default ButtonTile;
const styles = StyleSheet.create({
    tile_btn: { width: '45%', height: 100, backgroundColor: '#001c3c', marginBottom: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 20, padding: 10, elevation: 4, // Android shadow
      shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 2, marginHorizontal:5 },
    btn_text: { marginTop: 8, fontSize: 20, fontWeight: '600', color: '#fff' },
});
