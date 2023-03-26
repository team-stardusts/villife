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
import useLoginSession from '../hooks/session';
import Config from 'react-native-config';

enableScreens(true);

export default function ScreenRouter() {
    const storage: StardustsStorage = useVillifeStorage();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean | null>(isLoggedInState);
    
    useLoginSession();

    useEffect(() => {
        if (isLoggedIn === null) {
            setIsLoading(true);
        }
        else {
            setIsLoading(false);
        }
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
