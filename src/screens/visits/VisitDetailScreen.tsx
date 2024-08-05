import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {VisitsNativeStackParamList} from '../../navigation/visits/VisitsNativeStackNavigator';

type Props = NativeStackScreenProps<VisitsNativeStackParamList, 'VisitDetails'>;

const VisitDetailScreen = ({route}: Props) => {
  const visit = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.row}>
          <Text style={styles.label}>Cédula Director:</Text>
          <Text style={styles.value}>{visit.cedula_director}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Código Centro:</Text>
          <Text style={styles.value}>{visit.codigo_centro}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Motivo:</Text>
          <Text style={styles.value}>{visit.motivo}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Latitud:</Text>
          <Text style={styles.value}>{visit.latitud}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Longitud:</Text>
          <Text style={styles.value}>{visit.longitud}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{visit.fecha}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Hora:</Text>
          <Text style={styles.value}>{visit.hora}</Text>
        </View>
      </View>
    </View>
  );
};

export default VisitDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    width: 120,
    fontSize: 16,
  },
  value: {
    color: '#333',
    fontSize: 18,
  },
});
