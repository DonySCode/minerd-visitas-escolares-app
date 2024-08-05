import {StyleSheet, View, Alert} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthNativeStackParamList} from '../../navigation/AuthNavigator';
import MinerdAppButton from '../../ui/MinerdAppButton';
import MinerdAppInput from '../../ui/MinerdAppInput';

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
      <MinerdAppInput
        color="blue"
        placeholder="Cédula"
        value={cedula}
        setValue={setCedula}
        keyboardType="numeric"
      />
      <MinerdAppInput
        color="blue"
        placeholder="Nombre"
        value={nombre}
        setValue={setNombre}
      />
      <MinerdAppInput
        color="blue"
        placeholder="Apellido"
        value={apellido}
        setValue={setApellido}
      />
      <MinerdAppInput
        color="blue"
        placeholder="Clave"
        value={clave}
        setValue={setClave}
      />
      <MinerdAppInput
        color="blue"
        placeholder="Correo"
        value={correo}
        setValue={setCorreo}
        keyboardType="email-address"
      />
      <MinerdAppInput
        color="blue"
        placeholder="Teléfono"
        value={telefono}
        setValue={setTelefono}
        keyboardType="phone-pad"
      />
      <MinerdAppInput
        color="blue"
        placeholder="Fecha de nacimiento"
        value={fechaNacimiento}
        setValue={setFechaNacimiento}
      />

      <MinerdAppButton title="Registrar" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'black',
    fontWeight: 'bold',
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
