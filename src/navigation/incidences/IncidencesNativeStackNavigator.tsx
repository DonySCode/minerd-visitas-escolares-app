import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Spacer from '../../ui/spacer/Spacer';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import NavigationMenuIcon from '../../features/general/MenuIcon';
import incidencesRegister from '../../screens/incidences/incidences.register';
import incidencesDetails from '../../screens/incidences/incidences.details';
import {Incidence} from '../../features/incidences/Incidence';
import incidencesList from '../../screens/incidences/incidences.list';

export type IncidencesNativeStackParamList = {
  MyIncidences: undefined;
  RegisterIncidence: undefined;
  IncidenceDetails: {incidence: Incidence};
};

const Stack = createNativeStackNavigator<IncidencesNativeStackParamList>();

const IncidencesNativeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MyIncidences">
      <Stack.Screen
        name="MyIncidences"
        component={incidencesList}
        options={({navigation}) => ({
          title: 'Mis incidencias',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <Spacer marginHorizontal={25}>
              <TouchableOpacity
                style={styles.newBtn}
                onPress={() => navigation.navigate('RegisterIncidence')}>
                <Text style={styles.newBtnText}>Nueva incidencia</Text>
              </TouchableOpacity>
            </Spacer>
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => <NavigationMenuIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="RegisterIncidence"
        component={incidencesRegister}
        options={{
          title: 'Registrar incidencias',
        }}
      />
      <Stack.Screen
        name="IncidenceDetails"
        component={incidencesDetails}
        options={{
          title: 'Detalle de Incidencia',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  newBtn: {
    backgroundColor: 'green',
    borderRadius: 20,
  },
  newBtnText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
    paddingHorizontal: 10,
  },
});

export default IncidencesNativeStackNavigator;
