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

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

// Naming convention을 변경하는 function들을 위함.
global.Buffer = global.Buffer || require("buffer").Buffer;

export default function App(): JSX.Element {
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
//<RecoilRoot>
//  <ScreenRouter />
//</RecoilRoot>
