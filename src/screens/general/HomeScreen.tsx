import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {DrawerScreenProps} from '@react-navigation/drawer';

type Props = DrawerScreenProps<RootStackParamList, 'Home'>;

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
