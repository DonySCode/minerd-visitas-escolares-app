import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationProp} from '@react-navigation/native';
import SignInScreen from '../screens/auth/SignInScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';
import SignUpScreen from '../screens/auth/SignUpScreen';

export type AuthNativeStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  MainNavigator: undefined;
};

export type AuthNativeStackNavigation =
  NavigationProp<AuthNativeStackParamList>;

const Stack = createNativeStackNavigator<AuthNativeStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{animation: 'none'}}>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
