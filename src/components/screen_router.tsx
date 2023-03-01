import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import useStardustsStorage from '../hooks/internal/stardusts_storage/hooks';
import StardustsStorage from '../hooks/internal/stardusts_storage';
import AuthNavigator from './block/navigators/auth_navigator';
import MainNavigator from './block/navigators/main_navigator';
import SplashNavigator from './block/navigators/splash_navigator';

enableScreens(true);

export default function ScreenRouter() {
    const storage: StardustsStorage = useStardustsStorage();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const bootstrap = async () => {
            const logindata = await storage.login.get();
            
            setTimeout(() => logindata ?? setIsLoading(false), 1000);
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
