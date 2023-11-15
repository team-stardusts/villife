import { View, Text, TextInput } from "react-native";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import UniversalTextInput from "../../../../../../common/blocks/universial/textinput";
import useVehicleInfoInputBoxStyles from "./styles";
import { useEffect, useRef, useState } from "react";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import { VehicleInfo, VehicleInfoInputBoxProps } from "./types";
import { TextValidator } from "../../../../services/validation";
import ReusableTextInput from "../../../../../../common/blocks/text_input";

export default function VehicleInfoInputBox({ initialVehicleInfo, onChangeVehicleInfo }: VehicleInfoInputBoxProps) {
    const messages = useScreenMessage();
    const styles = useVehicleInfoInputBoxStyles();
    const refinput = useRef<TextInput>(null);
    const { theme } = useStyler();

    const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>(
        initialVehicleInfo || {
            plateNumber: null,
            model: null,
        }
    );

    useEffect(() => {
        onChangeVehicleInfo(vehicleInfo);
    }, [vehicleInfo]);

    return (
        <View style={styles.container}>
            <View style={styles.vehicleInfoInputContainer}>
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.plate_number}</Text>
                <View style={styles.vehicleInfoInputWrapper}>
                    <ReusableTextInput
                        type="plate-number"
                        onInputValidValue={(plateNumber) => {
                            setVehicleInfo({
                                ...vehicleInfo,
                                plateNumber: plateNumber,
                            });

                            refinput.current?.focus();
                        }}
                    />
                </View>
            </View>
            <View style={styles.vehicleInfoInputContainer}>
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.vehicle_model}</Text>
                <View style={styles.vehicleInfoInput}>
                    <UniversalTextInput
                        name="model"
                        ref={refinput}
                        value={vehicleInfo?.model ?? ""}
                        placeholder={
                            messages.messages.main.parking.register_vehicle.vehicle_model_number_input_placeholder
                        }
                        highlightColor={
                            vehicleInfo.model !== null && !TextValidator.validateModel(vehicleInfo.model)
                                ? (theme.color.specified.red as string)
                                : undefined
                        }
                        lowlightColor={
                            vehicleInfo.model !== null && !TextValidator.validateModel(vehicleInfo.model)
                                ? (theme.color.specified.red as string)
                                : undefined
                        }
                        onChangeText={(text) => {
                            setVehicleInfo({ ...vehicleInfo, model: text === "" ? null : text });
                        }}
                    />
                </View>
            </View>
        </View>
    );
}
