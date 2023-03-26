/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import ScreenRouter from './components/router';
import { RecoilRoot } from 'recoil';
import useVillifeStorage from './hooks/storage/hooks';

export default function App(): JSX.Element {
  const storage = useVillifeStorage();

  storage.login.set(null);
  return (
    <RecoilRoot>
      <ScreenRouter />
    </RecoilRoot>
  );
}
//<RecoilRoot>
//  <ScreenRouter />
//</RecoilRoot>
