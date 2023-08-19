import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import BottomSlidableModal from "../../../../common/blocks/universial/slidemodal_bottom";
import ReplyEditModalProps from "./type";
import useBottomEditModalStyles from "./style";
import IconTag from "../../../../common/atoms/icon/tag";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export default function ComplaintHomeEditModal(props: ReplyEditModalProps) {
    const styles = useBottomEditModalStyles();
    const screenSize = Dimensions.get("window");
    const messages = useScreenMessage();

    return (
        <BottomSlidableModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            height={screenSize.height * 0.35}>
            <View style={styles.editModalContentContainer}>
                <TouchableOpacity
                    onPress={() => {
                        props.setDisplayMode("received_and_in_progress");
                        props.setVisible(false);
                    }}
                    style={styles.editModalMenu}>
                    <IconTag size={24} />
                    <Text style={[styles.editModalMenuText]}>
                        {messages.messages.main.complaint.complaint_received_and_in_progress_menu}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.setDisplayMode("received");
                        props.setVisible(false);
                    }}
                    style={styles.editModalMenu}>
                    <IconTag size={24} />
                    <Text style={[styles.editModalMenuText]}>
                        {messages.messages.main.complaint.complaint_received_menu}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.setDisplayMode("in_progress");
                        props.setVisible(false);
                    }}
                    style={styles.editModalMenu}>
                    <IconTag size={24} />
                    <Text style={[styles.editModalMenuText]}>
                        {messages.messages.main.complaint.complaint_in_progress_menu}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.setDisplayMode("completed");
                        props.setVisible(false);
                    }}
                    style={styles.editModalMenu}>
                    <IconTag size={24} />
                    <Text style={[styles.editModalMenuText]}>
                        {messages.messages.main.complaint.complaint_done_menu}
                    </Text>
                </TouchableOpacity>
            </View>
        </BottomSlidableModal>
    );
}
