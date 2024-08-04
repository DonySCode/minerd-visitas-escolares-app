import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyVisitsScreen from '../../screens/visits/MyVisitsScreen';
import NewVisitScreen from '../../screens/visits/NewVisitScreen';
import VisistDetailScreen from '../../screens/visits/VisitDetailScreen';
import Spacer from '../../ui/spacer/Spacer';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import NavigationMenuIcon from '../../features/general/MenuIcon';
import {Visit} from '../../features/visits/Visit';

export type VisitsNativeStackParamList = {
  MyVisits: undefined;
  NewVisit: undefined;
  VisitDetails: Visit;
};

const Stack = createNativeStackNavigator<VisitsNativeStackParamList>();

const VisitsNativeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MyVisits">
      <Stack.Screen
        name="MyVisits"
        component={MyVisitsScreen}
        options={({navigation}) => ({
          title: 'Mis visitas',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <Spacer marginHorizontal={25}>
              <TouchableOpacity
                style={styles.newBtn}
                onPress={() => navigation.navigate('NewVisit')}>
                <Text style={styles.newBtnText}>Nueva visita</Text>
              </TouchableOpacity>
            </Spacer>
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => <NavigationMenuIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="NewVisit"
        component={NewVisitScreen}
        options={{
          title: 'Nueva visita',
        }}
      />
      <Stack.Screen
        name="VisitDetails"
        component={VisistDetailScreen}
        options={{
          title: 'Detalle de visita',
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

export default VisitsNativeStackNavigator;
