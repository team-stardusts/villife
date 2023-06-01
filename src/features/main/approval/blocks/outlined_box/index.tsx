import { Dimensions, FlatList, ListRenderItemInfo, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedBoxStyle from "./style";
import { OutlinedBoxProps } from "./type";
import PressableVectorIcon from "../../../../common/blocks/icon/vector";
import { EditIcon } from "../../../../common/blocks/icon/noti";
import ApprovalRequiredModal from "../approval_require_modal";
import ApprovalLable from "../approval_label.tsx";
import { Approval, getApprovalsResult } from "../../../../../libs/rest_apis/villife/approval/types";
import IconPlus from "../../../../common/atoms/icon/plus";
import Icon from "../../../../common/atoms/icon";
import { ApprovalDataConverter, ConvertedApprovalData } from "./converter_approval";

/**
 * @param OutlinedBoxProp
 * @description this componets are used by noti and complaint domains which are incharge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const size = Dimensions.get("window");

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [convertedApprovals, setConvertedApprovals] = useState<ConvertedApprovalData>({} as ConvertedApprovalData);

    useEffect(() => {
        const converter = new ApprovalDataConverter(props.approvalRequest);
        setConvertedApprovals(converter.convert());
    }, []);

    return (
        <>
            <ApprovalRequiredModal
                visible={modalVisible}
                setVisible={setModalVisible}
                convertedApprovalRequest={convertedApprovals}
            />
            <Pressable
                onPressOut={() => {
                    setModalVisible(true);
                }}
                style={[OutlinedBoxStyle.container, { minHeight: size.height * 0.1 * 0.8, width: size.width * 0.9 }]}>
                <View style={OutlinedBoxStyle.innerBox}>
                    <View
                        style={[
                            OutlinedBoxStyle.innerTitleSection,
                            {
                                height: size.height * 0.1 * 0.8,
                            },
                        ]}>
                        <View style={OutlinedBoxStyle.titleTextBox}>
                            <Text style={[]}>{convertedApprovals.title}</Text>
                            <Text style={[]}>{convertedApprovals.buildingName}</Text>
                        </View>
                        <View style={OutlinedBoxStyle.absoluteWrapper}>
                            <View style={{ flexDirection: "row" }}>
                                <PressableVectorIcon
                                    onPress={() => {
                                        setModalVisible(true);
                                    }}
                                    providerName={"down"}
                                    diameter={30}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        </>
    );
}

export default OutlinedBox;
