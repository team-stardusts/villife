import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import BottomSlidableModal from "../../../../common/blocks/universial/slidemodal_bottom";
import ReplyEditModalProps from "./type";
import IconTag from "../../../../common/atoms/icon/tag";
import useBottomEditModalStyles from "./styles";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useStyler from "../../../../common/hooks/styler/hooks";
import useNoticeService from "../../services";
import useUserInfoService from "../../../../common/hooks/service/user_info";
import { ContentPriority } from "../noti_label.tsx/type";
import { CreateNoticeParams } from "../../../../../libs/rest_apis/villife/notice/types";
import NavigationWithProps from "./type";

export default function NotiRegisterModal(props: NavigationWithProps) {
    const message = useScreenMessage();
    const styles = useBottomEditModalStyles();
    const userInfo = useUserInfoService();
    const service = useNoticeService();
    const { deviceUI, theme } = useStyler();

    const onPrioritySubmit = async (priority: number) => {
        props.setVisible(false);
        console.log(priority);

        if (priority && userInfo.adminInfo?.selectedBuilding.id) {
            const param: CreateNoticeParams = {
                title: props.title,
                content: props.content,
                priority: priority,
                building_id: userInfo.adminInfo?.selectedBuilding.id,
            };
            const result = await service.registerNotice(param);

            if (result.isSuccessful) props.navigation.goBack();
            console.log("create notice result\n", result.data?.data);
        }
    };

    return (
        <BottomSlidableModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            height={deviceUI.getScreenSize().height * 0.28}>
            <View style={styles.editModalContentContainer}>
                <TouchableOpacity
                    onPress={() => {
                        onPrioritySubmit(1);
                    }}
                    style={styles.editModalMenu}>
                    <IconTag size={24} />
                    <Text style={[styles.editModalMenuText]}>{message.messages.main.noti.noti_important_modal}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        onPrioritySubmit(3);
                    }}
                    style={styles.editModalMenu}>
                    <IconTag size={24} />
                    <Text style={[styles.editModalMenuText]}>{message.messages.main.noti.noti_general_modal}</Text>
                </TouchableOpacity>
            </View>
        </BottomSlidableModal>
    );
}
