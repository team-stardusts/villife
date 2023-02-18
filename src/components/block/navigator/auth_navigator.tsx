import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/login/login_screen';
import AppRoutes from '../../../data/routes.json';

const Stack = createNativeStackNavigator()

export default function AuthNavigator(): JSX.Element {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={AppRoutes.auth.login.DEFAULT} component={LoginScreen} />
        </Stack.Navigator>
    );
}
