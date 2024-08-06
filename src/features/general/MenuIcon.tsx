import {TouchableOpacity} from 'react-native';
import React from 'react';
import Spacer from '../../ui/spacer/Spacer';
import Icon from 'react-native-vector-icons/Ionicons';

const NavigationMenuIcon = ({navigation}: any) => {
  return (
    <Spacer marginRight={30}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" size={25} color="black" />
      </TouchableOpacity>
    </Spacer>
  );
};

export default NavigationMenuIcon;
