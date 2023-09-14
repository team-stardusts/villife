import { View } from "react-native";
import WebView from "react-native-webview";
import NavigationView from "../../../../common/blocks/navigation";
import usePaymentCommonScreenStyles from "./style";
import { useGetPaymentWidgetUrl } from "../../services";
import { CommonPaymentWindowScreenProps } from "./type";
import { Text } from "react-native-svg";

export default function CommonPaymentWindowScreen(params: CommonPaymentWindowScreenProps) {
    const navParam = params.route.params;
    const widgetUrl = useGetPaymentWidgetUrl({
        product_id: navParam.product_id,
        product_type: navParam.product_type,
        product_name: navParam.product_name,
        price: navParam.price,
    });
    const styles = usePaymentCommonScreenStyles();

    console.log(navParam);
    return (
        <NavigationView
            headerOptions={{ title: "PaymentCommon" }}
            bottomNavOptions={{ shown: false }}
            bodyOptions={{ applyDefaultHorizontalPadding: false }}>
            <View style={styles.container}>
                <Text>{navParam.title}</Text>
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
