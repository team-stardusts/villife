import {
    EventEmitter,
    NativeModules,
    PermissionsAndroid,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useGetFirebaseToken } from "../../../hooks/firebase/hooks";
import { firebase } from "@react-native-firebase/messaging";
import useSystemInfo from "../../../hooks/systeminfo/hooks";
import { useEffect } from "react";
import VillifeStorage from "../../../libs/storage";

export default function TestScreen() {
    const firebaseToken = useGetFirebaseToken();
    const sysinfo = useSystemInfo();
    const storage = new VillifeStorage();

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
