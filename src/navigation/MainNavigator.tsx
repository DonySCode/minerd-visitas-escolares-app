import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from '../screens/general/HomeScreen';
import CustomDrawerContent from '../features/general/CustomDrawerContent';

export type DrawerStackParamList = {
  Home: undefined;
};

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const MainNavigator = (): JSX.Element => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
