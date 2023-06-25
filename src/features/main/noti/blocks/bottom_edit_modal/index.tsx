import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import Toast from "react-native-toast-message";
import { NoticeEventEmitter } from "../outlined_box_list/event";
import { useNavigation } from "@react-navigation/native";
import { DeleteNoticeParams } from "../../../../../libs/rest_apis/villife/notice/types";
import { VillifeNavigation } from "../../../../common/router/types";
import BottomSlidableModal from "../../../../common/blocks/universial/slidemodal_bottom";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import BottomEditModalProps from "./type";
import useBottomEditModalStyles from "./style";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import { EditIcon } from "../../../../common/atoms/icon/edit";
import { TrashCanIcon } from "../../../../common/atoms/icon/trash_can";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function NotiBottomEditModal(props: BottomEditModalProps) {
    const styles = useBottomEditModalStyles();
    const messages = useScreenMessage();
    // [TO-DO] : 밑에 수정
    const { deviceUI } = useStyler();
    const screenSize = Dimensions.get("window");
    const navigation = useNavigation<VillifeNavigation>();
    const [deleteAlertVisible, setDeleteAlertVisible] = React.useState(false);

    React.useEffect(() => {
        if (!props.visible) setDeleteAlertVisible(false);
    }, []);

    const onDeleteButtonPress = async () => {
        const notifier = VillifeServer.getNoticeManager();

        const dto: DeleteNoticeParams = {
            building_id: 3,
            notice_id: props.noticeInfo.id,
        };
        const result = await notifier.deleteNotice(dto);

        if (result.isSuccessful) {
            new NoticeEventEmitter().emitListUpdatedEvent();
            props.setVisible(false);
            setDeleteAlertVisible(false);
            Toast.show({
                type: "success",
                text1: messages.messages.main.noti.delete_success,
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 100,
            });
        } else {
            Toast.show({
                type: "error",
                text1: messages.messages.main.noti.delete_error,
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 100,
            });
        }
    };

    return (
        <BottomSlidableModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            height={screenSize.height * 0.3}>
            <View style={styles.editModalContentContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("noti_modify", {
                            title: props.noticeInfo.title,
                            content: props.noticeInfo.content,
                            notiID: props.noticeInfo.id,
                        });
                    }}
                    style={styles.editModalMenu}>
                    <EditIcon size={styles.iconSize.width as number} />
                    <Text style={styles.editModalMenuText}>{messages.messages.main.noti.modify}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setDeleteAlertVisible(true);
                    }}
                    style={styles.editModalMenu}>
                    <TrashCanIcon size={styles.iconSize.width as number} />
                    <Text style={styles.editModalMenuText}>{messages.messages.main.noti.delete}</Text>
                </TouchableOpacity>

                <StardustAlert
                    modalVisible={deleteAlertVisible}
                    setModalVisible={setDeleteAlertVisible}
                    title={messages.messages.main.noti.screen_title}
                    leftButtonText={messages.messages.words.cancle}
                    rightButtonText={messages.messages.words.delete}
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
