import { useEffect } from "react";
import FirebaseMessagingEventHandler from "../event";
import { MessagingEvent, MessagingEventData } from "../types";
import { Alert, AlertButton } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VillifeRouterParams } from "../../../../router/types";
import { IEventListenable } from "../../../../global_interface";

export default function useFirebaseMessagingListener() {
    const navigation = useNavigation<VillifeRouterParams["navigation"]>();
    const listener: IEventListenable<MessagingEvent, MessagingEventData> = new FirebaseMessagingEventHandler();

    useEffect(() => {
        listener.listenAllEvents((name, data) => {
            if (data.title === undefined) return;

            let buttons: AlertButton[] | undefined = undefined;

            if (name === "vehicle-parking-notification" || name === "vehicle-registration-approval-notification") {
                buttons = [
                    {
                        text: "닫기",
                    },
                    {
                        text: "이동",
                        onPress: () =>
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "parking" }],
                            }),
                    },
                ];
            }

            Alert.alert(data.title, data.body, buttons);
        });

        return () => {
            listener.removeAllListeners();
        };
    }, []);
}
