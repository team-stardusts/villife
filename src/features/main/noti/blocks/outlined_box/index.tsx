import { Dimensions, FlatList, ListRenderItemInfo, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import React, { useEffect } from "react";
import { LayoutAnimation } from "react-native";
import OutlinedBoxStyle from "./style";
import { OutlinedBoxProps } from "./type";
import NotiLable from "../noti_label.tsx";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import NotiBottomEditModal from "../../../complaint/blocks/bottom_edit_modal";
import PressableVectorIcon from "../../../../common/blocks/icon/vector";
import { EditIcon } from "../../../../common/blocks/icon/noti";

/**
 * @param OutlinedBoxProp
 * @description this componets are used by noti and complaint domains which are incharge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const [unfold, setUnfold] = React.useState(false);
    const size = Dimensions.get("window");

    const [contentHeight, setContentHeight] = React.useState(0);
    const [editModalVisible, setEditModalVisible] = React.useState(false);
    const lock = React.useRef(false);

    useEffect(() => {
        return () => {
            console.log("unmount", props.title);
            setEditModalVisible(false);
        };
    }, []);

    const handleMessage = (event: WebViewMessageEvent) => {
        const height = Number(event.nativeEvent.data);

        if (lock.current) return;
        if (height > 0) {
            setContentHeight(height / 3);
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
            <NotiBottomEditModal visible={editModalVisible} setVisible={setEditModalVisible} noticeInfo={props} />
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
                        <View style={[OutlinedBoxStyle.editButtonContainer, { top: size.height * 0.09 }]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setEditModalVisible(true);
                                }}
                                style={OutlinedBoxStyle.editButton}>
                                <EditIcon color="#2778D7" diameter={14} />
                                <Text>편집하기</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {unfold && (
                        <WebView
                            style={{ height: contentHeight, width: size.width * 0.8 }}
                            originWhitelist={["*"]}
                            onMessage={handleMessage}
                            source={{
                                html: `<!DOCTYPE html>
                            <html>
                            <style> 
                            body {
                              font-size: 50px;
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
