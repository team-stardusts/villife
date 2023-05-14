import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGetFirebaseToken } from "../common/hooks/firebase";
import useSystemInfo from "../common/hooks/systeminfo/hooks";
import VillifeStorage from "../../libs/storage";
import NavigationView from "../common/blocks/navigation";
import TimePicker from "../common/atoms/time_picker";
import useStyler from "../common/hooks/styler/hooks";
import EtdaTimePicker from "../main/parking/blocks/etad_time_picker";

export default function TestScreen() {
    const firebaseToken = useGetFirebaseToken();
    const { deviceUI } = useStyler();

    const styles = StyleSheet.create({
        testButtonContainer: {
            flex: 2,
        },
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
        timepickerContainer: {
            flex: 8,
        },
        timepickerWrapper: {
            width: "100%",
        },
    });

    return (
        <NavigationView headerOptions={{ title: "TEST" }}>
            <View style={styles.testButtonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        console.log(firebaseToken);
                    }}
                    style={styles.testButton}>
                    <Text style={styles.buttonText}>버튼</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.timepickerContainer}>
                <View style={styles.timepickerWrapper}>
                    <EtdaTimePicker
                        initialTime={{
                            etd: {
                                hour: 7,
                                minute: 10,
                            },
                            eta: {
                                hour: 12,
                                minute: 30,
                            },
                        }}
                    />
                </View>
            </View>
        </NavigationView>
    );
}
