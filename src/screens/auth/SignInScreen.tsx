import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthNativeStackParamList} from '../../navigation/AuthNavigator';
import {useDispatch} from 'react-redux';
import {login, setToken} from '../../features/auth/authSlice';
import Spacer from '../../ui/spacer/Spacer';

type Props = NativeStackScreenProps<AuthNativeStackParamList, 'SignIn'>;

const SignInScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();

  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');

  const handleLogin = async () => {
    try {
      const url = `https://adamix.net/minerd/def/iniciar_sesion.php?cedula=${encodeURIComponent(
        cedula,
      )}&clave=${encodeURIComponent(clave)}`;

      const response = await fetch(url);

      const data = await response.json();

      if (data.exito) {
        dispatch(setToken(data.datos.token));
        dispatch(login());
      } else {
        Alert.alert('Error', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Clave"
        value={clave}
        onChangeText={setClave}
        secureTextEntry
      />
      <Spacer marginTop={20}>
        <Button title="Iniciar" onPress={handleLogin} />
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.link}>
          <Text style={styles.linkText}>Reiniciar contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.link}>
          <Text style={styles.linkText}>No tienes una cuenta? Regístrate</Text>
        </TouchableOpacity>
      </Spacer>
    </View>
  );
};

export default SignInScreen;

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
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  link: {
    marginTop: 16,
  },
  linkText: {
    color: '#0066cc',
    fontSize: 14,
    textAlign: 'center',
  },
});
