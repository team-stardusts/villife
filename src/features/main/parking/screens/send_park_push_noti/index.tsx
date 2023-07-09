import { Text, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import SendParkPushNotiScreenProps from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import ParkingScreenGuide from "../../blocks/screen_guide";
import SimpleNavComponent from "../../../../common/blocks/navigation/header/navcomponent";
import { TimePickerTime } from "../../../../common/atoms/time_picker/types";
import { useEffect, useState } from "react";
import useSendParkPushNotiScreenStyles from "./styles";
import MultilingualMessage from "../../../../common/hooks/multilingual";
import TimeSelectionModal from "../../blocks/time_selection_modal";
import TimePicker from "../../../../common/atoms/time_picker";

export default function SendParkPushNotiScreen({ navigation, route }: SendParkPushNotiScreenProps) {
    const messages = useScreenMessage();
    const styles = useSendParkPushNotiScreenStyles();

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.parking.send_park_push_noti.screen_title,
                navComponent: SimpleNavComponent,
                navComponentProps: {
                    title: messages.messages.words.register,
                    onPress: () => console.log("ㅎㅇ"),
                },
            }}>
            <View style={styles.main.container}>
                <View style={styles.main.screenGuideBox}>
                    <ParkingScreenGuide
                        title={messages.messages.main.parking.send_park_push_noti.screen_title}
                        subtitle={messages.messages.main.parking.send_park_push_noti.request_to_send_park_noti}
                    />
                </View>
                <View style={styles.main.messageBox}>
                    <Messages
                        messages={messages}
                        styles={styles.message}
                        messageType={route.params.messageType}
                        onTimeChange={() => console.log("gg")}
                    />
                </View>
            </View>
        </NavigationView>
    );
}

type MessagesProps = {
    messages: MultilingualMessage;
    styles: ReturnType<typeof useSendParkPushNotiScreenStyles>["message"];
    messageType: SendParkPushNotiScreenProps["route"]["params"]["messageType"];
    onTimeChange(time: TimePickerTime): void;
};

function Messages({ messages, styles, messageType, onTimeChange }: MessagesProps) {
    const [time, setTime] = useState<TimePickerTime>({
        hour: null,
        minute: null,
    });
    const [timeSelectorVisable, setTimeSelectorVisable] = useState<boolean>(false);

    useEffect(() => {}, [time]);

    return (
        <View style={styles.container}>
            {messageType === "double_parking" ? (
                <View style={styles.messageRow}>
                    <Text style={styles.message}>
                        {messages.messages.main.parking.send_park_push_noti.parked_double}
                    </Text>
                </View>
            ) : (
                <></>
            )}
            <View style={styles.timeRow}>
                <TimePicker
                    height={styles.timeRow.height}
                    focusedcolor={styles.timeFocused.color}
                    unFocusedColor={styles.timeUnfocused.color}
                />
            </View>
            <View style={styles.messageRow}>
                <Text style={styles.message}>
                    {messages.messages.main.parking.send_park_push_noti.scheduled_to_depart_at}
                </Text>
            </View>
            <View style={styles.messageRow}>
                {messageType === "double_parking" ? (
                    <Text style={styles.message}>
                        {messages.messages.main.parking.send_park_push_noti.request_noti_to_go_out_first}
                    </Text>
                ) : (
                    <Text style={styles.message}>
                        {messages.messages.main.parking.send_park_push_noti.request_to_change_the_parking_spot}
                    </Text>
                )}
            </View>
            <TimeSelectionModal
                visible={timeSelectorVisable}
                setVisible={setTimeSelectorVisable}
                height={styles.timeSelector.height}
            />
        </View>
    );
}
