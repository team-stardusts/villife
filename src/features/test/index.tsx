import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useGetFirebaseToken } from "../common/hooks/firebase";
import NavigationView from "../common/blocks/navigation";
import useStyler from "../common/hooks/styler/hooks";
import useTestService from "./test_hook";
import { useRecoilState } from "recoil";
import { TestDataState, testDataState } from "../common/hooks/states/atoms/test";
import { useEffect } from "react";

export default function TestScreen() {
    const firebaseToken = useGetFirebaseToken();
    const { deviceUI } = useStyler();
    const [teststate, setTeststate] = useRecoilState<TestDataState | null>(testDataState);
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
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.btn}
                    activeOpacity={0.3}
                    underlayColor={"teal"}
                    onPress={() => {
                        if (test) test.name += "!";
                    }}>
                    <Text>Button</Text>
                </TouchableHighlight>
            </View>
            <View>
                <Text>{test?.name}</Text>
                <Text>{test?.age}</Text>
                <Text>{test?.isAudult ? "성인" : "미성년자"}</Text>
            </View>
        </NavigationView>
    );
}
