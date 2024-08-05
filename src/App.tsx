import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import {store} from './store/store';
import {requestPermissions} from './services/permissions';

function App(): React.JSX.Element {
  useEffect(() => {
    const getPermissions = async () => {
      const granted = await requestPermissions();
      if (!granted) {
        console.warn('Permissions not granted');
      }
    };

    getPermissions();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
