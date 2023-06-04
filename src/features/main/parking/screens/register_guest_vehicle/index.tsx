import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import RegisterGuestVehicleScreenProps from "./types";
import useRegisterVehicleScreenStyles from "./styles";
import ParkingScreenGuide from "../../blocks/screen_guide";
import EtdaTimePicker from "../../blocks/etad_time_picker";
import { useEffect, useState } from "react";
import StringValidator from "../../../../../libs/string_validator";
import SimpleNavComponent from "../../../../common/blocks/navigation/navcomponent";
import useStyler from "../../../../common/hooks/styler/hooks";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { TOAST_DEFAULT_OFFSET, TOAST_DEFAULT_VISIBILITY_TIME } from "../../../../common/constants";
import VillifeToastMessage from "../../../../common/atoms/toast";
import KeyboardAwareScrollView from "../../../../common/blocks/keyboard_aware_scrollview";
import VehicleInfoInputBox from "../../blocks/vehicle_info_input_box";
import { VehicleValidationResult } from "../../blocks/vehicle_info_input_box/types";

export default function RegisterGuestVehicleScreen({ navigation, route }: RegisterGuestVehicleScreenProps) {
    const messages = useScreenMessage();
    const styles = useRegisterVehicleScreenStyles();

    const { theme } = useStyler();
    const validator = new StringValidator();

    const [guestVehicle, setGuestVehicle] = useState<any>({
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
    const [touchedCoordinateY, setTouchedCoordinateY] = useState<number>(0);

    const handlePressRegisterBtn = () => {
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
            // Regsiter Service 등록
            console.log("Good");
        }
    };

    useEffect(() => {
        //console.log(vehicle);
    }, [guestVehicle]);

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
            <KeyboardAwareScrollView style={styles.container} touchedCoordinateY={touchedCoordinateY}>
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
                    <VehicleInfoInputBox
                        onValidation={setValid}
                        onTouchInputBox={(coordinate) => {
                            setTouchedCoordinateY(coordinate.y);
                        }}
                        onChangeVehicleInfo={(info) => {
                            setGuestVehicle({
                                ...guestVehicle,
                                ...info,
                            });
                        }}
                    />
                </View>
            </KeyboardAwareScrollView>
        </NavigationView>
    );
}
