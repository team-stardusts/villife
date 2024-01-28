import { LinkingOptions } from "@react-navigation/native";
import { VillifeStackParamList } from "./types";
import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { Linking, PushNotification } from "react-native";

function buildDeepLinkFromNotificationData(data: FirebaseMessagingTypes.RemoteMessage["data"]): string | null {
    if (data?.link) {
        return data.link;
    }

    /* const navigationId = data?.navigationId;
    if (!["noti_home"].includes(navigationId as any)) {
        console.warn("Unverified navigationId", navigationId);
        return null;
    }
    if (navigationId === "home") {
        return "villife://home";
    }
    if (navigationId === "settings") {
        return "villife://settings";
    }
    const postId = data?.postId;
    if (typeof postId === "string") {
        return `villife://post/${postId}`;
    }
    console.warn("Missing postId"); */
    return null;
}

const linking: LinkingOptions<VillifeStackParamList> = {
    prefixes: ["villife://"],
    async getInitialURL() {
        /* const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
        await sleep(2000); */
        const url = await Linking.getInitialURL();
        if (typeof url === "string") {
            return url;
        }
        //getInitialNotification: When the application is opened from a quit state.
        const message = await messaging().getInitialNotification();

        const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);

        if (typeof deeplinkURL === "string") {
            console.log("[DeepLinkingTo]", deeplinkURL);
            return deeplinkURL;
        }
    },
    subscribe(listener) {
        const onReceiveURL = (event: any) => {
            const { url } = event;
            console.log("link has url", url, event);
            return listener(url);
        };

        // Listen to incoming links from deep linking
        const linkingSubscription = Linking.addEventListener("url", onReceiveURL);

        //onNotificationOpenedApp: When the application is running, but in the background.
        const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
            const url = buildDeepLinkFromNotificationData(remoteMessage.data);
            if (typeof url === "string") {
                listener(url);
            }
        });

        return () => {
            linkingSubscription.remove();
            unsubscribe();
        };
    },
    config: {
        initialRouteName: "home",
        screens: {
            approval_home: {
                path: "approval_home",
            },
            login: {
                path: "login",
            },
            home: {
                path: "home",
            },
            parking: {
                path: "parking",
            },
            register_vehicle: {
                path: "register_vehicle",
            },
            lease_contract: {
                path: "lease_contract",
            },
            noti_home: {
                path: "noti_home",
            },
            notification_box: {
                path: "notification_box",
            },
            complaint: {
                path: "complaint",
            },
            my_page: {
                path: "my_page",
            },
        },
    },
};

export default linking;
