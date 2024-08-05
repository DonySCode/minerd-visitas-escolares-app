import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Spacer from '../../ui/spacer/Spacer';
import MinerdAppInput from '../../ui/MinerdAppInput';
import MinerdAppButton from '../../ui/MinerdAppButton';

const SchoolByCodeScreen = () => {
  const [code, setCode] = useState('');
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search === '') {
      setFilteredSchools(schools);
    } else {
      const filtered = schools.filter((school: any) =>
        school.nombre.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredSchools(filtered);
    }
  }, [search, schools]);

  const fetchSchoolData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://adamix.net/minerd/minerd/centros.php?regional=${code}`,
      );
      const data = await response.json();
      if (data.exito) {
        if (data.datos.length > 0) {
          setSchools(data.datos);
          setFilteredSchools(data.datos);
        } else {
          Alert.alert('Error', 'No schools found with the provided code');
          setSchools([]);
          setFilteredSchools([]);
        }
      } else {
        Alert.alert('Error', 'Failed to fetch school data');
        setSchools([]);
        setFilteredSchools([]);
      }
    } catch (error) {
      console.error('Error fetching school data:', error);
      Alert.alert('Error', 'Failed to fetch school data');
      setSchools([]);
      setFilteredSchools([]);
    } finally {
      setLoading(false);
    }
  };

  const renderSchoolItem = ({item}: any) => (
    <View style={styles.schoolItem}>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{item.nombre}</Text>
      <Text style={styles.label}>Código:</Text>
      <Text style={styles.value}>{item.codigo}</Text>
      <Text style={styles.label}>Coordenadas:</Text>
      <Text style={styles.value}>{item.coordenadas}</Text>
      <Text style={styles.label}>Distrito:</Text>
      <Text style={styles.value}>{item.distrito}</Text>
      <Text style={styles.label}>Regional:</Text>
      <Text style={styles.value}>{item.regional}</Text>
      <Text style={styles.label}>Dirección Municipal:</Text>
      <Text style={styles.value}>{item.d_dmunicipal}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingrese un codigo regional</Text>
      <MinerdAppInput
        placeholder="Código regional"
        value={code}
        setValue={setCode}
        color="blue"
        keyboardType="numeric"
      />

      <MinerdAppButton title="CONSULTAR" onPress={fetchSchoolData} />
      {loading && (
        <Spacer marginBottom={10}>
          <ActivityIndicator size={40} color={'dodgerblue'} />
        </Spacer>
      )}
      {schools.length > 0 && !loading && (
        <Spacer width="100%" marginVertical={20}>
          <MinerdAppInput
            placeholder="Buscar por nombre"
            value={search}
            setValue={setSearch}
            color="blue"
            keyboardType="numeric"
          />
        </Spacer>
      )}
      {!loading && (
        <FlatList
          data={filteredSchools}
          keyExtractor={(item: any) => item.idx}
          renderItem={renderSchoolItem}
          style={styles.list}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    color: '#000',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    color: '#000',
  },
  loading: {
    marginTop: 20,
    color: '#000',
  },
  list: {
    width: '100%',
  },
  listContainer: {
    paddingBottom: 20,
  },
  schoolItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
  value: {
    marginBottom: 5,
    color: '#000',
  },
});

export default SchoolByCodeScreen;
