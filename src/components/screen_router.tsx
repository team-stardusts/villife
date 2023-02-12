import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import useStardustsStorage from '../hooks/internal/stardusts_storage';
import IStardustsStorage from '../hooks/internal/stardusts_storage/types';
import AuthNavigator from './block/navigator/auth_navigator';
import MainNavigator from './block/navigator/main_navigator';
import SplashNavigator from './block/navigator/splash_navigator';

enableScreens(true);

export default function ScreenRouter() {
    const storage: IStardustsStorage = useStardustsStorage();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const bootstrap = async () => {
            const logindata = await storage.login.get();
            
            setTimeout(() => logindata ?? setIsLoading(false), 5000);
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
