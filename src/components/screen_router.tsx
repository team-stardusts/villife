import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import useStardustsStorage from '../hooks/storage/hooks';
import StardustsStorage from '../hooks/storage';
import AuthNavigator from './navigators/auth';
import MainNavigator from './navigators/main';
import SplashNavigator from './navigators/splash';
import { LoginDataType } from '../hooks/storage/tables/types';

enableScreens(true);

export default function ScreenRouter() {
    const storage: StardustsStorage = useStardustsStorage();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const bootstrap = async () => {
            const logindata: LoginDataType | null = await storage.login.get();

            logindata ?? setIsLoading(false);
            
            //setTimeout(() => logindata ?? setIsLoading(false), 1000);
        }
        bootstrap();
    }, [])

    return (
        <NavigationContainer>
            {
                isLoading
                ? <SplashNavigator />
                : <AuthNavigator />
            }
            {
            //<MainNavigator />
            //
            }
        </NavigationContainer>
    );
}
