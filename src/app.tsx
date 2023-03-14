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
import Kakao from './libs/rest_apis/kakao';


export default function App(): JSX.Element {
  const kakao = new Kakao();
  kakao.searchAddress("구천동 24")
    .then((res) => console.log(res.data));


  return (
    <RecoilRoot>
      <ScreenRouter />
    </RecoilRoot>
  );
}
      //<RecoilRoot>
      //  <ScreenRouter />
      //</RecoilRoot>
