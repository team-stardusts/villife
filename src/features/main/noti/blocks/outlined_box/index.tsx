import { Dimensions, FlatList, ListRenderItemInfo, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import React, { useEffect } from "react";
import { LayoutAnimation } from "react-native";
import OutlinedBoxStyle from "./style";
import { OutlinedBoxProps } from "./type";
import NotiLable from "../noti_label.tsx";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import PressableVectorIcon from "../../../../common/blocks/icon/vector";

import NotiBottomEditModal from "../bottom_edit_modal";
import { EditIcon } from "../../../../common/atoms/icon/edit";
import useNotiOutlinedBoxStyles from "./style";

/**
 * @param OutlinedBoxProp
 * @description this componets are used by noti and complaint domains which are incharge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const styles = useNotiOutlinedBoxStyles();

    const [unfold, setUnfold] = React.useState(false);

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
                style={styles.container}>
                <View style={styles.innerBox}>
                    <View style={[styles.innerTitleSection, { borderBottomWidth: !unfold ? 0 : 2 }]}>
                        <NotiLable priority={props.priority} />
                        <View style={styles.titleTextBox}>
                            <Text>{props.title}</Text>
                            <Text>{props.wroteAt}</Text>
                        </View>
                        <View style={styles.absoluteWrapper}>
                            {unfold && (
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => {
                                        setEditModalVisible(true);
                                    }}>
                                    <EditIcon size={styles.iconEditSize as number} />
                                </TouchableOpacity>
                            )}
                            <PressableVectorIcon
                                onPress={() => {
                                    onPress();
                                }}
                                providerName={unfold ? "up" : "down"}
                                diameter={styles.iconVectorSize as number}
                            />
                        </View>
                    </View>

                    {unfold && (
                        <WebView
                            style={[styles.foldedContainer, { height: contentHeight }]}
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
