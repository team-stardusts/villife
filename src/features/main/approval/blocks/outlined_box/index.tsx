import { Dimensions, Pressable, View } from "react-native";
import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import ApprovalRequiredModal from "../approval_require_modal";
import { ApprovalDataConverter, ConvertedApprovalData } from "./converter_approval";
import IconMoreVertical from "../../../../common/atoms/icon/more_vertical";
import IconBuilding from "../../../../common/atoms/icon/building";
import useApprovalOutlinedBoxStyle from "./style";
import OutlinedBoxProps from "./type";
import IconUserBorder from "../../../../common/atoms/icon/user_border";

/**
 * @param OutlinedBoxProp
 * @description this componets are used by noti and complaint domains which are incharge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const styles = useApprovalOutlinedBoxStyle();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [convertedApprovals, setConvertedApprovals] = useState<ConvertedApprovalData>({} as ConvertedApprovalData);
    // [TO-DO] : convert 안에 밑에 기능을 할 수 있게 하자
    useEffect(() => {
        const fetchData = () => {
            const converter = new ApprovalDataConverter(props.approvalRequest);
            const convertedData = converter.convert();
            setConvertedApprovals(convertedData);
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
                style={styles.container}>
                <View style={styles.innerBox}>
                    <View style={styles.innerTitleSection}>
                        <View style={styles.titleTextBox}>
                            <Text style={styles.titleText}>{convertedApprovals.title}</Text>
                            <View style={styles.subContainerBox}>
                                <View style={styles.subInnerBox}>
                                    <IconBuilding size={styles.iconBuildingSize.width as number} />
                                    <Text style={styles.subText}>{convertedApprovals.buildingName}</Text>
                                </View>
                                <View style={styles.subInnerBox}>
                                    <IconUserBorder size={styles.iconUserSize.width as number} />
                                    <Text style={styles.subText}>{convertedApprovals.roomNumber}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.absoluteWrapper}>
                            <Pressable
                                onPress={() => {
                                    setModalVisible(true);
                                }}>
                                <IconMoreVertical size={styles.iconMoreSize.width as number} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Pressable>
        </>
    );
}

export default OutlinedBox;
