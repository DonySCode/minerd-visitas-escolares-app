import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {VisitsNativeStackParamList} from '../../navigation/visits/VisitsNativeStackNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import MinerdAppInput from '../../ui/MinerdAppInput';
import MinerdAppButton from '../../ui/MinerdAppButton';
import MinerdAppPhotoInput from '../../ui/MinerdAppPhotoInput';
import MinerdAppAudioRecorder from '../../ui/MinerdAppAudioRecorder';
import MinerdAppDatePicker from '../../ui/MinerdAppDatePicker';
import {ScrollView} from 'react-native-gesture-handler';
import {formatDateString} from '../../utils/formatDateString';

type Props = NativeStackScreenProps<VisitsNativeStackParamList, 'NewVisit'>;

const NewVisitScreen = ({navigation}: Props) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const [cedulaDirector, setCedulaDirector] = useState('');
  const [codigoCentro, setCodigoCentro] = useState('');
  const [motivo, setMotivo] = useState('');
  const [fotoEvidencia, setFotoEvidencia] = useState('');
  const [comentario, setComentario] = useState('');
  const [audio, setAudio] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState('');

  const handleSubmit = async () => {
    const url = `https://adamix.net/minerd/minerd/registrar_visita.php?cedula_director=${cedulaDirector}&codigo_centro=${codigoCentro}&motivo=${motivo}&foto_evidencia=${fotoEvidencia}&comentario=${comentario}&nota_voz=${audio}&latitud=${latitud}&longitud=${longitud}&fecha=${formatDateString(
      fecha.toString(),
    )}&hora=${hora}&token=${token}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.exito) {
        Alert.alert('¡Exito!', 'Visita añadida correctamente', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert('¡Error!', 'Fallo al registrar la visita');
      }
    } catch (error) {
      Alert.alert('¡Error!', 'Fallo al registrar la visita');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MinerdAppInput
          color="blue"
          placeholder="Cédula del director"
          value={cedulaDirector}
          setValue={setCedulaDirector}
        />
        <MinerdAppInput
          color="blue"
          placeholder="Código del centro"
          value={codigoCentro}
          setValue={setCodigoCentro}
        />
        <MinerdAppInput
          color="blue"
          placeholder="Motivo"
          value={motivo}
          setValue={setMotivo}
        />
        <MinerdAppInput
          color="blue"
          placeholder="Comentario"
          value={comentario}
          setValue={setComentario}
        />
        <MinerdAppInput
          color="blue"
          placeholder="Latitud"
          value={latitud}
          setValue={setLatitud}
          keyboardType="numeric"
        />
        <MinerdAppInput
          color="blue"
          placeholder="Longitud"
          value={longitud}
          setValue={setLongitud}
          keyboardType="numeric"
        />
        <MinerdAppDatePicker date={fecha} setDate={setFecha} />
        <MinerdAppInput
          color="blue"
          placeholder="Hora"
          value={hora}
          setValue={setHora}
        />
        <MinerdAppPhotoInput
          photo={fotoEvidencia}
          setPhoto={setFotoEvidencia}
        />
        <MinerdAppAudioRecorder audio={audio} setAudio={setAudio} />
        <MinerdAppButton title="Registrar Visita" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

export default NewVisitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
