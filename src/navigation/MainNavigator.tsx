import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from '../screens/general/HomeScreen';
import incidencesRegister from '../screens/incidences/incidences.register.tsx';
import incidencesList from '../screens/incidences/incidences.list.tsx';
import incidencesDetails from '../screens/incidences/incidences.details.tsx';
import CustomDrawerContent from '../features/general/CustomDrawerContent.tsx';
import aboutScreen from '../screens/general/AboutScreen.tsx';
import newsScreen from '../screens/general/NewsScreen.tsx';
import weatherScreen from '../screens/general/WeatherScreen.tsx';
import {Incidence} from '../features/incidences/Incidence.ts';
import VisitsNativeStackNavigator from './visits/VisitsNaviteStackNavigator.tsx';

export type DrawerStackParamList = {
  Home: undefined;
  RegisterIncidence: undefined;
  ListIncidences: undefined;
  IncidenceDetails: {incidence: Incidence};
  Visits: undefined;
  About: undefined;
  News: undefined;
  Weather: undefined;
};

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const MainNavigator = (): JSX.Element => {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        // eslint-disable-next-line react/no-unstable-nested-components
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Inicio',
          }}
        />
        <Drawer.Screen
          name="RegisterIncidence"
          component={incidencesRegister}
          options={{
            title: 'Registrar incidencias',
          }}
        />
        <Drawer.Screen
          name="ListIncidences"
          component={incidencesList}
          options={{
            title: 'Mis incidencias',
          }}
        />
        <Drawer.Screen
          name="IncidenceDetails"
          component={incidencesDetails}
          options={{
            drawerItemStyle: {display: 'none'},
            title: 'Detalle de Incidencia',
          }}
        />
        <Drawer.Screen
          name="Visits"
          component={VisitsNativeStackNavigator}
          options={{
            title: 'Mis visitas',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="News"
          component={newsScreen}
          options={{
            title: 'Noticias',
          }}
        />
        <Drawer.Screen
          name="Weather"
          component={weatherScreen}
          options={{
            title: 'Clima',
          }}
        />
        <Drawer.Screen
          name="About"
          component={aboutScreen}
          options={{
            title: 'Sobre Mi',
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default MainNavigator;
