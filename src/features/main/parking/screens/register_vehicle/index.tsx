import { Text, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import RegisterVehicleScreenProps from "./types";
import ContentBox from "../../../../common/blocks/content_box";
import useRegisterVehicleScreenStyles from "./styles";
import ParkingScreenGuide from "../../blocks/screen_guide";
import EtdaTimePicker from "../../blocks/etad_time_picker";
import UniversalTextInput from "../../../../common/blocks/universial/textinput";
import { useEffect, useState } from "react";
import StringValidator from "../../../../../libs/string_validator";
import SimpleNavComponent from "../../../../common/blocks/navigation/navcomponent";
import useStyler from "../../../../common/hooks/styler/hooks";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { TOAST_DEFAULT_OFFSET, TOAST_DEFAULT_VISIBILITY_TIME } from "../../../../common/constants";
import { EtdaTime } from "../../blocks/etad_time_picker/types";

type Vehicle = EtdaTime & {
    plateNumber: string;
    model: string;
};

export default function RegisterVehicleScreen({ navigation, route }: RegisterVehicleScreenProps) {
    const MODEL_MIN_LENGTH: number = 3;
    const MODEL_MAX_LENGTH: number = 15;

    const messages = useScreenMessage();
    const styles = useRegisterVehicleScreenStyles();
    const { theme } = useStyler();

    const validator = new StringValidator();

    const [vehicle, setVehicle] = useState<Vehicle>({
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

    const handlePressRegisterBtn = () => {
        const modelValid: boolean = validateModel(vehicle.model);
        const plateNumberValid: boolean = validatePlateNumber(vehicle.plateNumber);

        if (!modelValid && !plateNumberValid) {
            Toast.show({
                type: "error",
                text1: messages.messages.main.parking.register_vehicle.invalid_plate_number_and_model,
                position: "bottom",
                visibilityTime: TOAST_DEFAULT_VISIBILITY_TIME,
                bottomOffset: TOAST_DEFAULT_OFFSET,
            });

            return;
        }

        !plateNumberValid &&
            Toast.show({
                type: "error",
                text1: messages.messages.main.parking.register_vehicle.invalid_plate_number,
                position: "bottom",
                visibilityTime: TOAST_DEFAULT_VISIBILITY_TIME,
                bottomOffset: TOAST_DEFAULT_OFFSET,
            });

        !modelValid &&
            Toast.show({
                type: "error",
                text1: messages.messages.main.parking.register_vehicle.invalid_model,
                position: "bottom",
                visibilityTime: TOAST_DEFAULT_VISIBILITY_TIME,
                bottomOffset: TOAST_DEFAULT_OFFSET,
            });

        if (modelValid && plateNumberValid) {
            // Regsiter Service 등록
            console.log("Good");
        }
    };

    useEffect(() => {
        console.log(vehicle);
    }, [vehicle]);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.parking.register_vehicle.screen_title,
                navComponent: SimpleNavComponent,
                navComponentProps: {
                    title: messages.messages.words.register,
                    onPress: handlePressRegisterBtn,
                },
            }}>
            <View style={styles.container}>
                <ParkingScreenGuide
                    title={messages.messages.main.parking.register_vehicle.register_own_vehicle}
                    subtitle={messages.messages.main.parking.register_vehicle.request_input_vehicle_info}
                />
                <View style={styles.etdaPickerContainer}>
                    <EtdaTimePicker
                        onTimeChange={(time) => {
                            setVehicle({ ...vehicle, ...time });
                        }}
                    />
                </View>
                <View style={styles.vehicleInfoInputsContainer}>
                    <View style={styles.vehicleInfoInputContainer}>
                        <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.plate_number}</Text>
                        <UniversalTextInput
                            name="plateNumber"
                            placeholder={
                                messages.messages.main.parking.register_vehicle.vehicle_plate_number_input_placeholder
                            }
                            highlightColor={
                                vehicle.plateNumber !== "" && !validatePlateNumber(vehicle.plateNumber)
                                    ? theme.colorFamily.red
                                    : undefined
                            }
                            lowlightColor={
                                vehicle.plateNumber !== "" && !validatePlateNumber(vehicle.plateNumber)
                                    ? theme.colorFamily.red
                                    : undefined
                            }
                            onChangeText={(text, name) => setVehicle({ ...vehicle, [name as keyof Vehicle]: text })}
                        />
                    </View>
                    <View style={styles.vehicleInfoInputContainer}>
                        <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.vehicle_model}</Text>
                        <UniversalTextInput
                            name="model"
                            placeholder={
                                messages.messages.main.parking.register_vehicle.vehicle_model_number_input_placeholder
                            }
                            highlightColor={
                                vehicle.model !== "" && !validateModel(vehicle.model)
                                    ? theme.colorFamily.red
                                    : undefined
                            }
                            lowlightColor={
                                vehicle.model !== "" && !validateModel(vehicle.model)
                                    ? theme.colorFamily.red
                                    : undefined
                            }
                            onChangeText={(text, name) => setVehicle({ ...vehicle, [name as keyof Vehicle]: text })}
                        />
                    </View>
                </View>
            </View>
        </NavigationView>
    );
}
