import { useEffect, useRef, useState } from "react";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useStyler from "../../../../common/hooks/styler/hooks";
import { Alert, Animated, Text, TouchableOpacity, View } from "react-native";
import EtdaTimePicker from "../etad_time_picker";
import Icon from "../../../../common/atoms/icon";
import useModifyModal from "./styles";
import VehicleInfoInputBox from "../vehicle_info_input_box";
import { VehicleInfo, VehicleValidationResult } from "../vehicle_info_input_box/types";
import { Parking } from "../../../../../libs/rest_apis/villife/parking/types";
import useParkService from "../../services/park";
import { useNavigation } from "@react-navigation/native";
import { RouterParams } from "../../../../common/router/types";

type VehicleModifyModalProps = {
    initialVehicleInfo: Parking.TenantVehicle | Parking.GuestVehicle;
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type Page = "etda" | "info";

type EtdaPageProps = {
    onToInfoPageBtnPress(): void;
};

type InfoPageProps = {
    initialVehicleInfo: VehicleModifyModalProps["initialVehicleInfo"];
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

function InfoPage({ initialVehicleInfo }: InfoPageProps) {
    const styles = useModifyModal().info;
    const opacityValue = useRef(new Animated.Value(0)).current;

    const [info, setInfo] = useState<VehicleInfo>({
        plateNumber: "",
        model: "",
    });
    const [valid, setValid] = useState<VehicleValidationResult>({
        plateNumber: false,
        model: false,
    });

    useEffect(() => {
        Animated.timing(opacityValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    });

    return (
        <Animated.View style={[styles.container, { opacity: opacityValue }]}>
            <VehicleInfoInputBox
                initialVehicleInfo={{
                    plateNumber: initialVehicleInfo.plate_number,
                    model: initialVehicleInfo.model,
                }}
                onValidation={setValid}
                onChangeVehicleInfo={setInfo}
            />
        </Animated.View>
    );
}

export default function VehicleModifyModal({
    initialVehicleInfo,
    modalVisible,
    setModalVisible,
}: VehicleModifyModalProps) {
    const { updateMyVehicleEtda, updateMyVehicleInfo } = useParkService();
    const [crrPage, setCrrPage] = useState<Page>("etda");
    const navigation = useNavigation<RouterParams["navigation"]>();
    const messages = useScreenMessage();

    const styles = useModifyModal().toplevel;

    const handlePressCancleBtn = () => {
        setModalVisible(false);
        setCrrPage("etda");
    };

    const handleModifyEtda = async () => {
        const params = {
            vehicleID: initialVehicleInfo.id,
            etd: initialVehicleInfo.etd,
            eta: initialVehicleInfo.eta,
        };

        const result = await updateMyVehicleEtda(params);

        result ? Alert.alert("ETDA 바꾸기 성공~") : Alert.alert("ETDA 바꾸기 실패~");
        navigation.navigate("parking");
        setModalVisible(false);
    };

    const handleModifyInfo = async () => {
        const params = {
            vehicleID: initialVehicleInfo.id,
            model: initialVehicleInfo.model,
            plateNumber: initialVehicleInfo.plate_number,
        };

        const result = await updateMyVehicleInfo(params);

        result ? Alert.alert("INFO 바꾸기 성공~") : Alert.alert("INFO 바꾸기 실패~");
        setModalVisible(false);
    };

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
            leftOnPress={handlePressCancleBtn}
            rightOnPress={() => {
                crrPage === "etda" ? handleModifyEtda() : handleModifyInfo();
            }}>
            <View style={styles.contentContainer}>
                {crrPage === "etda" ? (
                    <EtdaPage onToInfoPageBtnPress={() => setCrrPage("info")} />
                ) : (
                    <InfoPage initialVehicleInfo={initialVehicleInfo} />
                )}
            </View>
        </StardustAlert>
    );
}
