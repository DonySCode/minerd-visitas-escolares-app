import React from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import Sound from 'react-native-sound';
import Spacer from '../../ui/spacer/Spacer';
import {ScrollView} from 'react-native-gesture-handler';
import MinerdAppButton from '../../ui/MinerdAppButton';

const IncidentDetailsScreen = ({route}: {route: any}) => {
  const {incidence} = route.params;

  const playAudio = (audioUri: string) => {
    const sound = new Sound(audioUri, undefined, error => {
      if (error) {
        console.log('Error al cargar el audio', error);
        Alert.alert('Error', 'No se pudo cargar el audio.');
        return;
      }
      sound.play(success => {
        if (success) {
          console.log('Reproducción completa');
        } else {
          console.log('Error al reproducir el audio');
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <Spacer marginBottom={20}>
        <Text style={styles.title}>{incidence.title}</Text>
      </Spacer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer marginBottom={10}>
          <Text style={styles.textHeader}>Descripcion</Text>
          <Text style={styles.text}>{incidence.description}</Text>
        </Spacer>
        <Spacer marginBottom={10}>
          <Text style={styles.textHeader}>Centro Educativo</Text>
          <Text style={styles.text}>{incidence.school}</Text>
        </Spacer>
        <Spacer marginBottom={10}>
          <Text style={styles.textHeader}>Regional</Text>
          <Text style={styles.text}>{incidence.regional}</Text>
        </Spacer>
        <Spacer marginBottom={10}>
          <Text style={styles.textHeader}>Distrito</Text>
          <Text style={styles.text}>{incidence.district}</Text>
        </Spacer>
        <Spacer marginBottom={10}>
          <Text style={styles.textHeader}>Fecha</Text>
          <Text style={styles.text}>{incidence.date}</Text>
        </Spacer>
        {incidence.photo && (
          <Spacer marginVertical={15}>
            <Image source={{uri: incidence.photo}} style={styles.image} />
          </Spacer>
        )}
        {incidence.audio && (
          <Spacer marginVertical={10}>
            <MinerdAppButton
              title="Reproducir Audio"
              onPress={() => playAudio(incidence.audio)}
            />
          </Spacer>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textHeader: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 5,
    height: 40,
    width: 300,
    shadowColor: '#FFFFFF',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 20,
    color: '#FFFFFF',
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '900',
  },
});

export default IncidentDetailsScreen;
