import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import Toast from "react-native-toast-message";

import { useNavigation } from "@react-navigation/native";
import { DeleteNoticeParams } from "../../../../../libs/rest_apis/villife/notice/types";
import { VillifeNavigation } from "../../../../common/router/types";
import BottomSlidableModal from "../../../../common/blocks/universial/slidemodal_bottom";
import { EditIcon, TrashCanIcon } from "../../../../common/blocks/icon/noti";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import useBottomEditModalStyles from "./style";
import ApprovalRequiredModalProps from "./type";
import { AcceptApprovalParams, RejectApprovalParams } from "../../../../../libs/rest_apis/villife/approval/types";
import useApprovalService from "../../services";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function ApprovalRequiredModal(props: ApprovalRequiredModalProps) {
    const screenSize = Dimensions.get("window");
    const styles = useBottomEditModalStyles();
    const { visible, setVisible, convertedApprovalRequest } = props;
    const service = useApprovalService();

    const navigation = useNavigation<VillifeNavigation>();
    const [deleteAlertVisible, setDeleteAlertVisible] = React.useState(false);

    React.useEffect(() => {
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
                text1: `요청 거절 성공`,
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 100,
            });
        } else {
            Toast.show({
                type: "error",
                text1: `요청 거절 실패`,
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
                text1: `요청 승락 성공`,
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 100,
            });
        } else {
            Toast.show({
                type: "error",
                text1: `요청 승락 실패`,
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
            style={[{ width: screenSize.width, height: screenSize.height }, styles.wrapper]}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={[styles.textSection, { height: screenSize.height * 0.1 }]}>
                        <Text style={styles.title}>{convertedApprovalRequest.title}</Text>
                        <Text style={styles.subtitle}>{convertedApprovalRequest.subTitle}</Text>
                    </View>
                    {convertedApprovalRequest?.detailContent?.map((content) => {
                        return (
                            <View style={styles.childrenSection}>
                                <Text>{content.title}</Text>
                                <Text>{content.content}</Text>
                            </View>
                        );
                    })}
                    <View style={[styles.buttonSection, { height: screenSize.height * 0.07, marginBottom: 20 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                setDeleteAlertVisible(true);
                            }}
                            style={styles.editModalMenu}>
                            <TrashCanIcon color="#000000" diameter={30} />
                            <Text style={[styles.editModalMenuText, { fontSize: 20 }]}>거절</Text>
                        </TouchableOpacity>

                        <StardustAlert
                            modalVisible={deleteAlertVisible}
                            setModalVisible={setDeleteAlertVisible}
                            title={convertedApprovalRequest.title}
                            leftButtonText="취소"
                            rightButtonText="거절"
                            leftOnPress={() => {
                                setDeleteAlertVisible(false);
                            }}
                            rightOnPress={() => {
                                onRejectButtonPress();
                            }}
                        />
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                onApcceptButtonPress();
                            }}
                            style={styles.rightButton}>
                            <Text style={styles.rightButtonText}>수락</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.wrapper} />
            </View>
        </Modal>
    );
}
