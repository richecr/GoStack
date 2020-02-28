import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import './src/config/reactotronConfig';

import Store from './src/store/index';
import Routes from './src/routes';

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>
  );
}
