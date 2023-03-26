/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import ScreenRouter from './components/router';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';

export default function App(): JSX.Element {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <ScreenRouter />
      </NavigationContainer>
    </RecoilRoot>
  );
}
//<RecoilRoot>
//  <ScreenRouter />
//</RecoilRoot>
