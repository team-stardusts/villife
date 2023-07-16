import { Alert, KeyboardAvoidingView, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import RegisterVehicleScreenProps, { Vehicle } from "./types";
import useRegisterVehicleScreenStyles from "./styles";
import ParkingScreenGuide from "../../blocks/screen_guide";
import EtdaTimePicker from "../../blocks/etad_time_picker";
import { useEffect, useRef, useState } from "react";
import SimpleNavComponent from "../../../../common/blocks/navigation/header/navcomponent";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { TOAST_DEFAULT_OFFSET, TOAST_DEFAULT_VISIBILITY_TIME } from "../../../../common/constants";
import VillifeToastMessage from "../../../../common/atoms/toast";
import VehicleInfoInputBox from "../../blocks/vehicle_info_input_box";
import { VehicleValidationResult } from "../../blocks/vehicle_info_input_box/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useParkService from "../../services/park";

export default function RegisterVehicleScreen({ navigation, route }: RegisterVehicleScreenProps) {
    const messages = useScreenMessage();
    const styles = useRegisterVehicleScreenStyles();
    const { registerUserVehicle } = useParkService();

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

    const handlePressRegisterBtn = async () => {
        if (!valid.model && !valid.plateNumber) {
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
            VillifeToastMessage.showBottomToast("error", messages.messages.main.parking.register_vehicle.invalid_model);

        if (valid.model && valid.plateNumber) {
            // [TO-DO] Regsiter Service 등록
            const isSuccessful: boolean = await registerUserVehicle({
                ...vehicle,
                vehicleType: "4WD",
            });

            const alertTitle: string = isSuccessful
                ? messages.messages.main.parking.common.request_registration_successful
                : messages.messages.main.parking.common.request_registration_failure;
            const alertMessages: string | undefined = isSuccessful
                ? undefined
                : messages.messages.boilerplate.try_again_soon;

            Alert.alert(alertTitle, alertMessages, [
                {
                    onPress: () => {
                        isSuccessful &&
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "parking", params: {} }],
                            });
                    },
                },
            ]);
        }
    };

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.parking.register_vehicle.screen_title,
                navComponent: SimpleNavComponent,
                navComponentProps: {
                    title: messages.messages.words.register,
                    onPress: handlePressRegisterBtn,
                },
            }}>
            <KeyboardAwareScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                //scrollEnabled={false}
                enableOnAndroid={true}>
                <ParkingScreenGuide
                    title={messages.messages.main.parking.register_vehicle.register_own_vehicle}
                    subtitle={messages.messages.main.parking.register_vehicle.request_input_vehicle_info}
                />
                <View style={styles.etdaPickerContainer}>
                    <EtdaTimePicker
                        onTimeChange={(time) => {
                            setVehicle({ ...vehicle, ...time });
                        }}
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
        </NavigationView>
    );
}
