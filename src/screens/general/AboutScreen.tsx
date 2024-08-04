import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const AboutScreen = () => {
  const user = useSelector((state: RootState) => state.auth);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.userInfo}>
          <Text style={styles.userInfoTitle}>Nombre: </Text>
          {user.nombre} {user.apellido}
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userInfoTitle}>Email: </Text>
          {user.correo}
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userInfoTitle}>Teléfono: </Text>
          {user.telefono}
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userInfoTitle}>Fecha de nacimiento: </Text>
          {user.fecha_nacimiento}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
  },
  userInfo: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  userInfoTitle: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default AboutScreen;
