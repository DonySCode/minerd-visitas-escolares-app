import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {VisitsNativeStackParamList} from '../../navigation/visits/VisitsNaviteStackNavigator';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {RootState} from '../../store/store';
import Spacer from '../../ui/spacer/Spacer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Visit} from '../../features/visits/Visit';

type Props = NativeStackScreenProps<VisitsNativeStackParamList, 'MyVisits'>;

const MyVisitsScreen = ({navigation}: Props) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchVisits = async () => {
        try {
          const response = await fetch(
            `https://adamix.net/minerd/def/situaciones.php?token=${token}`,
          );
          const data = await response.json();
          if (data.exito) {
            setVisits(data.datos);
          } else {
            Alert.alert('Error', data.mensaje || 'Failed to fetch visits');
          }
        } catch (error) {
          console.error('Error fetching visits:', error);
          Alert.alert('Error', 'Failed to fetch visits');
        } finally {
          setLoading(false);
        }
      };

      fetchVisits();
    }, [token]),
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={visits}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.navigate('VisitDetails', item)}>
            <Spacer marginBottom={12}>
              <View style={styles.item}>
                <View style={styles.row}>
                  <Text style={styles.label}>Cédula Director:</Text>
                  <Text style={styles.value}>{item.cedula_director}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Código Centro:</Text>
                  <Text style={styles.value}>{item.codigo_centro}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Fecha:</Text>
                  <Text style={styles.value}>{item.fecha}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Hora:</Text>
                  <Text style={styles.value}>{item.hora}</Text>
                </View>
              </View>
            </Spacer>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    width: 120,
  },
  value: {
    color: '#333',
    flex: 1,
  },
  text: {
    color: '#000',
  },
});

export default MyVisitsScreen;
