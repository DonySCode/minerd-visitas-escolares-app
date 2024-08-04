import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthNativeStackParamList} from '../../navigation/AuthNavigator';

type Props = NativeStackScreenProps<AuthNativeStackParamList, 'SignUp'>;

const SignUpScreen = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
