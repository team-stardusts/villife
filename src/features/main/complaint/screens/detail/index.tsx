import { useRef } from "react";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintDetailScreenProps from "./type";
import useComplaintDetailSecreenStyle from "./style";
import { PixelRatio, ScrollView, Text, TextInput, View } from "react-native";
import React from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import RemoteCSS from "../../../../../libs/themes/remote_css";
import AutoHeightWebView from "react-native-autoheight-webview";

export default function ComplaintDetailScreen({ navigation, route }: ComplaintDetailScreenProps) {
    const messages = useScreenMessage();
    const styles = useComplaintDetailSecreenStyle();
    const content = useRef(route.params.content);
    const title = useRef(route.params.title);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.complaint.detail,
            }}>
            <ScrollView style={[styles.topLevelBox]} scrollEventThrottle={20}>
                <>
                    <TextInput
                        style={styles.title}
                        onChangeText={(text) => {
                            title.current = text;
                        }}
                        placeholder="제목을 입력하세요"
                        value={title.current}
                    />
                </>
                <View style={styles.statusBarSection}></View>
                <AutoHeightWebView
                    style={styles.webViewContainer}
                    customStyle={` ${RemoteCSS.getPretendardRegular()}
                    body {
                      font-size: 14px;
                      font-family:"Pretendard-Regular";
                    }
                    div {
                      color: #333;
                    }
                    img {
                        width: 500px;
                        height: 500px;
                        object-fit: cover;
                        display:block;
                        border-radius: 15px;
                      }`}
                    source={{ html: content.current }}
                    scalesPageToFit={false}
                    viewportContent={"width=device-width, user-scalable=no"}></AutoHeightWebView>
                <View>
                    <Text style={styles.replyTitle}>답글</Text>
                    <View style={styles.horizontalLine}></View>
                </View>
            </ScrollView>
        </NavigationView>
    );
}
{
    /* */
}
