import { useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import useVillifeStorage from '../../hooks/storage/hooks';
import StardustsStorage from '../../hooks/storage';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../../hooks/states/atoms/login';
import useLoginSession from '../../hooks/session';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from './types';
import LoginScreen from '../screens/auth/login';
import CreateAccountScreen from '../screens/auth/create_account';
import SetBuildingScreen from '../screens/auth/set_building';
import TermsOfServiceScreen from '../screens/auth/terms_of_service/index.';
import SearchAddressScreen from '../screens/reusable/search_address';
import HomeScreen from '../screens/main/home';
import SplashScreen from '../screens/splash/splash_screen';
import { NavigationContainer } from '@react-navigation/native';

enableScreens(true);

const Stack = createNativeStackNavigator<StackParamList>();

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
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"login"}>
                <Stack.Group>
                    <Stack.Screen name={"login"} component={LoginScreen} />
                    <Stack.Screen name={"create_account"} component={CreateAccountScreen} />
                    <Stack.Screen name={"set_building"} component={SetBuildingScreen} />
                    <Stack.Screen name={"terms_of_service"} component={TermsOfServiceScreen} />
                </Stack.Group>
                <Stack.Group>
                    <Stack.Screen name={"home"} component={HomeScreen} />
                </Stack.Group>
                <Stack.Group>
                    <Stack.Screen name={"splash"} component={SplashScreen} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name={"search_address"} component={SearchAddressScreen} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
