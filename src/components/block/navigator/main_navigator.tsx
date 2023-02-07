import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppRoutes from '../../../data/routes.json';
import HomeScreen from '../../screens/main/home/home_screen';

const Stack = createNativeStackNavigator()

export default function MainNavigator(): JSX.Element {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={AppRoutes.main.HOME} component={HomeScreen} />
        </Stack.Navigator>
    );
}
