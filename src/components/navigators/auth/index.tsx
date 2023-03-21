import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/auth/login';
import CreateAccountScreen from '../../screens/auth/create_account';
import {AuthStackParamList} from './types';
import SetBuildingScreen from '../../screens/auth/set_building';
import SearchAddressScreen from '../../screens/reusable/search_address';
import TermsOfServiceScreen from '../../screens/auth/terms_of_service/index.';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator(): JSX.Element {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"login"}>
            <Stack.Group>
                <Stack.Screen name={"login"} component={LoginScreen} />
                <Stack.Screen name={"create_account"} component={CreateAccountScreen} />
                <Stack.Screen name={"set_building"} component={SetBuildingScreen} />
                <Stack.Screen name={"terms_of_service"} component={TermsOfServiceScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name={"search_address"} component={SearchAddressScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
