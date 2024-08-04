import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerStackParamList} from '../../navigation/MainNavigator';

type Props = DrawerScreenProps<DrawerStackParamList, 'Home'>;

const HomeScreen = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
