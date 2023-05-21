import { useState } from "react";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useStyler from "../../../../common/hooks/styler/hooks";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EtdaTimePicker from "../etad_time_picker";
import Icon from "../../../../common/atoms/icon";

type ModifyEtdaModalProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModifyEtdaModal({ modalVisible, setModalVisible }: ModifyEtdaModalProps) {
    const { deviceUI, theme } = useStyler();
    const messages = useScreenMessage();

    const styles = StyleSheet.create({
        timePickerContainer: {
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
        },
        toModifyVehicleInfoContainer: {
            height: "20%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        toModifyVehicleInfoText: {
            marginRight: deviceUI.moderateScale(2),
            color: theme.colorFamily.blue,
            ...theme.font.researved.h5,
        },
    });

    return (
        <StardustAlert
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            title={messages.messages.main.parking.home.modify_vehicle_info}
            subtitle={messages.messages.main.parking.home.request_to_modify_etda}
            leftButtonText={messages.messages.words.cancle}
            rightButtonText={messages.messages.words.modified}
            leftOnPress={() => {
                setModalVisible(false);
            }}
            rightOnPress={() => {}}>
            <View style={{ height: deviceUI.moderateScale(180), width: "90%" }}>
                <View style={styles.timePickerContainer}>
                    <EtdaTimePicker />
                </View>
                <TouchableOpacity style={styles.toModifyVehicleInfoContainer} activeOpacity={0.6}>
                    <Text style={styles.toModifyVehicleInfoText}>
                        {messages.messages.main.parking.home.inform_to_modify_vehicle_info}
                    </Text>
                    <Icon name={"arrow-right"} size={deviceUI.moderateScale(35)} color={theme.colorFamily.lightgrey} />
                </TouchableOpacity>
            </View>
        </StardustAlert>
    );
}
