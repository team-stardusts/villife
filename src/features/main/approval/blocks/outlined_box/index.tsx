import { Dimensions, FlatList, ListRenderItemInfo, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import React, { useEffect } from "react";
import { LayoutAnimation } from "react-native";
import OutlinedBoxStyle from "./style";
import { OutlinedBoxProps } from "./type";

import WebView, { WebViewMessageEvent } from "react-native-webview";

import PressableVectorIcon from "../../../../common/blocks/icon/vector";
import { EditIcon } from "../../../../common/blocks/icon/noti";
import ApprovalRequiredModal from "../approval_require_modal";
import ApprovalLable from "../approval_label.tsx";

/**
 * @param OutlinedBoxProp
 * @description this componets are used by noti and complaint domains which are incharge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
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

    return (
        <>
            <ApprovalRequiredModal visible={editModalVisible} setVisible={setEditModalVisible} noticeInfo={props} />
            <Pressable
                onPressOut={() => {}}
                style={[OutlinedBoxStyle.container, { minHeight: size.height * 0.1 * 0.8, width: size.width * 0.9 }]}>
                <View style={OutlinedBoxStyle.innerBox}>
                    <View
                        style={[
                            OutlinedBoxStyle.innerTitleSection,
                            {
                                height: size.height * 0.1 * 0.8,
                                borderBottomWidth: 0,
                                borderBottomColor: "#0B75F2",
                            },
                        ]}>
                        <ApprovalLable building_name={props.building_name} />
                        <View style={OutlinedBoxStyle.titleTextBox}>
                            <Text style={[]}>{props.title}</Text>
                        </View>
                        <View style={OutlinedBoxStyle.absoluteWrapper}>
                            <PressableVectorIcon onPress={() => {}} providerName={"up"} diameter={30} />
                        </View>
                    </View>
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
                </View>
            </Pressable>
        </>
    );
}

export default OutlinedBox;
