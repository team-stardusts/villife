/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
//import Config from 'react-native-config';
import ScreenRouter from './components/screen_router';
import { RecoilRoot } from 'recoil';


export default function App(): JSX.Element {
  return (
    <RecoilRoot>
      <ScreenRouter />
    </RecoilRoot>
  );
}
      //<RecoilRoot>
      //  <ScreenRouter />
      //</RecoilRoot>
