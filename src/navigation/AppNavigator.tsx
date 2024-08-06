import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './AuthNavigator';

import MainNavigator from './MainNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

function AppNavigator(): JSX.Element | null {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigator;
