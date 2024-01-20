import { LinkingOptions } from "@react-navigation/native";
import { VillifeStackParamList } from "./types";
import { Linking } from "react-native";

const linking: LinkingOptions<VillifeStackParamList> = {
    prefixes: ["villife://"],
    subscribe(listener) {
        console.log("linking subscribe to ", listener);
        const onReceiveURL = (event: any) => {
            const { url } = event;
            console.log("link has url", url, event);
            return listener(url);
        };

        const handle = Linking.addEventListener("url", onReceiveURL);
        return () => {
            console.log("linking unsubscribe to ", listener);
            handle.remove();
        };
    },
    config: {
        initialRouteName: "home",
        screens: {
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
