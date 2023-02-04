import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import AuthNavigator from './block/navigator/auth_navigator';
import MainNavigator from './block/navigator/main_navigator';
import SplashNavigator from './block/navigator/splash_navigator';

enableScreens(true);

export default function ScreenRouter() {
    return (
        <NavigationContainer>
            <AuthNavigator />
            {
            //<MainNavigator />
            //<SplashNavigator />
            }
        </NavigationContainer>
    );
}
