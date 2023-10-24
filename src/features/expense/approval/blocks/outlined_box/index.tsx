import { Pressable, View } from "react-native";
import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ApprovalDataConverter, ConvertedApprovalData } from "./converter_approval";
import IconMoreVertical from "../../../../common/atoms/icon/more_vertical";
import OutlinedBoxProps from "./type";
import ExpenseApprovalRequiredModal from "../approval_require_modal";
import { Shadow } from "react-native-shadow-2";
import useExpenseApprovalOutlinedBoxStyles from "./style";
import Icon from "../../../../common/atoms/icon";

/**
 * @param OutlinedBoxProp
 * @description this componets are used by noti and complaint domains which are incharge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const styles = useExpenseApprovalOutlinedBoxStyles();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [convertedApprovals, setConvertedApprovals] = useState<ConvertedApprovalData>({} as ConvertedApprovalData);

    useEffect(() => {
        const fetchData = () => {
            const converter = new ApprovalDataConverter(props.approvalRequest);
            const convertedData = converter.convert();
            setConvertedApprovals(convertedData);
            console.log(convertedData);
        };
        fetchData();
    }, [props.approvalRequest]);

    return (
        <>
            <ExpenseApprovalRequiredModal
                visible={modalVisible}
                setVisible={setModalVisible}
                convertedApprovalRequest={convertedApprovals}
            />
            <Shadow style={styles.container} distance={4}>
                <View style={styles.innerBox}>
                    <Pressable
                        onPressOut={() => {
                            setModalVisible(true);
                        }}
                        style={styles.innerTitleSection}>
                        <View style={styles.contentBox}>
                            <View style={styles.titleTextBox}>
                                <Text style={styles.titleText}>{convertedApprovals.title}</Text>
                            </View>
                            <View style={styles.absoluteWrapper}>
                                <View style={styles.iconBox}>
                                    <View style={styles.moreButton}>
                                        <Icon
                                            name={"three-dots-vertical"}
                                            size={styles.moreIcon.width}
                                            color={styles.moreIcon.color}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </Shadow>
        </>
    );
}

export default OutlinedBox;
