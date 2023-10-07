import { View, Text } from "react-native";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import UniversalTextInput from "../../../../../../common/blocks/universial/textinput";
import useVehicleInfoInputBoxStyles from "./styles";
import { useEffect, useState } from "react";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import { TouchedCoordinate, VehicleInfo, VehicleInfoInputBoxProps, VehicleValidationResult } from "./types";
import { TextValidator } from "../../../../services/validation";
import InputPlateNumber from "../../../../blocks/input/plate_number";

export default function VehicleInfoInputBox({ initialVehicleInfo, onChangeVehicleInfo }: VehicleInfoInputBoxProps) {
    const messages = useScreenMessage();
    const styles = useVehicleInfoInputBoxStyles();
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
                    <InputPlateNumber
                        onInputValidValue={(plateNumber) => {
                            setVehicleInfo({
                                ...vehicleInfo,
                                plateNumber: plateNumber,
                            });
                        }}
                    />
                </View>
            </View>
            <View style={styles.vehicleInfoInputContainer}>
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.vehicle_model}</Text>
                <View style={styles.vehicleInfoInput}>
                    <UniversalTextInput
                        name="model"
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
                            setVehicleInfo({ ...vehicleInfo, model: TextValidator.validateModel(text) ? text : null });
                        }}
                    />
                </View>
            </View>
        </View>
    );
}
