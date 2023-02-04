import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppRoute from '../../../data/routes';
import HomeScreen from '../../screens/main/home/home_screen';

const Stack = createNativeStackNavigator()

export default function MainNavigator(): JSX.Element {
    return (
        <Stack.Navigator>
            <Stack.Screen name={AppRoute.main.HOME} component={HomeScreen} />
        </Stack.Navigator>
    );
}
