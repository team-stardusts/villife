import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/auth/login';
import CreateAccountScreen from '../../screens/auth/create_account';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>()

export default function AuthNavigator(): JSX.Element {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"login"}>
            <Stack.Screen name={"login"} component={LoginScreen} />
            <Stack.Screen name={"create_account"} component={CreateAccountScreen} />
        </Stack.Navigator>
    );
}
