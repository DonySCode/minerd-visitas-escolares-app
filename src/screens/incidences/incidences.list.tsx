import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {DrawerStackParamList} from '../../navigation/MainNavigator';
import {Incidence} from '../../features/incidences/Incidence';
import {useFocusEffect} from '@react-navigation/native';

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

type Props = DrawerScreenProps<DrawerStackParamList, 'ListIncidences'>;

const IncidentListScreen = ({navigation}: Props) => {
  const [incidences, setIncidences] = useState<Incidence[]>([]);

  useFocusEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM incidences', [], (_, results) => {
        let rows = results.rows.raw();
        setIncidences(rows);
      });
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.incidencesContainer}>
        {incidences.map(item => (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('IncidenceDetails', {incidence: item})
            }>
            <Text style={styles.buttonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    height: 40,
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
    textTransform: 'uppercase',
    fontWeight: '900',
    color: '#FFFFFF',
  },
});

export default IncidentListScreen;
