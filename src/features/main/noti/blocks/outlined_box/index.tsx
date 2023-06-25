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
import AutoHeightWebView from "react-native-autoheight-webview";
import RemoteCSS from "../../../../../libs/themes/remote_css";
import useUserInfoService from "../../../../common/hooks/service/user_info";
import { AUTHORITY } from "../../../../common/hooks/service/user_info/constant";

/**
 * @param OutlinedBoxProp
 * @description this componets are used by noti and complaint domains which are incharge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const styles = useNotiOutlinedBoxStyles();
    const userInfo = useUserInfoService();

    const [unfold, setUnfold] = React.useState(false);
    const [editModalVisible, setEditModalVisible] = React.useState(false);
    const lock = React.useRef(false);

    useEffect(() => {
        return () => {
            console.log("unmount", props.title);
            setEditModalVisible(false);
        };
    }, []);

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
                        <View style={styles.contentBox}>
                            <NotiLable priority={props.priority} />
                            <View style={styles.titleTextBox}>
                                <Text>{props.title}</Text>
                                <Text>{props.wroteAt}</Text>
                            </View>
                            <View style={styles.absoluteWrapper}>
                                <View style={styles.iconBox}>
                                    {unfold && userInfo.basicInfo?.authority == AUTHORITY.ADMIN ? (
                                        <TouchableOpacity
                                            style={styles.editButton}
                                            onPress={() => {
                                                setEditModalVisible(true);
                                            }}>
                                            <EditIcon size={styles.iconEditSize.width as number} />
                                        </TouchableOpacity>
                                    ) : (
                                        <></>
                                    )}
                                    <PressableVectorIcon
                                        onPress={() => {
                                            onPress();
                                        }}
                                        providerName={unfold ? "up" : "down"}
                                        diameter={styles.iconVectorSize.width as number}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    {unfold && (
                        <AutoHeightWebView
                            style={styles.foldedContainer}
                            // [TO-DO] : 글꼴이랑 색상 양식에 맞게 변경
                            customStyle={`${RemoteCSS.getPretendardRegular()}
                                        body {
                                          font-size: 14px;
                                          font-family:"Pretendard-Regular";
                                        }
                                        div {
                                          color: #333; 
                                          
                                        }
                                        img {
                                            width: 50vw !important;
                                            height: 50vw !important;
                                            object-fit: cover;
                                            display:block;
                                            border-radius: 15px;
                                          }`}
                            source={{ html: props.content }}
                            scalesPageToFit={false}
                            viewportContent={"width=device-width, user-scalable=no"}></AutoHeightWebView>
                    )}
                </View>
            </Pressable>
        </>
    );
}

export default OutlinedBox;
