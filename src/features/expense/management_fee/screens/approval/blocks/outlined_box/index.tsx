import { Pressable, View } from "react-native";
import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ApprovalDataConverter, ConvertedApprovalData } from "./converter_approval";
import OutlinedBoxProps from "./type";
import ExpenseApprovalRequiredModal from "../approval_require_modal";
import { Shadow } from "react-native-shadow-2";
import useExpenseApprovalOutlinedBoxStyles from "./style";
import Icon from "../../../../../../common/atoms/icon";

/**
 * @param OutlinedBoxProp
 * @description this componets are used by noti and complaint domains which are incharge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const styles = useExpenseApprovalOutlinedBoxStyles();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [convertedApprovals, setConvertedApprovals] = useState<ConvertedApprovalData | null>(null);

    useEffect(() => {
        const fetchData = () => {
            const converter = new ApprovalDataConverter(props.approvalRequest);
            const convertedData = converter.convert();

            if (convertedData !== null) {
                setConvertedApprovals(convertedData);
            }
        };
        fetchData();
    }, [props.approvalRequest]);

    return (
        <>
            {convertedApprovals !== null ? (
                <ExpenseApprovalRequiredModal
                    visible={modalVisible}
                    setVisible={setModalVisible}
                    convertedApprovalRequest={convertedApprovals}
                />
            ) : null}

            {convertedApprovals !== null ? (
                <View style={styles.container}>
                    <Pressable
                        onPressOut={() => {
                            setModalVisible(true);
                        }}>
                        <Shadow style={styles.innerBox} startColor={styles.shadowColor.color} distance={6}>
                            <View style={styles.contentBox}>
                                <Text style={styles.titleText}>{convertedApprovals.title}</Text>
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
