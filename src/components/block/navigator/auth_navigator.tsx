import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/login/login_screen';
import AppRoute from '../../../data/routes';

const Stack = createNativeStackNavigator()

export default function AuthNavigator(): JSX.Element {
    return (
        <Stack.Navigator>
            <Stack.Screen name={AppRoute.auth.login.DEFAULT} component={LoginScreen} />
        </Stack.Navigator>
    );
}
