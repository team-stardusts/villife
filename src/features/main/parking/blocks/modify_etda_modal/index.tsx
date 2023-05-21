import { useEffect, useState } from "react";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useStyler from "../../../../common/hooks/styler/hooks";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EtdaTimePicker from "../etad_time_picker";
import Icon from "../../../../common/atoms/icon";
import useModifyModal from "./styles";

type ModifyEtdaModalProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type Page = "etda" | "info";

type EtdaPageProps = {
    onToInfoPageBtnPress(): void;
};

function EtdaPage({ onToInfoPageBtnPress: onToInfoBtnPress }: EtdaPageProps) {
    const { deviceUI, theme } = useStyler();
    const messages = useScreenMessage();

    const styles = useModifyModal().etda;

    return (
        <View style={styles.container}>
            <View style={styles.timePickerContainer}>
                <EtdaTimePicker />
            </View>
            <TouchableOpacity
                style={styles.toModifyVehicleInfoContainer}
                activeOpacity={0.6}
                onPress={onToInfoBtnPress}>
                <Text style={styles.toModifyVehicleInfoText}>
                    {messages.messages.main.parking.home.inform_to_modify_vehicle_info}
                </Text>
                <Icon name={"arrow-right"} size={deviceUI.moderateScale(35)} color={theme.colorFamily.lightgrey} />
            </TouchableOpacity>
        </View>
    );
}

function InfoPage() {
    return <View></View>;
}

export default function ModifyEtdaModal({ modalVisible, setModalVisible }: ModifyEtdaModalProps) {
    const { deviceUI, theme } = useStyler();
    const [crrPage, setCrrPage] = useState<Page>("etda");
    const messages = useScreenMessage();

    const styles = useModifyModal().toplevel;

    useEffect(() => {
        return () => {
            setCrrPage("etda");
        };
    }, []);

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
                setCrrPage("etda");
            }}
            rightOnPress={() => {}}>
            <View style={styles.contentContainer}>
                {crrPage === "etda" ? <EtdaPage onToInfoPageBtnPress={() => setCrrPage("info")} /> : <InfoPage />}
            </View>
        </StardustAlert>
    );
}
