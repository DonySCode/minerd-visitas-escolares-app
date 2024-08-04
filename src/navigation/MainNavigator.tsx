import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from '../screens/general/HomeScreen';

export type DrawerStackParamList = {
  Home: undefined;
};

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const MainNavigator = (): JSX.Element => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
