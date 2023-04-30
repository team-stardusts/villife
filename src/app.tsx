/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import ScreenRouter from "./features/common/router";
import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { NativeModules } from "react-native";
import Toast from "react-native-toast-message";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
export default function App(): JSX.Element {
    return (
        <RecoilRoot>
            <NavigationContainer>
                <ScreenRouter />
                <Toast />
            </NavigationContainer>
        </RecoilRoot>
    );
}
//<RecoilRoot>
//  <ScreenRouter />
//</RecoilRoot>
