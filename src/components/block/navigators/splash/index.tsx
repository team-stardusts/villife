import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppRoutes from '../../../../data/routes.json';
import SplashScreen from '../../../screens/splash/splash_screen';

const Stack = createNativeStackNavigator()

export default function SplashNavigator(): JSX.Element {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={AppRoutes.SPLASH} component={SplashScreen} />
        </Stack.Navigator>
    );
}
