import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthNativeStackParamList} from '../../navigation/AuthNavigator';

type Props = NativeStackScreenProps<AuthNativeStackParamList, 'SignUp'>;

const SignUpScreen = ({navigation}: Props) => {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [clave, setClave] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const handleSignUp = async () => {
    try {
      const url = `https://adamix.net/minerd/def/registro.php?cedula=${encodeURIComponent(
        cedula,
      )}&nombre=${encodeURIComponent(nombre)}&apellido=${encodeURIComponent(
        apellido,
      )}&clave=${encodeURIComponent(clave)}&correo=${encodeURIComponent(
        correo,
      )}&telefono=${encodeURIComponent(
        telefono,
      )}&fecha_nacimiento=${encodeURIComponent(fechaNacimiento)}`;

      const response = await fetch(url, {
        method: 'GET',
      });

      const data = await response.json();

      if (data.exito) {
        Alert.alert('Success', 'Registration Successful', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SignIn'),
          },
        ]);
      } else {
        Alert.alert('Error', data.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Técnico</Text>
      <TextInput
        style={styles.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        style={styles.input}
        placeholder="Clave"
        value={clave}
        onChangeText={setClave}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'black',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  signUpButton: {
    backgroundColor: '#e63946',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
