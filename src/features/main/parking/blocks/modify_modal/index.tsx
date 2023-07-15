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
import { MyVehicleEtdaUpdateServiceParams } from "../../services/park/types";
import { EtdaTime } from "../etad_time_picker/types";
import { EtdaPageProps, InfoPageProps, Page, VehicleModifyModalProps } from "./types";

// [TO-DO] Initial ETDA를 받아오도록 변경
function EtdaPage({ initialEtda, onChangeData, onToInfoPageBtnPress }: EtdaPageProps) {
    const { deviceUI, theme } = useStyler();
    const messages = useScreenMessage();
    const styles = useModifyModal().etda;

    const [etda, setEtda] = useState<EtdaTime>(initialEtda);

    useEffect(() => {
        onChangeData(etda);
    }, [etda]);

    return (
        <View style={styles.container}>
            <View style={styles.timePickerContainer}>
                <EtdaTimePicker initialTime={initialEtda} onTimeChange={setEtda} />
            </View>
            <TouchableOpacity
                style={styles.toModifyVehicleInfoContainer}
                activeOpacity={0.6}
                onPress={onToInfoPageBtnPress}>
                <Text style={styles.toModifyVehicleInfoText}>
                    {messages.messages.main.parking.home.inform_to_modify_vehicle_info}
                </Text>
                <Icon name={"arrow-right"} size={deviceUI.moderateScale(35)} color={theme.colorFamily.lightgrey} />
            </TouchableOpacity>
        </View>
    );
}

function InfoPage({ initialVehicleInfo, onChangeData }: InfoPageProps) {
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

    useEffect(() => {
        onChangeData(info);
    }, [info]);

    return (
        <Animated.View style={[styles.container, { opacity: opacityValue }]}>
            <VehicleInfoInputBox
                initialVehicleInfo={
                    initialVehicleInfo !== null
                        ? {
                              plateNumber: initialVehicleInfo.plate_number,
                              model: initialVehicleInfo.model,
                          }
                        : undefined
                }
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
    const messages = useScreenMessage();
    const styles = useModifyModal().toplevel;
    const { updateUserVehicleEtda, updateUserVehicleInfo } = useParkService();

    const initialEtda = {
        etd: {
            hour: initialVehicleInfo?.etd.getHours(),
            minute: initialVehicleInfo?.etd.getMinutes(),
        },
        eta: {
            hour: initialVehicleInfo?.eta.getHours(),
            minute: initialVehicleInfo?.eta.getMinutes(),
        },
    };

    const [crrPage, setCrrPage] = useState<Page>("etda");
    const [etda, setEtda] = useState<MyVehicleEtdaUpdateServiceParams>({
        vehicleID: initialVehicleInfo.id,
        etda: {
            etd: {
                hour: initialVehicleInfo.etd.getHours(),
                minute: initialVehicleInfo.etd.getMinutes(),
            },
            eta: {
                hour: initialVehicleInfo.eta.getHours(),
                minute: initialVehicleInfo.eta.getMinutes(),
            },
        },
    });

    const [info, setInfo] = useState<Parking.VehicleInfopdateParams>({
        vehicleID: initialVehicleInfo.id,
        model: initialVehicleInfo.model,
        plateNumber: initialVehicleInfo.plate_number,
    });

    useEffect(() => {
        return () => {
            setCrrPage("etda");
        };
    }, []);

    const handlePressCancleBtn = () => {
        setModalVisible(false);
        setCrrPage("etda");
    };

    const handleModifyEtda = async () => {
        console.log("Initial: ", initialVehicleInfo?.model, initialEtda);
        console.log("Changed: ", initialVehicleInfo?.model, etda.etda);

        const isSuccessful: boolean = await updateUserVehicleEtda(etda);

        isSuccessful
            ? Alert.alert(messages.messages.main.parking.modify_modal.succed_to_change_etda)
            : Alert.alert(
                  messages.messages.main.parking.modify_modal.fail_to_change_etda,
                  messages.messages.boilerplate.contact_the_manager
              );

        setModalVisible(false);
    };

    const handleModifyInfo = async () => {
        const isSuccessful: boolean = await updateUserVehicleInfo(info);

        isSuccessful
            ? Alert.alert(messages.messages.main.parking.modify_modal.succed_to_change_info)
            : Alert.alert(
                  messages.messages.main.parking.modify_modal.fail_to_change_info,
                  messages.messages.boilerplate.contact_the_manager
              );

        setModalVisible(false);
    };

    return (
        <StardustAlert
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            title={messages.messages.main.parking.home.modify_vehicle_info}
            subtitle={messages.messages.main.parking.home.request_to_modify_etda}
            leftButtonText={messages.messages.words.cancle}
            rightButtonText={messages.messages.words.modified}
            onPressVoidSpace={handlePressCancleBtn}
            onPressLeftBtn={handlePressCancleBtn}
            onPressRightBtn={() => {
                crrPage === "etda" ? handleModifyEtda() : handleModifyInfo();
            }}>
            <View style={styles.contentContainer}>
                {crrPage === "etda" ? (
                    <EtdaPage
                        initialEtda={{
                            etd: {
                                hour: initialVehicleInfo.etd.getHours(),
                                minute: initialVehicleInfo.etd.getMinutes(),
                            },
                            eta: {
                                hour: initialVehicleInfo.eta.getHours(),
                                minute: initialVehicleInfo.eta.getMinutes(),
                            },
                        }}
                        onChangeData={(data) => {
                            setEtda({ ...etda, etda: data });
                        }}
                        onToInfoPageBtnPress={() => setCrrPage("info")}
                    />
                ) : (
                    <InfoPage
                        initialVehicleInfo={initialVehicleInfo}
                        onChangeData={(data) => {
                            setInfo({ ...info, model: data.model, plateNumber: data.plateNumber });
                        }}
                    />
                )}
            </View>
        </StardustAlert>
    );
}
