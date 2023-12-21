import { useEffect } from "react";
import FirebaseMessagingEventHandler from "../event";
import { MessagingEvent, MessagingEventData } from "../types";
import { Alert, AlertButton } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VillifeRouterParams } from "../../../../router/types";
import { IEventListenable } from "../../../../global_interface";
import { UserInfoRefreshable } from "../../../../../auth/services/authentication/types";
import useAuthService from "../../../../../auth/services/authentication";

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

            if (name === "residence-approved") {
                const userInfoRefresher: UserInfoRefreshable = useAuthService();

                buttons = [
                    {
                        text: "확인",
                        onPress: () => userInfoRefresher.refreshUserInfo(),
                    },
                ];
            }

            if (name === "management-fee-deposit-confirmation") {
                buttons = [
                    {
                        text: "확인",
                        onPress: () => {
                            const routes = navigation.getState().routes;
                            const rootRoute = routes[0].name;

                            if (rootRoute === "management_fee" || rootRoute === "home") {
                                navigation.reset({
                                    index: 0,
                                    routes: [...(routes as any)],
                                });
                            }
                        },
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
