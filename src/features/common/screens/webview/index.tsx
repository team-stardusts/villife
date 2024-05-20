import { View } from "react-native";
import NavigationView from "../../blocks/navigation";
import useManualScreenStyles from "./styles";
import WebView from "react-native-webview";
import { useState } from "react";
import MyPageWebViewScreenProps from "./types";
import VillifeSpinner from "../../atoms/spinner/villife";

export default function MyPageWebViewScreen({ navigation, route }: MyPageWebViewScreenProps) {
    const styles = useManualScreenStyles();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    /* 
    const webview = useRef<WebView>(null);
    const [webviewNavState, setWebviewNavState] = useState<WebViewNavigation | null>(null);

    useEffect(() => {
        console.log(webviewNavState?.canGoBack);
    }, [webviewNavState]); 
    */

    return (
        <NavigationView
            headerOptions={{
                title: route.params.title,
                hideBuidingSelector: true,
                style: {
                    backgroundColor: styles.nav.color,
                },
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
                backgroundColor: styles.nav.color,
            }}
            bottomNavOptions={{ shown: false }}>
            <View style={styles.container}>
                {isLoading && (
                    <View
                        style={styles.spinnerWrapper}
                        children={<VillifeSpinner size={styles.spinner.width} spinnerColor={styles.spinner.color} />}
                    />
                )}
                <WebView
                    //ref={webview}
                    source={{ uri: route.params.url }}
                    viewportContent={"width=device-width, user-scalable=yes"}
                    onLoadEnd={() => setIsLoading(false)}
                    cacheEnabled={false}
                    injectedJavaScript={`
                        if (!Object.hasOwn) {
                            Object.hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
                        }
                    `}
                    //onNavigationStateChange={setWebviewNavState}
                />
            </View>
        </NavigationView>
    );
}
