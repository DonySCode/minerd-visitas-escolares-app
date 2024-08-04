import React, {useState} from 'react';
import RNFS from 'react-native-fs';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {launchCamera, Asset} from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import SQLite from 'react-native-sqlite-storage';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerStackParamList} from '../../navigation/MainNavigator';

const db = SQLite.openDatabase(
  {
    name: 'incidences.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

const audioRecorderPlayer = new AudioRecorderPlayer();

type Props = DrawerScreenProps<DrawerStackParamList, 'RegisterIncidence'>;

function RegisterIncidentScreen({navigation}: Props) {
  const [title, setTitle] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [regional, setRegional] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [photo, setPhoto] = useState<Asset | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const handleSave = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO incidences (title, school, regional, district, date, description, photo, audio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          title,
          school,
          regional,
          district,
          date,
          description,
          photo?.uri,
          audioUri,
        ],
        () => {
          console.log('Record added successfully');
        },
        error => {
          console.log('Error: ', error);
        },
      );
    });
    navigation.navigate('ListIncidences');
  };

  const takePhoto = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const startRecording = async () => {
    try {
      const path = `${RNFS.DocumentDirectoryPath}/${title}.mp4`;
      const uri = await audioRecorderPlayer.startRecorder(path);
      setAudioUri(uri);
      setIsRecording(true);

      audioRecorderPlayer.addRecordBackListener((e: any) => {
        console.log('Recording: ', e);
        return;
      });
      console.log('Grabación iniciada');
    } catch (error) {
      console.error('Error al iniciar la grabación', error);
      Alert.alert('Error', 'No se pudo iniciar la grabación.');
    }
  };

  const stopRecording = async () => {
    if (isRecording) {
      try {
        await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setIsRecording(false);
        console.log('Grabación detenida');
      } catch (error) {
        console.error('Error al detener la grabación', error);
        Alert.alert('Error', 'No se pudo detener la grabación.');
      }
    } else {
      console.log('No hay grabación en curso para detener.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.textField}
          placeholder="Escriba el título"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.textField}
          placeholder="Escriba el centro educativo"
          value={school}
          onChangeText={setSchool}
        />
        <TextInput
          style={styles.textField}
          placeholder="Escriba el numero de regional"
          value={regional}
          onChangeText={setRegional}
        />
        <TextInput
          style={styles.textField}
          placeholder="Escriba el numero de distrito"
          value={district}
          onChangeText={setDistrict}
        />
        <TextInput
          style={styles.textField}
          placeholder="Escriba la fecha"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.textField}
          placeholder="Escriba la descripción"
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Tomar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={isRecording ? stopRecording : startRecording}>
          <Text style={styles.buttonText}>
            {isRecording ? 'Detener Grabación' : 'Grabar Audio'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#abc2c2',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    height: 79,
    width: 300,
    shadowColor: '#FFFFFF',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 20,
    backgroundColor: '#008CBA',
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '900',
    color: '#FFFFFF',
  },
  Image: {
    height: 150,
    marginBottom: 10,
  },
  textField: {
    margin: 5,
    width: 300,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingLeft: 10,
    fontFamily: 'Roboto',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '900',
  },
});

export default RegisterIncidentScreen;
