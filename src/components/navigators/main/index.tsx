import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import AppRoutes from '../../../data/routes.json';
import HomeScreen from '../../screens/main/home';

const Stack = createNativeStackNavigator()

export default function MainNavigator(): JSX.Element {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={AppRoutes.main.HOME} component={HomeScreen} />
        </Stack.Navigator>
    );
}
