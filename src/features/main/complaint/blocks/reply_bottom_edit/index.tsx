import React from "react";
import ReplyEditModalProps from "./type";
import { ComplaintEventEmitter } from "../../services/event";
import useComplaintService from "../../services";
import VillifeToastMessage from "../../../../common/atoms/toast";
import ListBottomSlidableModal from "../../../../common/blocks/bottom_list_modal";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";

export default function ComplaintReplyEditModal(props: ReplyEditModalProps) {
    const [alert, setAlert] = React.useState<StardustAlertContent>({
        type: "warning",
        title: "정말로 삭제하시겠습니까?",
        message: "삭제한 댓글은 복구할 수 없습니다.",
        visible: false,
    });
    const service = useComplaintService();

    const onModifyButtonPress = async () => {
        const emitter = new ComplaintEventEmitter();
        emitter.emitReplyModificationEvent(props.replyInfo);
        props.setVisible(false);
    };
    const onDeleteButtonPress = async () => {
        const result = await service.deleteReply(props.replyInfo.id);
        if (!result.isSuccessful) {
            VillifeToastMessage.showBottomToast("error", "답글 삭제에 실패했습니다");
            setAlertUnvisiable();
            return props.setVisible(false);
        }

        const emitter = new ComplaintEventEmitter();
        emitter.emitListUpdatedEvent();
        setAlertUnvisiable();
    };

    const setAlertUnvisiable = () => {
        setAlert({
            ...alert,
            visible: false,
        });
    };

    return (
        <>
            <ListBottomSlidableModal
                modalVisible={props.visible}
                setModalVisible={props.setVisible}
                features={[
                    {
                        icon: "pencil",
                        text: "수정하기",
                        onPress: () => onModifyButtonPress(),
                    },
                    {
                        icon: "trash-can",
                        text: "삭제하기",
                        onPress: () => {
                            props.setVisible(false);

                            setAlert({
                                ...alert,
                                visible: true,
                                buttons: [
                                    {
                                        text: "취소",
                                        onPress: () => setAlertUnvisiable(),
                                    },
                                    {
                                        text: "삭제",
                                        onPress: () => onDeleteButtonPress(),
                                    },
                                ],
                            });
                        },
                    },
                ]}
            />
            <StardustAlert {...alert} setAlert={setAlert} />
        </>
    );
}

/* <BottomSlidableModal
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
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setDeleteAlertVisible(true);
                    }}
                    style={styles.editModalMenu}>
                    <IconTrashCan size={30} />
                    <Text style={[styles.editModalMenuText, { fontSize: 20 }]}>삭제하기</Text>
                </TouchableOpacity>

                <StardustModal
                    modalVisible={deleteAlertVisible}
                    setModalVisible={setDeleteAlertVisible}
                    title="정말 삭제 하시겠어요?"
                    buttons={[
                        {
                            text: messages.messages.words.cancle,
                            onPress: () => setDeleteAlertVisible(false),
                        },
                        {
                            text: messages.messages.words.delete,
                            onPress: () => onDeleteButtonPress(),
                        },
                    ]}
                />
            </View>
        </BottomSlidableModal> 
        */
