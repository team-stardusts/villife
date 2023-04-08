import { NativeModules, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGetFirebaseToken } from "../../../hooks/firebase/hooks";
import AndroidFirebaseModule from "../../../hooks/firebase/android_module";
import { firebase } from "@react-native-firebase/messaging";
import useSystemInfo from "../../../hooks/systeminfo/hooks";

export default function TestScreen() {
    const firebaseToken = useGetFirebaseToken();
    const sysinfo = useSystemInfo();

    const { messaging } = firebase;

    const getFirebaseToken = async () => {
        let authStatus: any = null;
        let isEnabled: boolean = true;

        if (sysinfo.platform.OS === "ios") {
            const authStatus = await messaging().requestPermission();
            isEnabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        } else if (sysinfo.platform.OS === "android") {
            authStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: "Notification Permission",
                message: "ExampleApp needs access to your notifications.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK",
            });
        } else {
            throw new Error("The user is using an unexpected OS.");
        }

        if (isEnabled && sysinfo.platform.OS === "android") {
            const token = await messaging().getAPNSToken();
            console.log("auth", authStatus);
            console.log("token", token);
        }
    };

    getFirebaseToken();

    return (
        <View>
            <View>
                <TouchableOpacity
                    onPress={() => {
                        console.log(firebaseToken);
                    }}
                    style={localStyle.testButton}>
                    <Text style={localStyle.buttonText}>버튼</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const localStyle = StyleSheet.create({
    testButton: {
        width: "100%",
        backgroundColor: "red",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 20,
    },
});
