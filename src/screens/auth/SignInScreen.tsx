import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthNativeStackParamList} from '../../navigation/AuthNavigator';
import {useDispatch} from 'react-redux';
import {login} from '../../features/auth/authSlice';
import Spacer from '../../ui/spacer/Spacer';
import MinerdAppButton from '../../ui/MinerdAppButton';
import MinerdAppInput from '../../ui/MinerdAppInput';

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
        dispatch(login(data.datos));
      } else {
        Alert.alert('Error', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/img/logo-educacion.webp')}
      />
      <Spacer marginBottom={20} />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <MinerdAppInput
        placeholder="Cédula"
        value={cedula}
        setValue={setCedula}
        keyboardType="numeric"
        color="blue"
      />
      <MinerdAppInput
        placeholder="Clave"
        value={clave}
        setValue={setClave}
        keyboardType="numeric"
        secureTextEntry
        color="blue"
      />
      <MinerdAppButton
        title="Iniciar sesión"
        color="#dc3545"
        onPress={handleLogin}
      />
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
    backgroundColor: 'white',
  },
  logo: {
    width: '80%',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 16,
  },
  linkText: {
    color: '#0066cc',
    fontSize: 15,
    textAlign: 'center',
  },
});
