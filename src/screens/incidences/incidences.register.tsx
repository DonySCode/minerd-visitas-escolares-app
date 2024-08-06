import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {IncidencesNativeStackParamList} from '../../navigation/incidences/IncidencesNativeStackNavigator';
import MinerdAppInput from '../../ui/MinerdAppInput';
import MinerdAppPhotoInput from '../../ui/MinerdAppPhotoInput';
import MinerdAppAudioRecorder from '../../ui/MinerdAppAudioRecorder';
import MinerdAppButton from '../../ui/MinerdAppButton';
import MinerdAppDatePicker from '../../ui/MinerdAppDatePicker';
import {ScrollView} from 'react-native-gesture-handler';

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

type Props = DrawerScreenProps<
  IncidencesNativeStackParamList,
  'RegisterIncidence'
>;

function RegisterIncidentScreen({navigation}: Props) {
  const [title, setTitle] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [regional, setRegional] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState<string>('');
  const [photo, setPhoto] = useState('');
  const [audio, setAudio] = useState('');

  const handleSave = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO incidences (title, school, regional, district, date, description, photo, audio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, school, regional, district, date, description, photo, audio],
        () => {
          console.log('Record added successfully');
        },
        error => {
          console.log('Error: ', error);
        },
      );
    });
    navigation.navigate('MyIncidences');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MinerdAppInput
          color="blue"
          placeholder="Título"
          value={title}
          setValue={setTitle}
        />
        <MinerdAppInput
          color="blue"
          placeholder="Centro Educativo"
          value={school}
          setValue={setSchool}
        />
        <MinerdAppInput
          color="blue"
          placeholder="Número de Regional"
          value={regional}
          setValue={setRegional}
        />
        <MinerdAppInput
          color="blue"
          placeholder="Número de Distrito"
          value={district}
          setValue={setDistrict}
        />
        <MinerdAppInput
          color="blue"
          placeholder="Descripción"
          value={description}
          setValue={setDescription}
        />
        <MinerdAppDatePicker date={date} setDate={setDate} />
        <MinerdAppPhotoInput photo={photo} setPhoto={setPhoto} />
        <MinerdAppAudioRecorder audio={audio} setAudio={setAudio} />
        <MinerdAppButton title="Guardar" onPress={handleSave} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
