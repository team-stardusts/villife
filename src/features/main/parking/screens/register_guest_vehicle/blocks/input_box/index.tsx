import { View, Text } from "react-native";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import UniversalTextInput from "../../../../../../common/blocks/universial/textinput";
import useGuestVehicleInfoInputBoxStyles from "./styles";
import { useEffect, useState } from "react";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import { GuestVehicleInfo, GuestVehicleInfoInputBoxProps } from "./types";
import { VISITING_PERPOSE_MAX_LENGTH, VISITING_PERPOSE_MIN_LENGTH } from "../../../../services/validation";
import InputPhoneNumber from "../../../../blocks/input/phone_number";
import InputPlateNumber from "../../../../blocks/input/plate_number";

export default function GuestVehicleInfoInputBox({
    initialVehicleInfo,
    onChangeGuestVehicleInfo,
}: GuestVehicleInfoInputBoxProps) {
    const messages = useScreenMessage();
    const styles = useGuestVehicleInfoInputBoxStyles();
    const { theme } = useStyler();

    const [guestVehicleInfo, setGuestVehicleInfo] = useState<GuestVehicleInfo>(
        initialVehicleInfo || {
            plateNumber: null,
            phoneNumber: null,
            visitingPerpose: null,
        }
    );

    useEffect(() => {
        onChangeGuestVehicleInfo(guestVehicleInfo);
    }, [guestVehicleInfo]);

    return (
        <View style={styles.container}>
            <View style={styles.vehicleInfoInputContainer}>
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.plate_number}</Text>
                <View style={styles.vehicleInfoInputWrapper}>
                    <InputPlateNumber
                        onInputInvalidValue={() =>
                            setGuestVehicleInfo({
                                ...guestVehicleInfo,
                                plateNumber: null,
                            })
                        }
                        onInputValidValue={(plateNumber) => {
                            setGuestVehicleInfo({
                                ...guestVehicleInfo,
                                plateNumber: plateNumber,
                            });
                        }}
                    />
                </View>
            </View>
            <View style={styles.vehicleInfoInputContainer}>
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.guest_phone_number}</Text>
                <View style={styles.vehicleInfoInputWrapper}>
                    <InputPhoneNumber
                        onInputInvalidValue={() =>
                            setGuestVehicleInfo({
                                ...guestVehicleInfo,
                                phoneNumber: null,
                            })
                        }
                        onInputValidValue={(phoneNumber) => {
                            setGuestVehicleInfo({
                                ...guestVehicleInfo,
                                phoneNumber: phoneNumber,
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
                        //value={guestVehicleInfo.visitingPerpose || ""}
                        placeholder={
                            messages.messages.main.parking.register_guest_vehicle.visiting_perpose_input_placeholder
                        }
                        highlightColor={
                            guestVehicleInfo.visitingPerpose !== null &&
                            !(VISITING_PERPOSE_MIN_LENGTH <= guestVehicleInfo.visitingPerpose.length) &&
                            !(VISITING_PERPOSE_MAX_LENGTH >= guestVehicleInfo.visitingPerpose.length)
                                ? (theme.color.specified.red as string)
                                : undefined
                        }
                        lowlightColor={
                            guestVehicleInfo.visitingPerpose !== null &&
                            !(VISITING_PERPOSE_MIN_LENGTH <= guestVehicleInfo.visitingPerpose.length) &&
                            !(VISITING_PERPOSE_MAX_LENGTH >= guestVehicleInfo.visitingPerpose.length)
                                ? (theme.color.specified.red as string)
                                : undefined
                        }
                        onChangeText={(text) => {
                            setGuestVehicleInfo({
                                ...guestVehicleInfo,
                                visitingPerpose:
                                    VISITING_PERPOSE_MIN_LENGTH <= text.length &&
                                    text.length <= VISITING_PERPOSE_MAX_LENGTH
                                        ? text
                                        : null,
                            });
                        }}
                    />
                </View>
            </View>
        </View>
    );
}
