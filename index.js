/**
 * @format
 */

import { Alert, AppRegistry } from "react-native";
import App from "./src/app";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";

/**
 *  [TO-DO] iOS에서는 메세지 발생 안함. 추가 조치 필요함.
    기능 구현 리스트
    1. 유저의 방 변경시 User Storage 변경 필요
* */
messaging().onMessage(async (message) => {
    Alert.alert(message.notification.title, message.notification.body);
});
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
