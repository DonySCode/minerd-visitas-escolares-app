import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthNativeStackParamList} from '../../navigation/AuthNavigator';

type Props = NativeStackScreenProps<AuthNativeStackParamList, 'SignIn'>;

const SignInScreen = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Text>SignIn Screen</Text>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
