import { View, Text } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import UniversalTextInput from "../../../../common/blocks/universial/textinput";
import useVehicleInfoInputBoxStyles from "./styles";
import { useEffect, useState } from "react";
import useStyler from "../../../../common/hooks/styler/hooks";
import StringValidator from "../../../../../libs/string_validator";
import {
    TouchedCoordinate,
    GuestVehicleInfo,
    GuestVehicleInfoInputBoxProps,
    GuestVehicleValidationResult,
} from "./types";

export default function GuestVehicleInfoInputBox({
    initialVehicleInfo,
    onValidation,
    onTouchInputBox,
    onChangeGuestVehicleInfo,
}: GuestVehicleInfoInputBoxProps) {
    const MODEL_MIN_LENGTH: number = 3;
    const MODEL_MAX_LENGTH: number = 15;

    const messages = useScreenMessage();
    const styles = useVehicleInfoInputBoxStyles();
    const { theme } = useStyler();
    const validator = new StringValidator();

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

    const validatePlateNumber = (plateNumber: string): boolean => {
        return validator.isCorrectVehiclePlateNumber(plateNumber);
    };

    const validateVisitingPerpose = (perpose: string): boolean => {
        const inCorrectLength: boolean = MODEL_MIN_LENGTH <= perpose.length && perpose.length <= MODEL_MAX_LENGTH;
        let hadSpecialChar: boolean = false;

        // 공백을 특수문자로 보기 때문에 아래와 같이 검사함
        perpose.split(" ").forEach((word) => {
            if (word === "" || validator.hasSpecialChar(word)) {
                hadSpecialChar = true;
            }
        });

        if (!hadSpecialChar && inCorrectLength) {
            return true;
        }

        return false;
    };

    const [guestVehicleValid, setGuestVehicleValid] = useState<GuestVehicleValidationResult>(
        initialVehicleInfo !== undefined
            ? {
                  plateNumber: validatePlateNumber(initialVehicleInfo.plateNumber),
                  phoneNumber: validateVisitingPerpose(initialVehicleInfo.phoneNumber),
                  visitingPerpose: validateVisitingPerpose(initialVehicleInfo.phoneNumber),
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
                            [name as keyof GuestVehicleValidationResult]: validatePlateNumber(text),
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
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.vehicle_model}</Text>
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
                        setGuestVehicleValid({
                            ...guestVehicleValid,
                            [name as keyof GuestVehicleValidationResult]: validateVisitingPerpose(text),
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
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.vehicle_model}</Text>
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
                        setGuestVehicleValid({
                            ...guestVehicleValid,
                            [name as keyof GuestVehicleValidationResult]: validateVisitingPerpose(text),
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
