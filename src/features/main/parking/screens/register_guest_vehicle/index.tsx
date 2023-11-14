import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import RegisterGuestVehicleScreenProps, { GuestVehicle } from "./types";
import useRegisterVehicleScreenStyles from "./styles";
import { useState } from "react";
import GuestVehicleInfoInputBox from "./blocks/input_box";
import { GuestVehicleValidationResult } from "./blocks/input_box/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useParkingLot from "../../services/parking_lot";
import DateRangePicker from "./blocks/date_etda_picker";
import type { DateRange } from "../../blocks/modal/date_selection/types";
import StardustDateParser from "../../../../../libs/date_parser";
import ScreenTitleView from "../../../../common/blocks/title_view";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";

export default function RegisterGuestVehicleScreen({ navigation, route }: RegisterGuestVehicleScreenProps) {
    const messages = useScreenMessage();
    const styles = useRegisterVehicleScreenStyles();
    const parkingLot = useParkingLot();
    const [dateTimeRange, setDateTimeRange] = useState<DateRange | null>(null);
    const [guestVehicle, setGuestVehicle] = useState<GuestVehicle>({
        model: "guest_vehicle",
        phoneNumber: null,
        plateNumber: null,
        visitingPerpose: null,
    });
    const [alert, setAlert] = useState<StardustAlertContent>({
        type: "primary",
        title: messages.messages.main.parking.common.registration_successful,
        visible: false,
    });

    const handlePressRegisterBtn = async () => {
        if (guestVehicle.phoneNumber && guestVehicle.plateNumber && guestVehicle.visitingPerpose && dateTimeRange) {
            const isSuccessful = await parkingLot.registerGuestVehicle({
                eta: StardustDateParser.serialize(dateTimeRange.startDate),
                etd: StardustDateParser.serialize(dateTimeRange.endDate),
                guestPhoneNumber: guestVehicle.phoneNumber,
                model: guestVehicle.model,
                plateNumber: guestVehicle.plateNumber,
                vehicleType: "4WD",
                visitingPurpose: guestVehicle.visitingPerpose,
            });

            const alertTitle: string = isSuccessful
                ? messages.messages.main.parking.common.registration_successful
                : messages.messages.main.parking.common.registration_failure;

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
                title: messages.messages.main.parking.register_guest_vehicle.screen_title,
                style: {
                    backgroundColor: styles.navView.backgroundColor,
                },
            }}
            bodyOptions={{
                backgroundColor: styles.navView.backgroundColor,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <ScreenTitleView
                titles={[messages.messages.main.parking.register_guest_vehicle.register_guest_vehicle]}
                subtitles={[messages.messages.main.parking.register_guest_vehicle.request_input_vehicle_info]}
                bottomButton={{
                    title: "등록하기",
                    onPress: () => handlePressRegisterBtn(),
                    disabled: !(
                        guestVehicle.phoneNumber &&
                        guestVehicle.plateNumber &&
                        guestVehicle.visitingPerpose &&
                        dateTimeRange !== null
                    ),
                }}
                disablePaddingTop>
                <KeyboardAwareScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    enableOnAndroid={true}>
                    <StardustAlert {...alert} setAlert={setAlert} />
                    <View style={styles.etdaPickerContainer}>
                        <DateRangePicker onChangeDateTimeRange={setDateTimeRange} />
                    </View>
                    <View style={styles.vehicleInfoInputsContainer}>
                        <GuestVehicleInfoInputBox
                            onChangeGuestVehicleInfo={(info) => {
                                setGuestVehicle({
                                    ...guestVehicle,
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
