import { Alert, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import RegisterVehicleScreenProps, { Vehicle } from "./types";
import useRegisterVehicleScreenStyles from "./styles";
import EtdaTimePicker from "../../blocks/etad_time_picker";
import { useState } from "react";
import SimpleNavComponent from "../../../../common/blocks/navigation/header/navcomponent";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { TOAST_DEFAULT_OFFSET, TOAST_DEFAULT_VISIBILITY_TIME } from "../../../../common/constants";
import VillifeToastMessage from "../../../../common/atoms/toast";
import VehicleInfoInputBox from "../../blocks/info_input_box";
import { VehicleValidationResult } from "../../blocks/info_input_box/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useParkingLot from "../../services/parking_lot";
import ScreenTitleView from "../../../../common/blocks/title_view";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";

export default function RegisterVehicleScreen({ navigation, route }: RegisterVehicleScreenProps) {
    const messages = useScreenMessage();
    const styles = useRegisterVehicleScreenStyles();
    const parkingLot = useParkingLot();

    const [vehicle, setVehicle] = useState<Vehicle>({
        plateNumber: "",
        model: "",
        eta: {
            hour: 0,
            minute: 0,
        },
        etd: {
            hour: 0,
            minute: 0,
        },
    });
    const [valid, setValid] = useState<VehicleValidationResult>({
        plateNumber: false,
        model: false,
    });
    const [alert, setAlert] = useState<StardustAlertContent>({
        type: "primary",
        title: messages.messages.main.parking.common.registration_successful,
        visible: false,
    });

    const handlePressRegisterBtn = async () => {
        /* if (!valid.model && !valid.plateNumber) {
            Toast.show({
                type: "error",
                text1: messages.messages.main.parking.register_vehicle.invalid_plate_number_and_model,
                position: "bottom",
                visibilityTime: TOAST_DEFAULT_VISIBILITY_TIME,
                bottomOffset: TOAST_DEFAULT_OFFSET,
            });

            return;
        }

        !valid.plateNumber &&
            VillifeToastMessage.showBottomToast(
                "error",
                messages.messages.main.parking.register_vehicle.invalid_plate_number
            );

        !valid.model &&
            VillifeToastMessage.showBottomToast("error", messages.messages.main.parking.register_vehicle.invalid_model); */

        if (valid.model && valid.plateNumber) {
            // [TO-DO] Regsiter Service 등록
            const isSuccessful: boolean = await parkingLot.registerUserVehicle({
                ...vehicle,
                vehicleType: "4WD",
            });

            const alertTitle: string = isSuccessful
                ? messages.messages.main.parking.common.request_registration_successful
                : messages.messages.main.parking.common.request_registration_failure;
            const alertMessages: string | undefined = isSuccessful
                ? undefined
                : messages.messages.boilerplate.try_again_soon;

            setAlert({
                ...alert,
                visible: true,
                type: isSuccessful ? "primary" : "error",
                title: alertTitle,
                message: alertMessages,
                buttons: [
                    {
                        text: "확인",
                        onPress: () => {
                            isSuccessful
                                ? navigation.reset({
                                      index: 0,
                                      routes: [{ name: "parking", params: {} }],
                                  })
                                : setAlertUnvisible();
                        },
                    },
                ],
            });
        }
    };

    const setAlertUnvisible = () => {
        setAlert({ ...alert, visible: false });
    };

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.parking.register_vehicle.screen_title,
                style: {
                    backgroundColor: styles.navView.backgroundColor,
                },
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
                backgroundColor: styles.navView.backgroundColor,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <ScreenTitleView
                titles={[messages.messages.main.parking.register_vehicle.register_own_vehicle]}
                subtitles={[messages.messages.main.parking.register_vehicle.request_input_vehicle_info]}
                bottomButton={{
                    title: "등록하기",
                    onPress: () => handlePressRegisterBtn(),
                    disabled: !(valid.model && valid.plateNumber),
                }}
                disablePaddingTop>
                <KeyboardAwareScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    //scrollEnabled={false}
                    enableOnAndroid={true}>
                    <StardustAlert {...alert} setAlert={setAlert} />
                    <View style={styles.etdaPickerContainer}>
                        <EtdaTimePicker
                            onTimeChange={(time) => {
                                setVehicle({ ...vehicle, ...time });
                            }}
                            enableShadow
                        />
                    </View>
                    <View style={styles.vehicleInfoInputsContainer}>
                        <VehicleInfoInputBox
                            onValidation={setValid}
                            onChangeVehicleInfo={(info) => {
                                setVehicle({
                                    ...vehicle,
                                    ...info,
                                });
                            }}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </ScreenTitleView>
        </NavigationView>
    );
}
