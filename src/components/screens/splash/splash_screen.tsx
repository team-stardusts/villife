import { SafeAreaView, Text, View } from 'react-native';
import { NativeModules } from 'react-native';
import Config from 'react-native-config';
import DotEnv from '../../../libs/dotenv';
import Button from '../../atoms/button';


export default function SplashScreen() {
    const { CalendarModule, FirebasePushNotifier } = NativeModules;
    

    return (
        <SafeAreaView>
            <View>
                <Text>Splash</Text>
            </View>
            <Button title={"test"} onPress={() => {
                //console.log(FirebasePushNotifier.moduleName())
                console.log(FirebasePushNotifier.test("test", (err, res)=>console.log(err, res)));
                //CalendarModule.createCalendarEvent("abc", "tees");
                console.log("sdf")
                }}
                />
        </SafeAreaView>
    );
}