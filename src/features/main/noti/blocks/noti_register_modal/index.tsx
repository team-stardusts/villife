import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import BottomSlidableModal from "../../../../common/blocks/universial/slidemodal_bottom";
import ReplyEditModalProps from "./type";
import IconTag from "../../../../common/atoms/icon/tag";
import useBottomEditModalStyles from "./styles";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useStyler from "../../../../common/hooks/styler/hooks";
import useNoticeService from "../../services";
import useUserInfoService from "../../../../common/hooks/service/user_info";
import { ContentPriority } from "../noti_label.tsx/type";

export default function NotiRegisterModal(props: ReplyEditModalProps) {
    const message = useScreenMessage();
    const styles = useBottomEditModalStyles();
    const { deviceUI, theme } = useStyler();

    return (
        <BottomSlidableModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            height={deviceUI.getScreenSize().height * 0.28}>
            <View style={styles.editModalContentContainer}>
                <TouchableOpacity
                    onPress={() => {
                        props.onPrioritySubmit(1);
                    }}
                    style={styles.editModalMenu}>
                    <IconTag size={24} />
                    <Text style={[styles.editModalMenuText]}>{message.messages.main.noti.noti_important_modal}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.onPrioritySubmit(3);
                    }}
                    style={styles.editModalMenu}>
                    <IconTag size={24} />
                    <Text style={[styles.editModalMenuText]}>{message.messages.main.noti.noti_general_modal}</Text>
                </TouchableOpacity>
            </View>
        </BottomSlidableModal>
    );
}
