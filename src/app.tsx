/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
//import Config from 'react-native-config';
import { store } from './ducks/store';
import { Provider } from 'react-redux';
import ScreenRouter from './components/screen_router';


export default function App(): JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <ScreenRouter />
    </Provider>
  );
}