import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux'; // If you use redux for logout
import {logout} from '../auth/authSlice';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'incidences.db',
    location: 'default',
  },
  () => { },
  error => {
    console.log(error);
  },
);

const CustomDrawerContent = (
  props: DrawerContentComponentProps,
): React.ReactNode => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDeleteAll = () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM incidences', [], () => {
        console.log('All records deleted');
      });
    });
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity onPress={handleDeleteAll} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Borrado de Emergencia</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoutButtonContainer: {
    marginTop: 16,
    rowGap: 20,
    marginHorizontal: 10,
  },
  logoutButton: {
    backgroundColor: '#1d3557',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#d90429',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
