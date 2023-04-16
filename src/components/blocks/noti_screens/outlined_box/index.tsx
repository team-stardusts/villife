import { Dimensions, FlatList, ListRenderItemInfo, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import React from "react";
import { LayoutAnimation } from "react-native";
import OutlinedBoxStyle from "./style";
import PressableVectorIcon from "../../icon/vector";
import { OutlinedBoxProps } from "./type";
import NotiLable from "../box_label.tsx";
import WebView, { WebViewMessageEvent } from "react-native-webview";

/**
 * @param OutlinedBoxProp
 * @description this componets are used by noti and complaint domains which are incharge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const [unfold, setUnfold] = React.useState(false);
    const size = Dimensions.get("window");

    const [contentHeight, setContentHeight] = React.useState(0);
    const lock = React.useRef(false);

    const handleMessage = (event: WebViewMessageEvent) => {
        const height = Number(event.nativeEvent.data);

        if (lock.current) return;
        if (height > 0) {
            console.log(height / 2);
            setContentHeight(height / 2);
            lock.current = true;
        }
    };

    const onPress = () => {
        setUnfold(!unfold);
        LayoutAnimation.configureNext({
            duration: 100,
            update: {
                type: LayoutAnimation.Types.linear,
            },
        });
    };

    return (
        <>
            <Pressable
                onPressOut={() => {
                    if (!unfold) onPress();
                }}
                style={[OutlinedBoxStyle.container, { minHeight: size.height * 0.1 * 0.8, width: size.width * 0.9 }]}>
                <View style={OutlinedBoxStyle.innerBox}>
                    <View
                        style={[
                            OutlinedBoxStyle.innerTitleSection,
                            {
                                height: size.height * 0.1 * 0.8,
                                borderBottomWidth: !unfold ? 0 : 2,
                                borderBottomColor: "#0B75F2",
                            },
                        ]}>
                        <NotiLable priority={props.priority} />
                        <View style={OutlinedBoxStyle.titleTextBox}>
                            <Text style={[]}>{props.title}</Text>
                            <Text style={[]}>{props.wroteAt}</Text>
                        </View>
                        <View style={OutlinedBoxStyle.absoluteWrapper}>
                            <PressableVectorIcon
                                onPress={() => {
                                    onPress();
                                }}
                                providerName={unfold ? "up" : "down"}
                                diameter={30}
                            />
                        </View>
                    </View>

                    {unfold && (
                        <WebView
                            style={{ height: contentHeight, width: size.width * 0.9 }}
                            originWhitelist={["*"]}
                            onMessage={handleMessage}
                            source={{
                                html: `<!DOCTYPE html>
                            <html>
                            <style> 
                            body {
                              font-size: 16px;
                            }
                            div {
                              color: #333;
                              font-size: 50px;
                            }
                            img {
                                width: 500px;
                                height: 500px;
                                object-fit: cover;
                                display:block;
                              }
                            </style>
                              <body>
                                ${props.content}
                                <script>
                                const height = Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight);
                                window.ReactNativeWebView.postMessage(height.toString());
                                 </script>
                              </body>
                            </html>`,
                            }}></WebView>
                    )}
                </View>
            </Pressable>
        </>
    );
}

export default OutlinedBox;
