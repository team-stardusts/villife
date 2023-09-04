import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import NavigationView from "../common/blocks/navigation";
import useTestService from "./test_hook";
import { useEffect, useState } from "react";
import { View } from "react-native";
import CalendarDatePicker from "../common/blocks/calendar_picker";
import DotEnv from "../../libs/dotenv";
import storage from "../../libs/storage";
import VillifeStorage from "../../libs/storage";
import WebView from "react-native-webview";

export default function TestScreen() {
    const test = useTestService();
    const env = new DotEnv();

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
        },
        btn: {
            height: "10%",
            backgroundColor: "teal",
            justifyContent: "center",
            alignItems: "center",
        },
    });
    const openWebView = () => {
        const url = `${env.api.villife.REST_API_BASE_URL}payment/widget?order_unique_id=eebf17a2_5151_4019_a2fa_b4d7426783292023_09_03_00_46_22`; // 여기에 열고자 하는 URL을 입력하세요
        console.log(url);
        Linking.openURL(url);
    };

    useEffect(() => {}, [test?.name]);

    return (
        <NavigationView headerOptions={{ title: "TEST" }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={openWebView}>
                    <Text>결제 테스트 하기</Text>
                </TouchableOpacity>
            </View>
        </NavigationView>
    );
}
