import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {RootState} from '../../store/store';
import {Visit} from '../../features/visits/Visit';
import {logout} from '../../features/auth/authSlice';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {DrawerStackParamList} from '../../navigation/MainNavigator';

type Props = NativeStackScreenProps<DrawerStackParamList, 'VisitsMap'>;

const MyVisitsMapScreen = ({}: Props) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  const [_, setVisits] = useState<Visit[]>([]);
  const [region, setRegion] = useState<any>(null);
  const [markers, setMarkers] = useState([]);
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
            const fetchedMarkers = data.datos.map(
              (visit: Visit, index: number) => ({
                coordinate: {
                  latitude: parseFloat(visit.latitud),
                  longitude: parseFloat(visit.longitud),
                },
                title: `Visita en centro: ${visit.codigo_centro}`,
                description: `Motivo: ${visit.motivo}`,
                key: index.toString(),
                address: '',
              }),
            );
            setMarkers(fetchedMarkers);

            if (fetchedMarkers.length > 0) {
              setRegion({
                latitude: fetchedMarkers[0].coordinate.latitude,
                longitude: fetchedMarkers[0].coordinate.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              });
            }
          } else {
            Alert.alert('Error', data.mensaje || 'Failed to fetch visits', [
              {
                text: 'Ok',
                onPress: () => dispatch(logout()),
              },
            ]);
          }
        } catch (error) {
          console.error('Error fetching visits:', error);
          Alert.alert('Error', 'Failed to fetch visits');
        } finally {
          setLoading(false);
        }
      };

      fetchVisits();
    }, [token, dispatch]),
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
      {region && (
        // eslint-disable-next-line react-native/no-inline-styles
        <MapView provider={PROVIDER_GOOGLE} style={{flex: 1}} region={region}>
          {markers.map((marker: any) => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      )}
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

export default MyVisitsMapScreen;
