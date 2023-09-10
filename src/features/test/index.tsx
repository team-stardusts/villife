import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import NavigationView from "../common/blocks/navigation";
import useTestService from "./test_hook";
import { useEffect } from "react";
import { View } from "react-native";
import DotEnv from "../../libs/dotenv";
import PaymentServiceProvider from "../main/payment/services/provider";

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
    const openWebView = async () => {
        const usecase = new PaymentServiceProvider();
        const result = await usecase.createOrder({
            product_id: 977,
            product_type: "pt_management_fee",
            product_name: "빌라이프 2월 관리비",
            price: 40000,
        });
        if (result == null) return console.log("cannot open web view, failed to create order");
        console.log(result);

        const url = `${env.api.villife.REST_API_BASE_URL}payment/widget?order_unique_id=${result.unique_id}`; // 여기에 열고자 하는 URL을 입력하세요
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

                {/*   <WebView
                    style={styles.container}
                    source={{
                        uri: `${env.api.villife.REST_API_BASE_URL}payment/widget?order_unique_id=eebf17a2_5151_4019_a2fa_b4d7426783292023_09_03_00_46_22`,
                    }}></WebView> */}
            </View>
        </NavigationView>
    );
}
