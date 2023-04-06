import React from 'react';
import AndroidFirebaseModule from './android_module';
import useSystemInfo from '../systeminfo/hooks';
import axios from 'axios';
import routes from '../../libs/rest_apis/villife/routes';
import VillifeServer from '../../libs/rest_apis/villife';
import {useRecoilState} from 'recoil';
import {LoginDataStateType} from '../states/atoms/login/types';
import {loginDataState} from '../states/atoms/login';

export function useGetFirebaseToken(): string {
  const [token, setToken] = React.useState('');
  const sys = useSystemInfo();
  const getAccessTokenDependsOnPlatform = React.useCallback(async () => {
    if (sys.platform.OS == 'android') {
      const token = await AndroidFirebaseModule.getAccessToken();
      setToken(token);
    } else if (sys.platform.OS == 'ios') {
      //TODO :: Implement IOS get access token fucntion which return string type token at here
      //const token = await IosFirebaseModule.getAccessToken();
      //setToken(token)
    }
  }, []);
  React.useEffect(() => {
    getAccessTokenDependsOnPlatform();

    return () => {
      setToken('');
    };
  }, []);

  return token;
}

/**
 * @description need to attach top router , it is activated when loginData changes
 * @return void function which is API sends firebase token to backend server
 */
export function useAutoRegisterFirebaseToken() {
  const firebaseToken = useGetFirebaseToken();
  const [loginData, setLoginData] =
    useRecoilState<LoginDataStateType>(loginDataState);
  const villife: VillifeServer = new VillifeServer();

  React.useEffect(() => {
    console.log('login Data has changed\n', 'firebase token :', firebaseToken);
    if (loginData) {
      villife
        .registerFirebaseToken(loginData?.accessToken, firebaseToken)
        .then(r => {
          console.log('register firebase result token', r);
        });
    }
  }, [loginData]);
}
