import { Alert, Text, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import RegisterGuestVehicleScreenProps, { GuestVehicle } from "./types";
import useRegisterVehicleScreenStyles from "./styles";
import ParkingScreenGuide from "../../blocks/screen_guide";
import EtdaTimePicker from "../../blocks/etad_time_picker";
import { useState } from "react";
import SimpleNavComponent from "../../../../common/blocks/navigation/header/navcomponent";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { TOAST_DEFAULT_OFFSET, TOAST_DEFAULT_VISIBILITY_TIME } from "../../../../common/constants";
import VillifeToastMessage from "../../../../common/atoms/toast";
import GuestVehicleInfoInputBox from "../../blocks/guest_vehicle_info_input_box copy";
import { GuestVehicleValidationResult } from "../../blocks/guest_vehicle_info_input_box copy/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useParkService from "../../services/park";

export default function RegisterGuestVehicleScreen({ navigation, route }: RegisterGuestVehicleScreenProps) {
    const messages = useScreenMessage();
    const styles = useRegisterVehicleScreenStyles();
    const { registerGuestVehicleToBuilding } = useParkService();

    const [guestVehicle, setGuestVehicle] = useState<GuestVehicle>({
        eta: {
            hour: 0,
            minute: 0,
        },
        etd: {
            hour: 0,
            minute: 0,
        },
        model: "guest_test",
        phoneNumber: "",
        plateNumber: "",
        visitingPerpose: "",
    });

    const [valid, setValid] = useState<GuestVehicleValidationResult>({
        plateNumber: false,
        phoneNumber: false,
        visitingPerpose: false,
    });

    // [TO-DO] 예외 처리가 필요함
    const handlePressRegisterBtn = async () => {
        if (!valid.phoneNumber && !valid.plateNumber) {
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

        !valid.phoneNumber &&
            VillifeToastMessage.showBottomToast("error", messages.messages.main.parking.register_vehicle.invalid_model);

        if (valid.phoneNumber && valid.plateNumber) {
            // Regsiter Service 등록
            // [TO-DO] ETDA 컨버터 필요
            const isSuccessful = await registerGuestVehicleToBuilding({
                eta: 111111,
                etd: 111111,
                guestPhoneNumber: guestVehicle.phoneNumber,
                model: guestVehicle.model,
                plateNumber: guestVehicle.plateNumber,
                vehicleType: "4WD",
                visitingPurpose: guestVehicle.visitingPerpose,
            });

            const alertTitle: string = isSuccessful
                ? messages.messages.main.parking.common.registration_successful
                : messages.messages.main.parking.common.registration_failure;
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
                title: messages.messages.main.parking.register_guest_vehicle.screen_title,
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
                <View>
                    <ParkingScreenGuide
                        title={messages.messages.main.parking.register_guest_vehicle.register_guest_vehicle}
                        subtitle={messages.messages.main.parking.register_guest_vehicle.request_input_vehicle_info}
                    />
                    <View style={styles.etdaPickerContainer}>
                        <EtdaTimePicker
                            onTimeChange={(time) => {
                                setGuestVehicle({ ...guestVehicle, ...time });
                            }}
                        />
                    </View>
                    <View style={styles.vehicleInfoInputsContainer}>
                        <GuestVehicleInfoInputBox
                            onValidation={setValid}
                            onChangeGuestVehicleInfo={(info) => {
                                setGuestVehicle({
                                    ...guestVehicle,
                                    ...info,
                                });
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </NavigationView>
    );
}
