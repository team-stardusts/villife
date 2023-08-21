import { StyleSheet } from "react-native";
import NavigationView from "../common/blocks/navigation";
import useTestService from "./test_hook";
import { useEffect } from "react";
import { View } from "react-native";
import CalendarDatePicker from "../common/blocks/calendar_picker";

export default function TestScreen() {
    const test = useTestService();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        btn: {
            height: "10%",
            backgroundColor: "teal",
            justifyContent: "center",
            alignItems: "center",
        },
    });

    useEffect(() => {
        console.log(test?.name);
    }, [test?.name]);

    return (
        <NavigationView headerOptions={{ title: "TEST" }}>
            <View>
                <CalendarDatePicker initialDate={new Date("2023-08-11")} onDateChange={console.log} />
            </View>
        </NavigationView>
    );
}
