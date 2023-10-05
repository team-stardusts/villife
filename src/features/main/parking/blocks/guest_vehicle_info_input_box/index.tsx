import { View, Text } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import UniversalTextInput from "../../../../common/blocks/universial/textinput";
import useGuestVehicleInfoInputBoxStyles from "./styles";
import { useEffect, useState } from "react";
import useStyler from "../../../../common/hooks/styler/hooks";
import { GuestVehicleInfo, GuestVehicleInfoInputBoxProps, GuestVehicleValidationResult } from "./types";
import { TextValidator, VISITING_PERPOSE_MAX_LENGTH } from "../../services/validation";
import StringValidator from "../../../../../libs/string_validator";
import InputPhoneNumber from "../input/phone_number";
import InputPlateNumber from "../input/plate_number";

export default function GuestVehicleInfoInputBox({
    initialVehicleInfo,
    onValidation,
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
        onChangeGuestVehicleInfo(guestVehicleInfo);
        onValidation && onValidation(guestVehicleValid);
    }, [guestVehicleInfo, guestVehicleValid]);

    return (
        <View style={styles.container}>
            <View style={styles.vehicleInfoInputContainer}>
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.plate_number}</Text>
                <View style={styles.vehicleInfoPhoneNumberInputWrapper}>
                    <InputPlateNumber
                        onInputValidValue={(plateNumber) => {
                            console.log(plateNumber);
                            setGuestVehicleInfo({
                                ...guestVehicleInfo,
                                plateNumber: plateNumber,
                            });

                            setGuestVehicleValid({
                                ...guestVehicleValid,
                                plateNumber: true,
                            });
                        }}
                    />
                </View>
            </View>
            <View style={styles.vehicleInfoInputContainer}>
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.guest_phone_number}</Text>
                <View style={styles.vehicleInfoPhoneNumberInputWrapper}>
                    <InputPhoneNumber
                        onInputValidValue={(phoneNumber) => {
                            setGuestVehicleInfo({
                                ...guestVehicleInfo,
                                phoneNumber: phoneNumber,
                            });

                            setGuestVehicleValid({
                                ...guestVehicleValid,
                                phoneNumber: true,
                            });
                        }}
                    />
                </View>
            </View>
            <View style={styles.vehicleInfoInputContainer}>
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.visiting_perpose}</Text>
                <View style={styles.vehicleInfoInput}>
                    <UniversalTextInput
                        name="visitingPerpose"
                        value={guestVehicleInfo.visitingPerpose}
                        placeholder={
                            messages.messages.main.parking.register_guest_vehicle.visiting_perpose_input_placeholder
                        }
                        highlightColor={
                            guestVehicleInfo.visitingPerpose !== "" && !guestVehicleValid.visitingPerpose
                                ? (theme.color.specified.red as string)
                                : undefined
                        }
                        lowlightColor={
                            guestVehicleInfo.visitingPerpose !== "" && !guestVehicleValid.visitingPerpose
                                ? (theme.color.specified.red as string)
                                : undefined
                        }
                        onChangeText={(text, name) => {
                            if (text.length > VISITING_PERPOSE_MAX_LENGTH) return;

                            setGuestVehicleValid({
                                ...guestVehicleValid,
                                [name as keyof GuestVehicleValidationResult]:
                                    TextValidator.validateVisitingPerpose(text),
                            });
                            setGuestVehicleInfo({ ...guestVehicleInfo, [name as keyof GuestVehicleInfo]: text });
                        }}
                    />
                </View>
            </View>
        </View>
    );
}
