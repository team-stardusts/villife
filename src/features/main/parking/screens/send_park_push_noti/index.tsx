import { Alert, Text, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import SendParkPushNotiScreenProps, { MessagesProps } from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import SimpleNavComponent from "../../../../common/blocks/navigation/header/navcomponent";
import { TimePickerTime } from "../../../../common/atoms/time_picker/types";
import { useEffect, useState } from "react";
import useSendParkPushNotiScreenStyles from "./styles";
import TimePicker from "../../../../common/atoms/time_picker";
import useParkingLot from "../../services/parking_lot";
import ScreenTitleView from "../../../../common/blocks/title_view";
import ListBottomSlidableModal from "../../../../common/blocks/bottom_list_modal";
import SelectModal from "../../../../expense/management_fee/screens/detail/blocks/select_modal";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";

export default function SendParkPushNotiScreen({ navigation, route }: SendParkPushNotiScreenProps) {
    const messages = useScreenMessage().messages;
    const parkingLot = useParkingLot();
    const styles = useSendParkPushNotiScreenStyles();
    const [content, setContent] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [alert, setAlert] = useState<StardustAlertContent>({
        type: "primary",
        title: "등록된 차량이 없습니다.\n차량 등록 후 이용해주세요.",
        visible: false,
        buttons: [
            {
                text: "확인",
                onPress: () => navigation.canGoBack() && navigation.goBack(),
            },
        ],
    });
    const [myVehicleNumber, setMyVehicleNumber] = useState<string | null>(null);

    useEffect(() => {
        if (parkingLot.userVehicles.length === 0) {
            setAlert({ ...alert, visible: true });
            return;
        }

        setMyVehicleNumber(parkingLot.userVehicles[0].plate_number);
    }, []);

    return (
        <NavigationView
            headerOptions={{
                title: messages.main.parking.send_park_push_noti.screen_title,
                style: {
                    backgroundColor: styles.main.navContainer.backgroundColor,
                },
                navComponent: SimpleNavComponent,
                navComponentProps: {
                    title: messages.words.register,
                    onPress: async () => {
                        console.log("[SEND_PARK_PUSH_NOTI]", route.params.vehicleID);
                        const isSuccessful: boolean = await parkingLot.sendMessage({
                            vehicleID: route.params.vehicleID,
                            title: messages.main.parking.send_park_push_noti.screen_title,
                            content: content,
                        });

                        const alertTitle: string = isSuccessful
                            ? messages.boilerplate.succeed_to_send_message
                            : messages.boilerplate.fail_to_send_message;
                        const alertMessage: string | undefined = isSuccessful
                            ? undefined
                            : messages.boilerplate.try_again_soon;
                        setAlert({
                            ...alert,
                            type: isSuccessful ? "primary" : "error",
                            title: alertTitle,
                            message: alertMessage,
                            visible: true,
                            buttons: [
                                {
                                    text: "확인",
                                    onPress: () => {
                                        isSuccessful &&
                                            navigation.reset({
                                                index: 0,
                                                routes: [{ name: "parking", params: {} }],
                                            });
                                    },
                                },
                            ],
                        });
                    },
                },
            }}
            bodyOptions={{
                backgroundColor: styles.main.navContainer.backgroundColor,
                applyDefaultVerticalPadding: false,
                applyDefaultHorizontalPadding: false,
            }}>
            <ScreenTitleView
                titles={[messages.main.parking.send_park_push_noti.screen_title]}
                subtitles={[messages.main.parking.send_park_push_noti.request_to_send_park_noti]}
                disablePaddingTop>
                <View style={styles.main.messageBox}>
                    <Messages
                        myVehicleNumber={myVehicleNumber || ""}
                        screenMessages={messages}
                        styles={styles.message}
                        messageType={route.params.messageType}
                        onMessageChange={setContent}
                        onMyVehicleNumberPress={() => setVisible(true)}
                    />
                </View>
            </ScreenTitleView>
            <StardustAlert {...alert} setAlert={setAlert} />
            <ListBottomSlidableModal
                modalVisible={visible}
                setModalVisible={setVisible}
                features={parkingLot.userVehicles
                    .sort((vehicleA, vehicleB) => {
                        try {
                            return (
                                parseInt(vehicleA.plate_number.slice(0, 2)) -
                                parseInt(vehicleB.plate_number.slice(0, 2))
                            );
                        } catch {
                            return 0;
                        }
                    })
                    .map((vehicle) => {
                        return {
                            icon: "car",
                            text: vehicle.plate_number,
                            onPress: () => {
                                setMyVehicleNumber(vehicle.plate_number);
                                setVisible(false);
                            },
                        };
                    })}
            />
        </NavigationView>
    );
}

function Messages({
    myVehicleNumber,
    screenMessages,
    styles,
    messageType,
    onMessageChange,
    onMyVehicleNumberPress,
}: MessagesProps) {
    const [time, setTime] = useState<TimePickerTime>({
        hour: 0,
        minute: 0,
    });
    const [message, setContent] = useState<string[]>([]);

    //const [timeSelectorVisable, setTimeSelectorVisable] = useState<boolean>(false);

    useEffect(() => {
        const _message: string[] = [
            `${time.hour}${screenMessages.words.hour} ${time.minute}${screenMessages.words.minute}${screenMessages.main.parking.send_park_push_noti.scheduled_to_depart_at}`,
            messageType === "double_parking"
                ? screenMessages.main.parking.send_park_push_noti.request_noti_to_go_out_first
                : screenMessages.main.parking.send_park_push_noti.request_to_change_the_parking_spot,
        ];

        messageType === "double_parking" &&
            _message.unshift(screenMessages.main.parking.send_park_push_noti.parked_double);

        _message.unshift(`${myVehicleNumber} 차주 입니다.`);

        setContent(_message);
    }, [time]);

    useEffect(() => {
        onMessageChange(message.join("\n"));
    }, [message]);

    return (
        <View style={styles.container}>
            <View style={[styles.messageRow, { flexDirection: "row" }]}>
                <TouchableOpacity style={styles.myVehicleButton} activeOpacity={0.4} onPress={onMyVehicleNumberPress}>
                    <Text style={styles.myVehicle}>{myVehicleNumber} </Text>
                </TouchableOpacity>
                <Text style={styles.message}>차주 입니다.</Text>
            </View>
            {messageType === "double_parking" ? (
                <View style={styles.messageRow}>
                    <Text style={styles.message}>{screenMessages.main.parking.send_park_push_noti.parked_double}</Text>
                </View>
            ) : (
                <></>
            )}
            <View style={styles.timeRow}>
                <TimePicker
                    height={styles.timeRow.height}
                    focusedcolor={styles.timeFocused.color}
                    unFocusedColor={styles.timeUnfocused.color}
                    onTimeChange={setTime}
                />
            </View>
            <View style={styles.messageRow}>
                <Text style={styles.message}>
                    {screenMessages.main.parking.send_park_push_noti.scheduled_to_depart_at}
                </Text>
            </View>
            <View style={styles.messageRow}>
                {messageType === "double_parking" ? (
                    <Text style={styles.message}>
                        {screenMessages.main.parking.send_park_push_noti.request_noti_to_go_out_first}
                    </Text>
                ) : (
                    <Text style={styles.message}>
                        {screenMessages.main.parking.send_park_push_noti.request_to_change_the_parking_spot}
                    </Text>
                )}
            </View>
            {/* <TimeSelectionModal
                visible={timeSelectorVisable}
                setVisible={setTimeSelectorVisable}
                height={styles.timeSelector.height}
            /> */}
        </View>
    );
}
