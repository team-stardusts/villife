import { Alert, Text, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import SendParkPushNotiScreenProps, { MessagesProps } from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import ParkingScreenGuide from "../../blocks/screen_guide";
import SimpleNavComponent from "../../../../common/blocks/navigation/header/navcomponent";
import { TimePickerTime } from "../../../../common/atoms/time_picker/types";
import { useEffect, useState } from "react";
import useSendParkPushNotiScreenStyles from "./styles";
import TimePicker from "../../../../common/atoms/time_picker";
import useParkService from "../../services/park";

export default function SendParkPushNotiScreen({ navigation, route }: SendParkPushNotiScreenProps) {
    const messages = useScreenMessage().messages;
    const { sendMessage } = useParkService();
    const styles = useSendParkPushNotiScreenStyles();
    const [content, setContent] = useState<string>("");

    return (
        <NavigationView
            headerOptions={{
                title: messages.main.parking.send_park_push_noti.screen_title,
                navComponent: SimpleNavComponent,
                navComponentProps: {
                    title: messages.words.register,
                    onPress: async () => {
                        console.log("[SEND_PARK_PUSH_NOTI]", route.params.vehicleID);
                        const isSuccessful: boolean = await sendMessage({
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

                        Alert.alert(alertTitle, alertMessage, [
                            {
                                onPress: () => {
                                    isSuccessful &&
                                        navigation.reset({
                                            index: 0,
                                            routes: [{ name: "parking", params: {} }],
                                        });
                                },
                            },
                        ]);
                    },
                },
            }}>
            <View style={styles.main.container}>
                <View style={styles.main.screenGuideBox}>
                    <ParkingScreenGuide
                        title={messages.main.parking.send_park_push_noti.screen_title}
                        subtitle={messages.main.parking.send_park_push_noti.request_to_send_park_noti}
                    />
                </View>
                <View style={styles.main.messageBox}>
                    <Messages
                        screenMessages={messages}
                        styles={styles.message}
                        messageType={route.params.messageType}
                        onMessageChange={setContent}
                    />
                </View>
            </View>
        </NavigationView>
    );
}

function Messages({ screenMessages, styles, messageType, onMessageChange }: MessagesProps) {
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

        setContent(_message);
    }, [time]);

    useEffect(() => {
        onMessageChange(message.join("\n"));
    }, [message]);

    return (
        <View style={styles.container}>
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
