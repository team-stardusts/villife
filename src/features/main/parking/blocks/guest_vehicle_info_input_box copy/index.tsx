import { View, Text } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import UniversalTextInput from "../../../../common/blocks/universial/textinput";
import useGuestVehicleInfoInputBoxStyles from "./styles";
import { useEffect, useState } from "react";
import useStyler from "../../../../common/hooks/styler/hooks";
import { GuestVehicleInfo, GuestVehicleInfoInputBoxProps, GuestVehicleValidationResult } from "./types";
import { TextValidator, VISITING_PERPOSE_MAX_LENGTH } from "../../services/validation";
import StringValidator from "../../../../../libs/string_validator";

export default function GuestVehicleInfoInputBox({
    initialVehicleInfo,
    onValidation,
    onChangeGuestVehicleInfo,
}: GuestVehicleInfoInputBoxProps) {
    const messages = useScreenMessage();
    const styles = useGuestVehicleInfoInputBoxStyles();
    const { theme } = useStyler();
    const stringValidator = new StringValidator();

    const [guestVehicleInfo, setGuestVehicleInfo] = useState<GuestVehicleInfo>(
        initialVehicleInfo || {
            plateNumber: "",
            phoneNumber: "",
            visitingPerpose: "",
        }
    );

    const [phoneNumber, setPhoneNumber] = useState<(string | null)[]>([null, null, null]);

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

    useEffect(() => {
        const len = guestVehicleInfo.phoneNumber.length;

        if (len === 3 || len === 8) {
            setGuestVehicleInfo({
                ...guestVehicleInfo,
                phoneNumber: guestVehicleInfo.phoneNumber + "-",
            });
        }
    }, [guestVehicleInfo.phoneNumber]);

    useEffect(() => {
        for (let i = 0; i < 3; i++) {
            const token = phoneNumber[i];

            if (token === null) return;
            // [010]-0000-0000
            else if (i === 0 && token.length !== 3) return;
            // 010-[0000]-[0000]
            else if (i !== 0 && token.length !== 4) return;
        }

        setGuestVehicleInfo({
            ...guestVehicleInfo,
            phoneNumber: phoneNumber.join("-"),
        });

        setGuestVehicleValid({
            ...guestVehicleValid,
            phoneNumber: true,
        });
    }, [phoneNumber]);

    type PhoneNumberPieceName = "first" | "second" | "third";

    const validatePhoneNumber = (text: string, name: PhoneNumberPieceName) => {
        let index: number = 0;
        let lengthLimit: number = 4;

        switch (name) {
            case "first":
                index = 0;
                lengthLimit = 3;
                break;
            case "second":
                index = 1;
                break;
            case "third":
                index = 2;
                break;
        }

        if (stringValidator.hasSpecialChar(text)) return;

        const _phoneNumber = phoneNumber;

        if (text === "") {
            _phoneNumber[index] = null;
        } else if (text.length <= lengthLimit) {
            _phoneNumber[index] = text;
        } else if (!TextValidator.validatePieceOfPhoneNumber(index, text) || text.length > lengthLimit) {
            return;
        } else {
            _phoneNumber[index] = text;
        }

        setPhoneNumber([..._phoneNumber]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.vehicleInfoInputContainer}>
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.plate_number}</Text>
                <View style={styles.vehicleInfoInput}>
                    <UniversalTextInput
                        name="plateNumber"
                        value={guestVehicleInfo.plateNumber}
                        placeholder={
                            messages.messages.main.parking.register_guest_vehicle.vehicle_plate_number_input_placeholder
                        }
                        highlightColor={
                            guestVehicleInfo.plateNumber !== "" && !guestVehicleValid.plateNumber
                                ? (theme.color.specified.red as string)
                                : undefined
                        }
                        lowlightColor={
                            guestVehicleInfo.plateNumber !== "" && !guestVehicleValid.plateNumber
                                ? (theme.color.specified.red as string)
                                : undefined
                        }
                        onChangeText={(text, name) => {
                            setGuestVehicleValid({
                                ...guestVehicleValid,
                                [name as keyof GuestVehicleValidationResult]: TextValidator.validatePlateNumber(text),
                            });
                            setGuestVehicleInfo({ ...guestVehicleInfo, [name as keyof GuestVehicleInfo]: text });
                        }}
                    />
                </View>
            </View>
            <View style={styles.vehicleInfoInputContainer}>
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.guest_phone_number}</Text>
                <View style={styles.vehicleInfoPhoneNumberInputWrapper}>
                    <View style={styles.vehiclePhonmberInput0}>
                        <UniversalTextInput
                            name="first"
                            textAlign="center"
                            value={phoneNumber[0] ?? ""}
                            placeholder="010"
                            highlightColor={
                                phoneNumber[0] !== null && phoneNumber[0]?.length !== 3
                                    ? (theme.color.specified.red as string)
                                    : undefined
                            }
                            lowlightColor={
                                phoneNumber[0] !== null && phoneNumber[0]?.length !== 3
                                    ? (theme.color.specified.red as string)
                                    : undefined
                            }
                            onChangeText={(text, name) => validatePhoneNumber(text, name as PhoneNumberPieceName)}
                        />
                    </View>
                    <View style={styles.vehiclePhonmberInput1}>
                        <UniversalTextInput
                            name="second"
                            textAlign="center"
                            value={phoneNumber[1] ?? ""}
                            placeholder="0000"
                            highlightColor={
                                phoneNumber[1] !== null && phoneNumber[1]?.length !== 4
                                    ? (theme.color.specified.red as string)
                                    : undefined
                            }
                            lowlightColor={
                                phoneNumber[1] !== null && phoneNumber[1]?.length !== 4
                                    ? (theme.color.specified.red as string)
                                    : undefined
                            }
                            onChangeText={(text, name) => validatePhoneNumber(text, name as PhoneNumberPieceName)}
                        />
                    </View>
                    <View style={styles.vehiclePhonmberInput1}>
                        <UniversalTextInput
                            name="third"
                            textAlign="center"
                            value={phoneNumber[2] ?? ""}
                            placeholder="0000"
                            highlightColor={
                                phoneNumber[2] !== null && phoneNumber[2]?.length !== 4
                                    ? (theme.color.specified.red as string)
                                    : undefined
                            }
                            lowlightColor={
                                phoneNumber[2] !== null && phoneNumber[2]?.length !== 4
                                    ? (theme.color.specified.red as string)
                                    : undefined
                            }
                            onChangeText={(text, name) => validatePhoneNumber(text, name as PhoneNumberPieceName)}
                        />
                    </View>
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
