import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import RegisterVehicleScreenProps, { VehicleChunk } from "./types";
import useRegisterVehicleScreenStyles from "./styles";
import EtdaTimePicker from "../../blocks/etad_time_picker";
import { useState } from "react";
import VehicleInfoInputBox from "./blocks/input_box";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenTitleView from "../../../../common/blocks/title_view";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import useParkingViewmodel from "../../viewmodel";
import VillifeToastMessage from "../../../../common/atoms/toast";

export default function RegisterVehicleScreen({ navigation, route }: RegisterVehicleScreenProps) {
    const messages = useScreenMessage();
    const styles = useRegisterVehicleScreenStyles();
    const viewModel = useParkingViewmodel();

    const [vehicle, setVehicle] = useState<VehicleChunk>({
        plateNumber: null,
        model: null,
        eta: {
            hour: 0,
            minute: 0,
        },
        etd: {
            hour: 0,
            minute: 0,
        },
    });
    const [alert, setAlert] = useState<StardustAlertContent>({
        type: "primary",
        title: messages.messages.main.parking.common.registration_successful,
        visible: false,
    });

    const handlePressRegisterBtn = async () => {
        if (viewModel === null) {
            VillifeToastMessage.showBottomToast("error", "알 수 없는 오류가 발생했습니다.");

            return;
        }

        if (vehicle.model && vehicle.plateNumber) {
            const isSuccessful: boolean = await viewModel.registerVehicle({
                ownerType: "user",
                eta: viewModel.convertUserVehicleTime(vehicle.eta),
                etd: viewModel.convertUserVehicleTime(vehicle.etd),
                plateNumber: vehicle.plateNumber,
                model: vehicle.model,
                vehicleType: "4WD",
            });

            const alertTitle: string = isSuccessful
                ? messages.messages.main.parking.common.request_registration_successful
                : messages.messages.main.parking.common.request_registration_failure;
            const alertMessages: string | undefined = isSuccessful
                ? undefined
                : messages.messages.boilerplate.try_again_soon;

            setAlert({
                ...alert,
                visible: true,
                type: isSuccessful ? "primary" : "error",
                title: alertTitle,
                message: alertMessages,
                buttons: [
                    {
                        text: "확인",
                        onPress: () => {
                            isSuccessful
                                ? navigation.reset({
                                      index: 0,
                                      routes: [{ name: "parking", params: {} }],
                                  })
                                : setAlertUnvisible();
                        },
                    },
                ],
            });
        }
    };

    const setAlertUnvisible = () => {
        setAlert({ ...alert, visible: false });
    };

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.parking.register_vehicle.screen_title,
                style: {
                    backgroundColor: styles.navView.backgroundColor,
                },
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
                backgroundColor: styles.navView.backgroundColor,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <ScreenTitleView
                titles={[messages.messages.main.parking.register_vehicle.register_own_vehicle]}
                subtitles={[messages.messages.main.parking.register_vehicle.request_input_vehicle_info]}
                bottomButton={{
                    title: "등록하기",
                    onPress: () => handlePressRegisterBtn(),
                    disabled: !(vehicle.model && vehicle.plateNumber),
                }}
                disablePaddingTop>
                <KeyboardAwareScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    //scrollEnabled={false}
                    enableOnAndroid={true}>
                    <StardustAlert {...alert} setAlert={setAlert} />
                    <View style={styles.etdaPickerContainer}>
                        <EtdaTimePicker
                            onTimeChange={(time) => {
                                setVehicle({ ...vehicle, ...time });
                            }}
                            enableShadow
                        />
                    </View>
                    <View style={styles.vehicleInfoInputsContainer}>
                        <VehicleInfoInputBox
                            onChangeVehicleInfo={(info) => {
                                setVehicle({
                                    ...vehicle,
                                    ...info,
                                });
                            }}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </ScreenTitleView>
        </NavigationView>
    );
}
