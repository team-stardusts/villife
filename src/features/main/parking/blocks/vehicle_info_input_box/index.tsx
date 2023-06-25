import { View, Text } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import UniversalTextInput from "../../../../common/blocks/universial/textinput";
import useVehicleInfoInputBoxStyles from "./styles";
import { useEffect, useState } from "react";
import useStyler from "../../../../common/hooks/styler/hooks";
import { TouchedCoordinate, VehicleInfo, VehicleInfoInputBoxProps, VehicleValidationResult } from "./types";
import { TextValidator } from "../../services/validation";

export default function VehicleInfoInputBox({
    initialVehicleInfo,
    onValidation,
    onTouchInputBox,
    onChangeVehicleInfo,
}: VehicleInfoInputBoxProps) {
    const messages = useScreenMessage();
    const styles = useVehicleInfoInputBoxStyles();
    const { theme } = useStyler();

    const [touchedCoordinate, setTouchedCoordinate] = useState<TouchedCoordinate>({
        x: 0,
        y: 0,
    });

    const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>(
        initialVehicleInfo || {
            plateNumber: "",
            model: "",
        }
    );

    const [vehicleValid, setVehicleValid] = useState<VehicleValidationResult>(
        initialVehicleInfo !== undefined
            ? {
                  plateNumber: TextValidator.validatePlateNumber(initialVehicleInfo.plateNumber),
                  model: TextValidator.validateModel(initialVehicleInfo.model),
              }
            : {
                  plateNumber: false,
                  model: false,
              }
    );

    useEffect(() => {
        onTouchInputBox && onTouchInputBox(touchedCoordinate);
    }, [touchedCoordinate]);

    useEffect(() => {
        onChangeVehicleInfo(vehicleInfo);
        onValidation && onValidation(vehicleValid);
    }, [vehicleInfo, vehicleValid]);

    return (
        <View style={styles.container}>
            <View style={styles.vehicleInfoInputContainer}>
                <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.plate_number}</Text>
                <UniversalTextInput
                    name="plateNumber"
                    value={vehicleInfo.plateNumber}
                    placeholder={messages.messages.main.parking.register_vehicle.vehicle_plate_number_input_placeholder}
                    highlightColor={
                        vehicleInfo.plateNumber !== "" && !vehicleValid.plateNumber ? theme.colorFamily.red : undefined
                    }
                    lowlightColor={
                        vehicleInfo.plateNumber !== "" && !vehicleValid.plateNumber ? theme.colorFamily.red : undefined
                    }
                    onChangeText={(text, name) => {
                        setVehicleValid({
                            ...vehicleValid,
                            [name as keyof VehicleValidationResult]: TextValidator.validatePlateNumber(text),
                        });
                        setVehicleInfo({ ...vehicleInfo, [name as keyof VehicleInfo]: text });
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
                    name="model"
                    value={vehicleInfo.model}
                    placeholder={messages.messages.main.parking.register_vehicle.vehicle_model_number_input_placeholder}
                    highlightColor={vehicleInfo.model !== "" && !vehicleValid.model ? theme.colorFamily.red : undefined}
                    lowlightColor={vehicleInfo.model !== "" && !vehicleValid.model ? theme.colorFamily.red : undefined}
                    onChangeText={(text, name) => {
                        setVehicleValid({
                            ...vehicleValid,
                            [name as keyof VehicleValidationResult]: TextValidator.validateModel(text),
                        });
                        setVehicleInfo({ ...vehicleInfo, [name as keyof VehicleInfo]: text });
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
