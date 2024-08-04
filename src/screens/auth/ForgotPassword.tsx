import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthNativeStackParamList} from '../../navigation/AuthNavigator';
import MinerdAppButton from '../../ui/MinerdAppButton';
import MinerdAppInput from '../../ui/MinerdAppInput';

type Props = NativeStackScreenProps<AuthNativeStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = ({navigation}: Props) => {
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');

  const handleResetPassword = async () => {
    try {
      const url = `https://adamix.net/minerd/def/recuperar_clave.php?cedula=${encodeURIComponent(
        cedula,
      )}&correo=${encodeURIComponent(correo)}`;

      const response = await fetch(url);

      const data = await response.json();

      if (data.exito) {
        Alert.alert('Éxito', `${data.mensaje}`, [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SignIn'),
          },
        ]);
      } else {
        Alert.alert('Error', data.message || 'Failed to send reset link');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reiniciar contraseña</Text>

      <MinerdAppInput
        color="blue"
        placeholder="Cédula"
        value={cedula}
        setValue={setCedula}
      />
      <MinerdAppInput
        color="blue"
        placeholder="Correo"
        value={correo}
        setValue={setCorreo}
      />
      <MinerdAppButton title="Reiniciar" onPress={handleResetPassword} />
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
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
});
