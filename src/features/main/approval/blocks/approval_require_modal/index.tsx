import { Dimensions, Modal, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import useBottomEditModalStyles from "./style";
import ApprovalRequiredModalProps from "./type";
import { AcceptApprovalParams, RejectApprovalParams } from "../../../../../libs/rest_apis/villife/approval/types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export default function ApprovalRequiredModal(props: ApprovalRequiredModalProps) {
    const messages = useScreenMessage();

    const screenSize = Dimensions.get("window");
    const styles = useBottomEditModalStyles();
    const { visible, setVisible, convertedApprovalRequest } = props;

    const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);

    useEffect(() => {
        if (!props.visible) setDeleteAlertVisible(false);
    }, []);

    const onRejectButtonPress = async () => {
        const notifier = VillifeServer.getApprovalManager();

        const dto: RejectApprovalParams = {
            id: convertedApprovalRequest.id,
        };
        const result = await notifier.rejectUserApproval(dto);

        if (result.isSuccessful) {
            setVisible(false);
            setDeleteAlertVisible(false);
            Toast.show({
                type: "success",
                text1: messages.messages.main.approval.reject_success,
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 100,
            });
        } else {
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
        const notifier = VillifeServer.getApprovalManager();

        const dto: AcceptApprovalParams = {
            id: convertedApprovalRequest.id,
        };
        const result = await notifier.rejectUserApproval(dto);

        if (result.isSuccessful) {
            setVisible(false);
            Toast.show({
                type: "success",
                text1: messages.messages.main.approval.accept_success,
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 100,
            });
        } else {
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
                <View style={styles.wrapper} />
            </View>
        </Modal>
    );
}
