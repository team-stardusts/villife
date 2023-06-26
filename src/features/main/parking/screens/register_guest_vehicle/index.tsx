import { Text, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import RegisterGuestVehicleScreenProps from "./types";
import useRegisterVehicleScreenStyles from "./styles";
import ParkingScreenGuide from "../../blocks/screen_guide";
import EtdaTimePicker from "../../blocks/etad_time_picker";
import { useEffect, useState } from "react";
import SimpleNavComponent from "../../../../common/blocks/navigation/header/navcomponent";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { TOAST_DEFAULT_OFFSET, TOAST_DEFAULT_VISIBILITY_TIME } from "../../../../common/constants";
import VillifeToastMessage from "../../../../common/atoms/toast";
//import KeyboardAwareScrollView from "../../../../common/blocks/keyboard_aware_scrollview";
import GuestVehicleInfoInputBox from "../../blocks/guest_vehicle_info_input_box copy";
import { GuestVehicleValidationResult } from "../../blocks/guest_vehicle_info_input_box copy/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterGuestVehicleScreen({ navigation, route }: RegisterGuestVehicleScreenProps) {
    const messages = useScreenMessage();
    const styles = useRegisterVehicleScreenStyles();

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
    const [valid, setValid] = useState<GuestVehicleValidationResult>({
        plateNumber: false,
        phoneNumber: false,
        visitingPerpose: false,
    });

    const handlePressRegisterBtn = () => {
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
            console.log("Good");
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
