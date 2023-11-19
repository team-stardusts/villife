import { Dimensions, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import StardustModal from "../../../../../../common/blocks/universial/stardust_modal";
import useBottomEditModalStyles from "./style";
import ApprovalRequiredModalProps from "./type";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import useApprovalService from "../../services";
import { ApprovalEventEmitter } from "../outlined_box_list/event";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../../common/router/types";

export default function ExpenseApprovalRequiredModal(props: ApprovalRequiredModalProps) {
    const messages = useScreenMessage();
    const service = useApprovalService();
    const styles = useBottomEditModalStyles();
    //const navigation = useNavigation<VillifeNavigation>();

    const { visible, setVisible, convertedApprovalRequest } = props;
    const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);

    useEffect(() => {
        if (!props.visible) setDeleteAlertVisible(false);
    }, []);

    /*   const currentMonthDetailBtn = () => {
        navigation.navigate("management_fee_current_month_detail", {
            unpaidFee: 100,
        });
    }; */

    const onRejectButtonPress = async () => {
        const result = await service.rejectExpenseApproval(convertedApprovalRequest ? convertedApprovalRequest.id : 0);

        if (result.isSuccessful) {
            new ApprovalEventEmitter().emitListUpdatedEvent();
            setVisible(false);
            setDeleteAlertVisible(false);
            console.log("[approvalReJect]", result.data?.data);
            Toast.show({
                type: "success",
                text1: messages.messages.main.approval.reject_success,
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 100,
            });
        } else {
            console.log("[approvalReJect]", result.data?.data);
            Toast.show({
                type: "error",
                text1: messages.messages.main.approval.reject_error,
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 100,
            });
        }
    };

    const onApcceptButtonPress = async () => {
        const result = await service.acceptExpenseApproval(convertedApprovalRequest ? convertedApprovalRequest.id : 0);

        if (result.isSuccessful) {
            new ApprovalEventEmitter().emitListUpdatedEvent();
            setVisible(false);
            console.log("[approvalAccept]", result.data?.data);
            Toast.show({
                type: "success",
                text1: messages.messages.main.approval.accept_success,
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 100,
            });
        } else {
            console.log("[approvalAccept]", result.data?.data);
            Toast.show({
                type: "error",
                text1: messages.messages.main.approval.accept_error,
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 100,
            });
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
            onRequestClose={() => {
                setVisible(!props.visible);
            }}
            style={[styles.wrapper, styles.wrapperTop]}>
            <StardustModal
                modalVisible={deleteAlertVisible}
                setModalVisible={setDeleteAlertVisible}
                title={messages.messages.main.approval.reject_title}
                buttons={[
                    {
                        text: messages.messages.words.cancle,
                        onPress: () => setDeleteAlertVisible(false),
                    },
                    {
                        text: messages.messages.main.approval.reject,
                        onPress: () => onRejectButtonPress(),
                    },
                ]}
            />
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.textSection}>
                        <Text style={styles.title}>{convertedApprovalRequest.title}</Text>
                        <Text style={styles.subtitle}>{convertedApprovalRequest.subTitle}</Text>
                    </View>
                    {convertedApprovalRequest?.detailContent?.map((content, index) => {
                        return (
                            <View style={styles.childrenSection} key={index}>
                                <Text style={styles.rightContentText}>{content.title}</Text>
                                <Text style={styles.leftContentText}>{content.content}</Text>
                            </View>
                        );
                    })}
                    {/* 추후 결정하자
                    <TouchableOpacity
                        style={styles.notedTextButton}
                        onPress={() => {
                            setVisible(false);
                            currentMonthDetailBtn();
                        }}>
                        <Text style={styles.notedText}>상세내역</Text>
                        <Icon name="arrow-right" size={styles.linkIcon.width} color={styles.linkIcon.color} />
                    </TouchableOpacity> */}
                    <View style={styles.leftButtonSection}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                setDeleteAlertVisible(true);
                            }}
                            style={styles.leftButton}>
                            <Text style={styles.leftButtonText}>{messages.messages.main.approval.reject}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                onApcceptButtonPress();
                            }}
                            style={styles.rightButton}>
                            <Text style={styles.rightButtonText}>{messages.messages.main.approval.accept}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Pressable style={styles.wrapper} onPress={() => setVisible(false)} />
            </View>
        </Modal>
    );
}
