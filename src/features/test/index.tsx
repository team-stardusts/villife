import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import NavigationView from "../common/blocks/navigation";
import useTestService from "./test_hook";
import { useEffect, useState } from "react";
import { View } from "react-native";
import DotEnv from "../../libs/dotenv";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../common/router/types";
import PaymentServiceProvider from "../expense/payment/services/provider";

export default function TestScreen() {
    const test = useTestService();
    const env = new DotEnv();
    const navigation = useNavigation<VillifeNavigation>();

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
        const result = await usecase.getPaymentWidgetUrl({
            product_id: 945,
            product_type: "pt_management_fee",
            product_name: "빌라이프 3월 관리비",
            price: 80000,
        });

        if (result != null) setPaymentUrl(result);
    };
    const navigateToPaymentWindow = () => {
        navigation.navigate("payment_window", {
            title: "관리비 제목",
            product_id: 949,
            product_type: "pt_management_fee",
            product_name: "관리비 테스트",
            price: 120000,
        });
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
                <TouchableOpacity onPress={navigateToPaymentWindow}>
                    <Text style={{ fontSize: 24 }}>관리비 결제 테스트</Text>
                </TouchableOpacity>

                {/*  {paymentUrl === "" ? (
                    <></>
                ) : (
                    <WebView
                        style={styles.container}
                        javaScriptEnabled={true}
                        injectedJavaScriptForMainFrameOnly={true}
                        source={{
                            uri: `${paymentUrl}`,
                        }}></WebView>
                )} */}
            </View>
        </NavigationView>
    );
}
