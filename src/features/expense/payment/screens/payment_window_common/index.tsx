import { Text, View } from "react-native";
import WebView from "react-native-webview";
import NavigationView from "../../../../common/blocks/navigation";
import usePaymentCommonScreenStyles from "./style";
import { useGetPaymentWidgetUrl } from "../../services";
import { CommonPaymentWindowScreenProps } from "./type";

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
            headerOptions={{ title: "결제하기", backgroundColor: styles.navViewBackgroundColor.color }}
            bottomNavOptions={{ shown: false }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                backgroundColor: styles.navViewBackgroundColor.color,
            }}>
            <View style={styles.container}>
                <Text style={styles.title}>{navParam.title}</Text>
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
