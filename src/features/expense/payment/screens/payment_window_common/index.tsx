import { Linking, Platform, Text, View } from "react-native";
import WebView from "react-native-webview";
import NavigationView from "../../../../common/blocks/navigation";
import usePaymentCommonScreenStyles from "./style";
import { useGetPaymentWidgetUrl } from "../../services";
import { CommonPaymentWindowScreenProps } from "./type";
import SendIntentAndroid from "react-native-send-intent";

export default function CommonPaymentWindowScreen(params: CommonPaymentWindowScreenProps) {
    const navParam = params.route.params;
    const widgetUrl = useGetPaymentWidgetUrl({
        product_id: navParam.product_id,
        product_type: navParam.product_type,
        product_name: navParam.product_name,
        price: navParam.price,
        tax_free_amount: navParam.tax_free_amount ?? 0,
    });
    const styles = usePaymentCommonScreenStyles();

    return (
        <NavigationView
            headerOptions={{
                title: "결제하기",
                hideBuidingSelector: true,
                style: {
                    borderBottomColor: styles.navContainer.color,
                    backgroundColor: styles.navContainer.color,
                },
            }}
            bottomNavOptions={{ shown: false }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
                backgroundColor: styles.navContainer.color,
            }}>
            <View style={styles.container}>
                {/* <Text style={styles.title}>{navParam.title}</Text> */}
                {!widgetUrl ? (
                    <></>
                ) : (
                    <WebView
                        style={styles.container}
                        javaScriptEnabled={true}
                        onAccessibilityAction={(e) => {
                            console.log("onAccessibilityAction", e);
                        }}
                        onShouldStartLoadWithRequest={(event) => {
                            if (
                                event.url.startsWith("https://myvillife.com/api-v1/payment/request-failure") ||
                                event.url.startsWith("https://myvillife.com/api-v1/payment/approval-request")
                            ) {
                                setTimeout(() => {
                                    params.navigation.navigate("management_fee");
                                }, 3000);
                            }

                            if (event.url.startsWith("http")) {
                                return true;
                            }
                            if (Platform.OS === "android" && event.url.startsWith("intent")) {
                                console.log("android and intent condition");
                                SendIntentAndroid.openAppWithUri(event.url)
                                    .then((isOpened) => {
                                        if (!isOpened) {
                                            console.log("실행 실패");
                                        }
                                        return false;
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                                return false;
                            }
                            if (Platform.OS === "ios") {
                                return true;
                            }
                            return true;
                        }}
                        originWhitelist={["http://", "https://", "intent:*"]}
                        injectedJavaScriptForMainFrameOnly={true}
                        source={{
                            uri: `${widgetUrl}`,
                        }}
                    />
                )}
            </View>
        </NavigationView>
    );
}
