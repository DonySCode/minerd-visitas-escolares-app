import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from '../screens/general/HomeScreen';
import CustomDrawerContent from '../features/general/CustomDrawerContent.tsx';
import aboutScreen from '../screens/general/AboutScreen.tsx';
import newsScreen from '../screens/general/NewsScreen.tsx';
import weatherScreen from '../screens/general/WeatherScreen.tsx';
import VisitsNativeStackNavigator from './visits/VisitsNativeStackNavigator.tsx';
import IncidencesNativeStackNavigator from './incidences/IncidencesNativeStackNavigator.tsx';
import SchoolByCodeScreen from '../screens/general/SchoolByCodeScreen.tsx';

export type DrawerStackParamList = {
  Home: undefined;
  SchoolByCode: undefined;
  ListIncidences: undefined;
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
          name="SchoolByCode"
          component={SchoolByCodeScreen}
          options={{
            title: 'Consulta de escula',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="ListIncidences"
          component={IncidencesNativeStackNavigator}
          options={{
            title: 'Mis incidencias',
            headerShown: false,
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
            title: 'Sobre mi',
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default MainNavigator;
