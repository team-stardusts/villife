/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src/app";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";

// [TO-DO] iOS에서는 메세지 발생 안함. 추가 조치 필요함.
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
