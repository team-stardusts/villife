import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import Toast from "react-native-toast-message";
import { NoticeEventEmitter } from "../../../noti/blocks/outlined_box_list/event";
import { useNavigation } from "@react-navigation/native";
import { DeleteNoticeParams } from "../../../../../libs/rest_apis/villife/notice/types";
import { VillifeNavigation } from "../../../../common/router/types";
import BottomSlidableModal from "../../../../common/blocks/universial/slidemodal_bottom";

import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import ReplyEditModalProps from "./type";
import useBottomEditModalStyles from "./style";
import { ComplaintEventEmitter } from "../../services/event";
import useComplaintService from "../../services";
import VillifeToastMessage from "../../../../common/atoms/toast";
import { EditIcon } from "../../../../common/atoms/icon/edit";
import { TrashCanIcon } from "../../../../common/atoms/icon/trash_can";

export default function ComplaintReplyEditModal(props: ReplyEditModalProps) {
    const styles = useBottomEditModalStyles();

    const screenSize = Dimensions.get("window");
    const [deleteAlertVisible, setDeleteAlertVisible] = React.useState(false);
    const service = useComplaintService();

    React.useEffect(() => {
        if (!props.visible) setDeleteAlertVisible(false);
    }, []);

    const onModifyButtonPress = async () => {
        const emitter = new ComplaintEventEmitter();
        emitter.emitReplyModificationEvent(props.replyInfo);
        props.setVisible(false);
    };
    const onDeleteButtonPress = async () => {
        const result = await service.DeleteReply(props.replyInfo.id);
        if (!result.isSuccessful) {
            VillifeToastMessage.showBottomToast("error", "답글 삭제에 실패했습니다");
            setDeleteAlertVisible(false);
            return props.setVisible(false);
        }
        const emitter = new ComplaintEventEmitter();
        emitter.emitListUpdatedEvent();
        setDeleteAlertVisible(false);
        props.setVisible(false);
    };

    return (
        <BottomSlidableModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            height={screenSize.height * 0.3}>
            <View style={styles.editModalContentContainer}>
                <TouchableOpacity
                    onPress={() => {
                        onModifyButtonPress();
                    }}
                    style={styles.editModalMenu}>
                    <EditIcon size={30} />
                    <Text style={[styles.editModalMenuText, { fontSize: 20 }]}>수정하기</Text>
                    {/* font scaling 필요*/}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setDeleteAlertVisible(true);
                    }}
                    style={styles.editModalMenu}>
                    <TrashCanIcon size={30} />
                    <Text style={[styles.editModalMenuText, { fontSize: 20 }]}>삭제하기</Text>
                    {/* font scaling 필요*/}
                </TouchableOpacity>

                <StardustAlert
                    modalVisible={deleteAlertVisible}
                    setModalVisible={setDeleteAlertVisible}
                    title="정말 삭제 하시겠어요?"
                    leftButtonText="취소"
                    rightButtonText="삭제"
                    onPressLeftBtn={() => {
                        setDeleteAlertVisible(false);
                    }}
                    onPressRightBtn={() => {
                        onDeleteButtonPress();
                    }}
                />
            </View>
        </BottomSlidableModal>
    );
}
