import { Dimensions, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import useBottomEditModalStyles from "./style";
import ApprovalRequiredModalProps from "./type";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useApprovalService from "../../services";
import { ApprovalEventEmitter } from "../outlined_box_list/event";

export default function ApprovalRequiredModal(props: ApprovalRequiredModalProps) {
    const messages = useScreenMessage();
    const service = useApprovalService();
    const styles = useBottomEditModalStyles();
    const { visible, setVisible, convertedApprovalRequest } = props;

    const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);

    useEffect(() => {
        if (!props.visible) setDeleteAlertVisible(false);
    }, []);

    // [TO-DO] : service에서 불러와서 사용
    const onRejectButtonPress = async () => {
        const result = await service.rejectUserApproval(props.convertedApprovalRequest.id);

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

    // [TO-DO] : service에서 불러와서 사용
    const onApcceptButtonPress = async () => {
        const result = await service.acceptUserApproval(props.convertedApprovalRequest.id);

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
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.textSection}>
                        <Text style={styles.title}>{convertedApprovalRequest.title}</Text>
                        <Text style={styles.subtitle}>{convertedApprovalRequest.subTitle}</Text>
                    </View>
                    {convertedApprovalRequest?.detailContent?.map((content, index) => {
                        return (
                            <View style={styles.childrenSection} key={index}>
                                <Text>{content.title}</Text>
                                <Text>{content.content}</Text>
                            </View>
                        );
                    })}
                    <View style={styles.leftButtonSection}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                setDeleteAlertVisible(true);
                            }}
                            style={styles.leftButton}>
                            <Text style={styles.leftButtonText}>{messages.messages.main.approval.reject}</Text>
                        </TouchableOpacity>
                        <StardustAlert
                            modalVisible={deleteAlertVisible}
                            setModalVisible={setDeleteAlertVisible}
                            title={messages.messages.main.approval.reject_title}
                            leftButtonText={messages.messages.words.cancle}
                            rightButtonText={messages.messages.main.approval.reject}
                            onPressLeftBtn={() => {
                                setDeleteAlertVisible(false);
                            }}
                            onPressRightBtn={() => {
                                onRejectButtonPress();
                            }}
                        />
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
