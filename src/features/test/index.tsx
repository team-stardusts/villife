import { Animated, ColorValue, Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import NavigationView from "../common/blocks/navigation";
import useTestService from "./test_hook";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import DotEnv from "../../libs/dotenv";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../common/router/types";
import PaymentServiceProvider from "../expense/payment/services/provider";
import NetInfoEventHandler from "../../libs/netinfo";
import Spinner from "../common/blocks/spinner";
import Icon from "../common/atoms/icon";
import useStyler from "../common/hooks/styler/hooks";

export default function TestScreen() {
    //const test = useTestService();
    const { theme } = useStyler();
    const env = new DotEnv();
    const navigation = useNavigation<VillifeNavigation>();
    const netinfo = new NetInfoEventHandler();

    useEffect(() => {
        netinfo.listen("changed", (_, state) => console.log("Is connected?", state.isConnected));

        return () => {
            netinfo.removeAllListeners();
        };
    }, []);

    /* useEffect(() => {
        createOrder();
    }, [test?.name]); */

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

        if (result != null) {
            setPaymentUrl(result);
            //Linking.openURL(result);
        }
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
