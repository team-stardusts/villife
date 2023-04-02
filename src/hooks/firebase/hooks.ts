import React from 'react';
import AndroidFirebaseModule from './android_module';
import useSystemInfo from '../systeminfo/hooks';

export function useGetFirebaseToken() {
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
