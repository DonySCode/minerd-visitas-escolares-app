import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';

const IncidentDetailsScreen = ({ route }: { route: any }) => {
  const { incidence } = route.params;

  const playAudio = (audioUri: string) => {
    const sound = new Sound(audioUri, undefined, (error) => {
      if (error) {
        console.log('Error al cargar el audio', error);
        Alert.alert('Error', 'No se pudo cargar el audio.');
        return;
      }
      sound.play((success) => {
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
      <Text style={styles.title}>{incidence.title}</Text>
      <Text>Descripcion: {incidence.description}</Text>
      <Text>Centro Educativo: {incidence.school}</Text>
      <Text>Regional: {incidence.regional}</Text>
      <Text>Distrito: {incidence.district}</Text>
      <Text>Fecha: {incidence.date}</Text>
      {incidence.photo && <Image source={{ uri: incidence.photo }} style={styles.image} />}
      {incidence.audio && (
        <TouchableOpacity style={styles.button} onPress={() => playAudio(incidence.audio)}>
          <Text style={styles.buttonText}>Reproducir Audio</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 12,
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
    fontWeight: '900'
  },
});

export default IncidentDetailsScreen;
