import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from '../screens/general/HomeScreen';
import incidencesRegister from '../screens/incidences/incidences.register.tsx';
import incidencesList from '../screens/incidences/incidences.list.tsx';
import incidencesDetails from '../screens/incidences/incidences.details.tsx';
import CustomDrawerContent from '../features/general/CustomDrawerContent.tsx';

export type DrawerStackParamList = {
  Home: undefined;
};

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const MainNavigator = (): JSX.Element => {
  return (
    <>
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Registro de Incidencias" component={incidencesRegister} />
        <Drawer.Screen name="Lista de Incidencias" component={incidencesList} />
        <Drawer.Screen name="Detalle de la Incidencia" component={incidencesDetails} options={{ drawerItemStyle: { display: 'none' } }}/>
      </Drawer.Navigator>
    </>
  );
};

export default MainNavigator;
