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

type Vehicle = {
    plateNumber: string;
    model: string;
};

export default function RegisterVehicleScreen({ navigation, route }: RegisterVehicleScreenProps) {
    const messages = useScreenMessage();
    const styles = useRegisterVehicleScreenStyles();
    const validator = new StringValidator();

    const [vehicle, setVehicle] = useState<Vehicle>({
        plateNumber: "",
        model: "",
    });

    useEffect(() => {
        console.log(vehicle.model, validator.hasSpecialChar(vehicle.model));
        console.log(vehicle.plateNumber, validator.isCorrectVehiclePlateNumber(vehicle.plateNumber));
    }, [vehicle]);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.parking.register_home.screen_title,
            }}>
            <View style={styles.container}>
                <ParkingScreenGuide
                    title={messages.messages.main.parking.register_home.register_own_vehicle}
                    subtitle={messages.messages.main.parking.register_home.request_input_vehicle_info}
                />
                <View style={styles.etdaPickerContainer}>
                    <EtdaTimePicker />
                </View>
                <View style={styles.vehicleInfoInputsContainer}>
                    <View style={styles.vehicleInfoInputContainer}>
                        <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.plate_number}</Text>
                        <UniversalTextInput
                            name="plateNumber"
                            onChangeText={(text, name) => setVehicle({ ...vehicle, [name as keyof Vehicle]: text })}
                        />
                    </View>
                    <View style={styles.vehicleInfoInputContainer}>
                        <Text style={styles.vehicleInfoInputTitle}>{messages.messages.words.vehicle_model}</Text>
                        <UniversalTextInput
                            name="model"
                            onChangeText={(text, name) => setVehicle({ ...vehicle, [name as keyof Vehicle]: text })}
                        />
                    </View>
                </View>
            </View>
        </NavigationView>
    );
}
