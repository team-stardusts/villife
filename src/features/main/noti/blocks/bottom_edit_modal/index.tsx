import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import { NoticeEventEmitter } from "../outlined_box_list/event";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import BottomSlidableModal from "../../../../common/blocks/universial/slidemodal_bottom";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import BottomEditModalProps from "./type";
import useBottomEditModalStyles from "./style";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import { EditIcon } from "../../../../common/atoms/icon/edit";
import { TrashCanIcon } from "../../../../common/atoms/icon/trash_can";
import useStyler from "../../../../common/hooks/styler/hooks";
import useNoticeService from "../../services";
import useUserInfoService from "../../../../common/hooks/service/user_info";

export default function NotiBottomEditModal(props: BottomEditModalProps) {
    const userInfo = useUserInfoService();
    const styles = useBottomEditModalStyles();
    const messages = useScreenMessage();
    const service = useNoticeService();
    const { deviceUI, theme } = useStyler();
    const navigation = useNavigation<VillifeNavigation>();
    const [deleteAlertVisible, setDeleteAlertVisible] = React.useState(false);

    React.useEffect(() => {
        if (!props.visible) setDeleteAlertVisible(false);
    }, []);

    const onDeleteButtonPress = async () => {
        console.log(userInfo);
        if (userInfo.adminInfo?.selectedBuilding.id && userInfo.basicInfo?.authority) {
            const result = await service.deleteNotice({
                building_id: userInfo.adminInfo?.selectedBuilding.id,
                notice_id: props.noticeInfo.id,
            });
            console.log("delete : ", result);
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
        }
    };

    return (
        <BottomSlidableModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            height={deviceUI.getScreenSize().height * 0.2}>
            <View style={styles.editModalContentContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("noti_modify", {
                            title: props.noticeInfo.title,
                            content: props.noticeInfo.content,
                            notiID: props.noticeInfo.id,
                            priority: props.noticeInfo.priority,
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
                    title={messages.messages.main.noti.delete_title}
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
