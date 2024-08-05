import React from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerStackParamList} from '../../navigation/MainNavigator';

type Props = DrawerScreenProps<DrawerStackParamList, 'Home'>;

const HomeScreen = ({}: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Descripción de la Aplicación para Técnicos del MINERD
      </Text>
      <Text style={styles.paragraph}>
        Esta aplicación está destinada a técnicos del MINERD para su uso durante
        visitas a las escuelas. Permite registrar y gestionar incidencias y
        vivencias de una manera segura y organizada.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    lineHeight: 22,
  },
});

export default HomeScreen;
