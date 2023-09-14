import { View } from "react-native";
import WebView from "react-native-webview";
import NavigationView from "../../../../common/blocks/navigation";
import usePaymentCommonScreenStyles from "./style";
import { useGetPaymentWidgetUrl } from "../../services";

export default function PaymentCommonScreen() {
    const widgetUrl = useGetPaymentWidgetUrl({
        product_id: 945,
        product_type: "pt_management_fee",
        product_name: "빌라이프 3월 관리비",
        price: 80000,
    });
    const styles = usePaymentCommonScreenStyles();

    return (
        <NavigationView
            headerOptions={{ title: "PaymentCommon" }}
            bottomNavOptions={{ shown: false }}
            bodyOptions={{ applyDefaultHorizontalPadding: false }}>
            <View style={styles.container}>
                {!widgetUrl ? (
                    <></>
                ) : (
                    <WebView
                        style={styles.container}
                        javaScriptEnabled={true}
                        injectedJavaScriptForMainFrameOnly={true}
                        source={{
                            uri: `${widgetUrl}`,
                        }}></WebView>
                )}
            </View>
        </NavigationView>
    );
}
