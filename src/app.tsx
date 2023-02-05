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
import { useEffect } from 'react';
import LocalStorage from './api/native/localstorage';

export default function App(): JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';
  const lc = new LocalStorage(false);
  useEffect(() => {
    async function bootstrap() {
      const issucced = await lc.setItem("test", "123123123");
      const value = await lc.getItem("test")

      console.log(value)
    }
    
    bootstrap()
  }, [])

  return (
    <Provider store={store}>
      <ScreenRouter />
    </Provider>
  );
}