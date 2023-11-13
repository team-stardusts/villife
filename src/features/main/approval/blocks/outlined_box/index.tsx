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
import { Shadow } from "react-native-shadow-2";
import Icon from "../../../../common/atoms/icon";

/**
 * @param OutlinedBoxProp
 * @description this componets are used by noti and complaint domains which are incharge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const styles = useApprovalOutlinedBoxStyle();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [convertedApprovals, setConvertedApprovals] = useState<ConvertedApprovalData | null>(null);

    useEffect(() => {
        const fetchData = () => {
            const converter = new ApprovalDataConverter(props.approvalRequest);
            const convertedData = converter.convert();
            setConvertedApprovals(convertedData);
            console.log("[OutLinedBox] : ", convertedData);
        };
        fetchData();
    }, [props.approvalRequest]);

    return (
        <>
            {convertedApprovals !== null ? (
                <ApprovalRequiredModal
                    visible={modalVisible}
                    setVisible={setModalVisible}
                    convertedApprovalRequest={convertedApprovals}
                />
            ) : null}
            {convertedApprovals !== null ? (
                <View style={styles.boxContainer}>
                    <Pressable
                        onPressOut={() => {
                            setModalVisible(true);
                        }}>
                        <Shadow style={styles.boxInner} startColor={styles.shadowColor.color} distance={6}>
                            <View style={styles.contentBetween}>
                                <View style={styles.contentContainer}>
                                    <Text style={styles.titleText}>{convertedApprovals.title}</Text>
                                    <View style={styles.contentRow}>
                                        <View style={styles.miniContentRow}>
                                            <Icon
                                                name={"building"}
                                                size={styles.buildingIcon.width}
                                                color={styles.buildingIcon.color}
                                            />

                                            <Text style={styles.subText}>{convertedApprovals.buildingName}</Text>
                                        </View>
                                        <View style={[styles.miniContentRow, styles.miniContentMargin]}>
                                            <Icon
                                                name={"person"}
                                                size={styles.userIcon.width}
                                                color={styles.userIcon.color}
                                            />
                                            <Text style={styles.subText}>{convertedApprovals.roomNumber}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.moreButton}>
                                    <Icon
                                        name={"three-dots-vertical"}
                                        size={styles.moreIcon.width}
                                        color={styles.moreIcon.color}
                                    />
                                </View>
                            </View>
                        </Shadow>
                    </Pressable>
                </View>
            ) : null}
        </>
    );
}

export default OutlinedBox;
