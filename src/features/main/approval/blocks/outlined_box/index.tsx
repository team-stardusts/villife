import { Dimensions, Pressable, View } from "react-native";
import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedBoxStyle from "./style";
import { OutlinedBoxProps } from "./type";
import ApprovalRequiredModal from "../approval_require_modal";
import { ApprovalDataConverter, ConvertedApprovalData } from "./converter_approval";
import IconMoreVertical from "../../../../common/atoms/icon/more_vertical";

/**
 * @param OutlinedBoxProp
 * @description this componets are used by noti and complaint domains which are incharge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const size = Dimensions.get("window");

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [convertedApprovals, setConvertedApprovals] = useState<ConvertedApprovalData>({} as ConvertedApprovalData);

    useEffect(() => {
        const fetchData = () => {
            const converter = new ApprovalDataConverter(props.approvalRequest);
            const convertedData = converter.convert();
            setConvertedApprovals(convertedData);
            console.log("TLqkf", convertedData);
        };
        fetchData();
    }, [props.approvalRequest]);

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
                            <Text style={[]}>{convertedApprovals.roomNumber}</Text>
                        </View>
                        <View style={OutlinedBoxStyle.absoluteWrapper}>
                            <View style={{ flexDirection: "row" }}>
                                <Pressable
                                    onPress={() => {
                                        setModalVisible(true);
                                    }}>
                                    <IconMoreVertical color="black" size={30} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        </>
    );
}

export default OutlinedBox;
