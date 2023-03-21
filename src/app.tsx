/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import ScreenRouter from './components/screen_router';
import { RecoilRoot } from 'recoil';
import useSystemInfo from './hooks/systeminfo/hooks';


export default function App(): JSX.Element {
  console.log(new Date(1679228138000 + (9 * 60 * 60 * 1000)));
  
  return (
    <RecoilRoot>
      <ScreenRouter />
    </RecoilRoot>
  );
}
      //<RecoilRoot>
      //  <ScreenRouter />
      //</RecoilRoot>
