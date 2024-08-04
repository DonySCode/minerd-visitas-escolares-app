import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import {store} from './store/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
