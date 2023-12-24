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
import { VillifeRootStackParamList } from "./features/common/router/types";
import CodePush from "react-native-code-push";
import codePushOptions from "./code-push-options";
// import
import VersionCheck from "react-native-version-check";
import { checkNotifications } from "react-native-permissions";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

// Naming convention을 변경하는 function들을 위함.
global.Buffer = global.Buffer || require("buffer").Buffer;

function App(): JSX.Element {
    checkNotifications().then(console.log);
    const linking: LinkingOptions<VillifeRootStackParamList> = {
        prefixes: ["villife://"],
        config: {
            initialRouteName: "login",
            screens: {
                login: {
                    path: "login",
                },
                parking: {
                    exact: true,
                    path: "parking",
                },
                lease_contract: {
                    exact: true,
                    path: "lease-contract",
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
