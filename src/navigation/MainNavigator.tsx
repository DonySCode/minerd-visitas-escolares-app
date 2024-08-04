import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from '../screens/general/HomeScreen';
import incidencesRegister from '../screens/incidences/incidences.register.tsx';
import incidencesList from '../screens/incidences/incidences.list.tsx';
import incidencesDetails from '../screens/incidences/incidences.details.tsx';
import CustomDrawerContent from '../features/general/CustomDrawerContent.tsx';
import {Incidence} from '../features/incidences/Incidence.ts';

export type DrawerStackParamList = {
  Home: undefined;
  RegisterIncidence: undefined;
  ListIncidences: undefined;
  IncidenceDetails: {incidence: Incidence};
};

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const MainNavigator = (): JSX.Element => {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        // eslint-disable-next-line react/no-unstable-nested-components
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen
          name="RegisterIncidence"
          component={incidencesRegister}
        />
        <Drawer.Screen name="ListIncidences" component={incidencesList} />
        <Drawer.Screen
          name="IncidenceDetails"
          component={incidencesDetails}
          options={{
            drawerItemStyle: {display: 'none'},
            title: 'Detalle de Incidencia',
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default MainNavigator;
