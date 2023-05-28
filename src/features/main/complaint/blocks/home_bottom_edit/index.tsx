import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import BottomSlidableModal from "../../../../common/blocks/universial/slidemodal_bottom";
import ReplyEditModalProps from "./type";
import useBottomEditModalStyles from "./style";
import IconTag from "../../../../common/atoms/icon/tag";

export default function ComplaintHomeEditModal(props: ReplyEditModalProps) {
    const styles = useBottomEditModalStyles();
    const screenSize = Dimensions.get("window");

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
                    <Text style={[styles.editModalMenuText]}>진행중인 민원 보기 (접수,처리중)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.setDisplayMode("received");
                        props.setVisible(false);
                    }}
                    style={styles.editModalMenu}>
                    <IconTag size={24} />
                    <Text style={[styles.editModalMenuText]}>접수된 민원만 보기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.setDisplayMode("in_progress");
                        props.setVisible(false);
                    }}
                    style={styles.editModalMenu}>
                    <IconTag size={24} />
                    <Text style={[styles.editModalMenuText]}>처리중인 민원만 보기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.setDisplayMode("completed");
                        props.setVisible(false);
                    }}
                    style={styles.editModalMenu}>
                    <IconTag size={24} />
                    <Text style={[styles.editModalMenuText]}>완료된 민원보기</Text>
                </TouchableOpacity>
            </View>
        </BottomSlidableModal>
    );
}
