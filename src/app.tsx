/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import ScreenRouter from "./features/common/router";
import { RecoilRoot } from "recoil";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { Linking, NativeModules } from "react-native";
import Toast from "react-native-toast-message";
import { VillifeRootStackParamList, VillifeRouterParams, VillifeStackParamList } from "./features/common/router/types";
import CodePush from "react-native-code-push";
import codePushOptions from "./code-push-options";
import { checkNotifications } from "react-native-permissions";
import villifeVersion from "./libs/villife-version";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

// Naming convention을 변경하는 function들을 위함.
global.Buffer = global.Buffer || require("buffer").Buffer;

function App(): JSX.Element {
    checkNotifications().then((r) => console.log("[NOTI_PERMISSION]", r));
    const linking: LinkingOptions<VillifeStackParamList> = {
        prefixes: ["villife://"],
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
        /* subscribe: (listener) => {
            // <---- 5
            // <---- 5.a
            const onReceiveURL = ({ url }: any) => listener(url);

            // <---- 5.b
            const handle = Linking.addEventListener("url", (event) => {
                console.log("밥김국", event);
                onReceiveURL(event);
            });
            return () => handle.remove();
        }, */
    };

    return (
        <RecoilRoot>
            <NavigationContainer linking={linking}>
                <ScreenRouter />
                <Toast />
            </NavigationContainer>
        </RecoilRoot>
    );
}

export default CodePush(codePushOptions)(App);
//<RecoilRoot>
//  <ScreenRouter />
//</RecoilRoot>
