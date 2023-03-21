import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import useVillifeStorage from '../hooks/storage/hooks';
import StardustsStorage from '../hooks/storage';
import AuthNavigator from './navigators/auth';
import MainNavigator from './navigators/main';
import SplashNavigator from './navigators/splash';
import { LoginDataType } from '../hooks/storage/tables/login/types';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../hooks/states/atoms/login';
import { useLoginService } from '../hooks/services/hooks';
import useLoginSessionHandler from '../hooks/session';

enableScreens(true);

export default function ScreenRouter() {
    const storage: StardustsStorage = useVillifeStorage();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean | null>(isLoggedInState);
    const handleLoginSession = useLoginSessionHandler();

    handleLoginSession();

    useEffect(() => {
        const bootstrap = async () => {
            //const logindata: LoginDataType | null = await storage.login.get();

            //logindata ?? setIsLoading(false);
            
            //setTimeout(() => logindata ?? setIsLoading(false), 1000);

            /* 
            isLoggedIn은 최초에만 null 값을 가지고, 그 이후에는 boolean 이어야 함.
            null 값을 넣을 경우 Splash screen이 routing 됨.
            */
            if (isLoggedIn === null) {
                setIsLoading(true);
            }
            else {
                setIsLoading(false);
            }
        }
        bootstrap();
    }, [isLoggedIn])

    return (
        <NavigationContainer>
            {
                isLoading
                ? <SplashNavigator />
                : 
                    isLoggedIn
                    ? <MainNavigator />
                    : <AuthNavigator />
            }
        </NavigationContainer>
    );
}
