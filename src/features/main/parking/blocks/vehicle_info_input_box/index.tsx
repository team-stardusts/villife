import { View, Text } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import UniversalTextInput from "../../../../common/blocks/universial/textinput";
import useVehicleInfoInputBoxStyles from "./styles";
import { useEffect, useState } from "react";
import useStyler from "../../../../common/hooks/styler/hooks";
import StringValidator from "../../../../../libs/string_validator";
import { TouchedCoordinate, VehicleInfo, VehicleInfoInputBoxProps, VehicleValidationResult } from "./types";

export default function VehicleInfoInputBox({
    initialVehicleInfo,
    onValidation,
    onTouchInputBox,
    onChangeVehicleInfo,
}: VehicleInfoInputBoxProps) {
    const MODEL_MIN_LENGTH: number = 3;
    const MODEL_MAX_LENGTH: number = 15;

    const messages = useScreenMessage();
    const styles = useVehicleInfoInputBoxStyles();
    const { theme } = useStyler();
    const validator = new StringValidator();

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

    const validatePlateNumber = (plateNumber: string): boolean => {
        return validator.isCorrectVehiclePlateNumber(plateNumber);
    };

    const validateModel = (model: string): boolean => {
        const inCorrectLength: boolean = MODEL_MIN_LENGTH <= model.length && model.length <= MODEL_MAX_LENGTH;
        let hadSpecialChar: boolean = false;

        // 공백을 특수문자로 보기 때문에 아래와 같이 검사함
        model.split(" ").forEach((word) => {
            if (word === "" || validator.hasSpecialChar(word)) {
                hadSpecialChar = true;
            }
        });
        if (!hadSpecialChar && inCorrectLength) {
            return true;
        }
        return false;
    };

    const [vehicleValid, setVehicleValid] = useState<VehicleValidationResult>(
        initialVehicleInfo !== undefined
            ? {
                  plateNumber: validatePlateNumber(initialVehicleInfo.plateNumber),
                  model: validateModel(initialVehicleInfo.model),
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
                            [name as keyof VehicleValidationResult]: validatePlateNumber(text),
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
                            [name as keyof VehicleValidationResult]: validateModel(text),
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
