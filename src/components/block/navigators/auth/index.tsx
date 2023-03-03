import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../../screens/auth/login';
import AppRoutes from '../../../../data/routes.json';
import JoinScreen from '../../../screens/auth/join';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>()

export default function AuthNavigator(): JSX.Element {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={AppRoutes.auth.login.DEFAULT}>
            <Stack.Screen name={AppRoutes.auth.login.DEFAULT} component={LoginScreen} />
            <Stack.Screen name={AppRoutes.auth.join.DEFAULT} component={JoinScreen} />
        </Stack.Navigator>
    );
}
