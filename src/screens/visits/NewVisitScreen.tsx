import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Button, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {VisitsNativeStackParamList} from '../../navigation/visits/VisitsNativeStackNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

type Props = NativeStackScreenProps<VisitsNativeStackParamList, 'NewVisit'>;

const NewVisitScreen = ({navigation}: Props) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const [cedulaDirector, setCedulaDirector] = useState('');
  const [codigoCentro, setCodigoCentro] = useState('');
  const [motivo, setMotivo] = useState('');
  const [fotoEvidencia, setFotoEvidencia] = useState('');
  const [comentario, setComentario] = useState('');
  const [notaVoz, setNotaVoz] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const handleSubmit = async () => {
    const url = `https://adamix.net/minerd/minerd/registrar_visita.php?cedula_director=${cedulaDirector}&codigo_centro=${codigoCentro}&motivo=${motivo}&foto_evidencia=${fotoEvidencia}&comentario=${comentario}&nota_voz=${notaVoz}&latitud=${latitud}&longitud=${longitud}&fecha=${fecha}&hora=${hora}&token=${token}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.exito) {
        Alert.alert('Success', 'Visit registered successfully', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert('Error', 'Error registering visit');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to register visit');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Cedula Director"
        placeholderTextColor="#000"
        value={cedulaDirector}
        onChangeText={setCedulaDirector}
      />
      <TextInput
        style={styles.input}
        placeholder="Codigo Centro"
        placeholderTextColor="#000"
        value={codigoCentro}
        onChangeText={setCodigoCentro}
      />
      <TextInput
        style={styles.input}
        placeholder="Motivo"
        placeholderTextColor="#000"
        value={motivo}
        onChangeText={setMotivo}
      />
      <TextInput
        style={styles.input}
        placeholder="Foto Evidencia"
        placeholderTextColor="#000"
        value={fotoEvidencia}
        onChangeText={setFotoEvidencia}
      />
      <TextInput
        style={styles.input}
        placeholder="Comentario"
        placeholderTextColor="#000"
        value={comentario}
        onChangeText={setComentario}
      />
      <TextInput
        style={styles.input}
        placeholder="Nota Voz"
        placeholderTextColor="#000"
        value={notaVoz}
        onChangeText={setNotaVoz}
      />
      <TextInput
        style={styles.input}
        placeholder="Latitud"
        placeholderTextColor="#000"
        value={latitud}
        onChangeText={setLatitud}
      />
      <TextInput
        style={styles.input}
        placeholder="Longitud"
        placeholderTextColor="#000"
        value={longitud}
        onChangeText={setLongitud}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha"
        placeholderTextColor="#000"
        value={fecha}
        onChangeText={setFecha}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora"
        placeholderTextColor="#000"
        value={hora}
        onChangeText={setHora}
      />
      <Button title="Registrar Visita" onPress={handleSubmit} color="#000" />
    </View>
  );
};

export default NewVisitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
    color: '#000',
  },
});
