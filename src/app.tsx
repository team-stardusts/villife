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
import { Alert, NativeModules } from "react-native";
import Toast from "react-native-toast-message";
import messaging from "@react-native-firebase/messaging";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default function App(): JSX.Element {
    /**
    *  [TO-DO] iOS에서는 메세지 발생 안함. 추가 조치 필요함.
    기능 구현 리스트
    1. 유저의 방 변경시 User Storage 변경 필요
    **/
    messaging().onMessage(async (message) => {
        if (message.notification) {
            Alert.alert(message.notification?.title || "", message?.notification?.body || "");
        }
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Message handled in the background!", remoteMessage);
    });

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
