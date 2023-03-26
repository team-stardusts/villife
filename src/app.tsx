/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import ScreenRouter from './components/router';
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
