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
import { VillifeStackParamList } from "./features/common/router/types";
import CodePush from "react-native-code-push";
import codePushOptions from "./code-push-options";
import { checkNotifications } from "react-native-permissions";
import villifeVersion from "./libs/villife-version";
import linking from "./features/common/router/link-options";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

// Naming convention을 변경하는 function들을 위함.
global.Buffer = global.Buffer || require("buffer").Buffer;

function App(): JSX.Element {
    checkNotifications().then((r) => console.log("[NOTI_PERMISSION]", r));

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
