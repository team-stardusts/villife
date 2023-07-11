import { View, Text } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import UniversalTextInput from "../../../../common/blocks/universial/textinput";
import useGuestVehicleInfoInputBoxStyles from "./styles";
import { useEffect, useState } from "react";
import useStyler from "../../../../common/hooks/styler/hooks";
import {
    TouchedCoordinate,
    GuestVehicleInfo,
    GuestVehicleInfoInputBoxProps,
    GuestVehicleValidationResult,
} from "./types";
import { TextValidator, VISITING_PERPOSE_MAX_LENGTH } from "../../services/validation";

export default function GuestVehicleInfoInputBox({
    initialVehicleInfo,
    onValidation,
    onTouchInputBox,
    onChangeGuestVehicleInfo,
}: GuestVehicleInfoInputBoxProps) {
    const messages = useScreenMessage();
    const styles = useGuestVehicleInfoInputBoxStyles();
    const { theme } = useStyler();

    const [guestVehicleInfo, setGuestVehicleInfo] = useState<GuestVehicleInfo>(
        initialVehicleInfo || {
            plateNumber: "",
            phoneNumber: "",
            visitingPerpose: "",
        }
    );
    const [touchedCoordinate, setTouchedCoordinate] = useState<TouchedCoordinate>({
        x: 0,
        y: 0,
    });

    const [guestVehicleValid, setGuestVehicleValid] = useState<GuestVehicleValidationResult>(
        initialVehicleInfo !== undefined
            ? {
                  plateNumber: TextValidator.validatePlateNumber(initialVehicleInfo.plateNumber),
                  phoneNumber: TextValidator.validatePhoneNumber(initialVehicleInfo.phoneNumber),
                  visitingPerpose: TextValidator.validateVisitingPerpose(initialVehicleInfo.phoneNumber),
              }
            : {
                  plateNumber: false,
                  phoneNumber: false,
                  visitingPerpose: false,
              }
    );

    useEffect(() => {
        onTouchInputBox && onTouchInputBox(touchedCoordinate);
    }, [touchedCoordinate]);

    useEffect(() => {
        onChangeGuestVehicleInfo(guestVehicleInfo);
        onValidation && onValidation(guestVehicleValid);
    }, [guestVehicleInfo, guestVehicleValid]);

    useEffect(() => {
        const len = guestVehicleInfo.phoneNumber.length;

        if (len === 3 || len === 8) {
            setGuestVehicleInfo({
                ...guestVehicleInfo,
                phoneNumber: guestVehicleInfo.phoneNumber + "-",
            });
        }
    }, [guestVehicleInfo.phoneNumber]);

    return (
        <View style={styles.container}>
            <View style={styles.vehicleInfoInputContainer}>
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.plate_number}</Text>
                <UniversalTextInput
                    name="plateNumber"
                    value={guestVehicleInfo.plateNumber}
                    placeholder={
                        messages.messages.main.parking.register_guest_vehicle.vehicle_plate_number_input_placeholder
                    }
                    highlightColor={
                        guestVehicleInfo.plateNumber !== "" && !guestVehicleValid.plateNumber
                            ? theme.colorFamily.red
                            : undefined
                    }
                    lowlightColor={
                        guestVehicleInfo.plateNumber !== "" && !guestVehicleValid.plateNumber
                            ? theme.colorFamily.red
                            : undefined
                    }
                    onChangeText={(text, name) => {
                        setGuestVehicleValid({
                            ...guestVehicleValid,
                            [name as keyof GuestVehicleValidationResult]: TextValidator.validatePlateNumber(text),
                        });
                        setGuestVehicleInfo({ ...guestVehicleInfo, [name as keyof GuestVehicleInfo]: text });
                    }}
                    onTouchEndCapture={(event) =>
                        setTouchedCoordinate({
                            ...touchedCoordinate,
                            x: event.nativeEvent.pageX,
                            y: event.nativeEvent.pageY,
                        })
                    }
                />
            </View>
            <View style={styles.vehicleInfoInputContainer}>
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.guest_phone_number}</Text>
                <UniversalTextInput
                    name="phoneNumber"
                    value={guestVehicleInfo.phoneNumber}
                    placeholder={messages.messages.main.parking.register_guest_vehicle.phone_number_input_placeholder}
                    highlightColor={
                        guestVehicleInfo.phoneNumber !== "" && !guestVehicleValid.phoneNumber
                            ? theme.colorFamily.red
                            : undefined
                    }
                    lowlightColor={
                        guestVehicleInfo.phoneNumber !== "" && !guestVehicleValid.phoneNumber
                            ? theme.colorFamily.red
                            : undefined
                    }
                    onChangeText={(text, name) => {
                        if (text.length > 13) return;

                        setGuestVehicleValid({
                            ...guestVehicleValid,
                            [name as keyof GuestVehicleValidationResult]: TextValidator.validatePhoneNumber(text),
                        });
                        setGuestVehicleInfo({ ...guestVehicleInfo, [name as keyof GuestVehicleInfo]: text });
                    }}
                    onTouchEndCapture={(event) =>
                        setTouchedCoordinate({
                            ...touchedCoordinate,
                            x: event.nativeEvent.pageX,
                            y: event.nativeEvent.pageY,
                        })
                    }
                />
            </View>
            <View style={styles.vehicleInfoInputContainer}>
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.visiting_perpose}</Text>
                <UniversalTextInput
                    name="visitingPerpose"
                    value={guestVehicleInfo.visitingPerpose}
                    placeholder={
                        messages.messages.main.parking.register_guest_vehicle.visiting_perpose_input_placeholder
                    }
                    highlightColor={
                        guestVehicleInfo.visitingPerpose !== "" && !guestVehicleValid.visitingPerpose
                            ? theme.colorFamily.red
                            : undefined
                    }
                    lowlightColor={
                        guestVehicleInfo.visitingPerpose !== "" && !guestVehicleValid.visitingPerpose
                            ? theme.colorFamily.red
                            : undefined
                    }
                    onChangeText={(text, name) => {
                        if (text.length > VISITING_PERPOSE_MAX_LENGTH) return;

                        setGuestVehicleValid({
                            ...guestVehicleValid,
                            [name as keyof GuestVehicleValidationResult]: TextValidator.validateVisitingPerpose(text),
                        });
                        setGuestVehicleInfo({ ...guestVehicleInfo, [name as keyof GuestVehicleInfo]: text });
                    }}
                    onTouchEndCapture={(event) =>
                        setTouchedCoordinate({
                            ...touchedCoordinate,
                            x: event.nativeEvent.pageX,
                            y: event.nativeEvent.pageY,
                        })
                    }
                />
            </View>
        </View>
    );
}
