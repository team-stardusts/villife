import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import NavigationView from "../common/blocks/navigation";
import useTestService from "./test_hook";
import { useEffect, useState } from "react";
import { View } from "react-native";
import DotEnv from "../../libs/dotenv";
import PaymentServiceProvider from "../main/payment/services/provider";
import WebView from "react-native-webview";

export default function TestScreen() {
    const test = useTestService();
    const env = new DotEnv();

    const [paymentUrl, setPaymentUrl] = useState("");

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
    const createOrder = async () => {
        const usecase = new PaymentServiceProvider();
        const result = await usecase.createOrder({
            product_id: 945,
            product_type: "pt_management_fee",
            product_name: "빌라이프 3월 관리비",
            price: 80000,
        });
        if (result == null) return console.log("cannot open web view, failed to create order");
        console.log(result);

        const url = `${env.api.villife.REST_API_BASE_URL}payment/widget?order_unique_id=${result.unique_id}`; // 여기에 열고자 하는 URL을 입력하세요

        setPaymentUrl(url);
        console.log(url);
        //Linking.openURL(url);
    };

    useEffect(() => {
        createOrder();
    }, [test?.name]);

    return (
        <NavigationView
            headerOptions={{ title: "TEST" }}
            bottomNavOptions={{ shown: false }}
            bodyOptions={{ applyDefaultHorizontalPadding: false }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={createOrder}>
                    <Text></Text>
                </TouchableOpacity>

                {paymentUrl === "" ? (
                    <></>
                ) : (
                    <WebView
                        style={styles.container}
                        javaScriptEnabled={true}
                        injectedJavaScriptForMainFrameOnly={true}
                        source={{
                            uri: `${paymentUrl}`,
                        }}></WebView>
                )}
            </View>
        </NavigationView>
    );
}
