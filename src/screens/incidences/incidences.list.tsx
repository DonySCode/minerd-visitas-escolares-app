import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {Incidence} from '../../features/incidences/Incidence';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IncidencesNativeStackParamList} from '../../navigation/incidences/IncidencesNativeStackNavigator';

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

type Props = NativeStackScreenProps<
  IncidencesNativeStackParamList,
  'MyIncidences'
>;

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
      <View>
        {incidences.map(item => (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.9}
            key={item.id}
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
    flex: 1,
    padding: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    height: 50,
    width: '100%',
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: '900',
    color: 'black',
  },
});

export default IncidentListScreen;
