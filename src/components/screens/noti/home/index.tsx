import { Pressable, TouchableHighlight, View } from "react-native";
import NoticeHomeScreenProps from "./type";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeModules, Text } from "react-native";
import React from "react";
import Button from "../../../atoms/button";
import { LayoutAnimation } from "react-native";

function NoticeHomeScreen(props: NoticeHomeScreenProps) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: "100%", height: "10%", backgroundColor: "red" }}>
                <Text>Top Nav</Text>
            </View>
            <NotiItem />
            <NotiItem />
            <NotiItem />
            <NotiItem />
            <NotiItem />
            <NotiItem />
            <NotiItem />
            <NotiItem />
            <NotiItem />
            <NotiItem />
        </SafeAreaView>
    );
}

export default NoticeHomeScreen;

type NotiItemProps = {
    priority?: string;
    title?: string;
    content?: string;
    wroteAt?: string;
};

function NotiItem(props: NotiItemProps) {
    const [unfold, setUnfold] = React.useState(false);

    const onPress = () => {
        setUnfold(!unfold);
        LayoutAnimation.linear();
    };

    return (
        <>
            {unfold ? (
                <TouchableHighlight
                    onPressOut={() => {
                        onPress();
                    }}
                    style={{ width: "100%", height: "20%", backgroundColor: "blue" }}>
                    <View></View>
                </TouchableHighlight>
            ) : (
                <TouchableHighlight
                    onPressOut={() => {
                        onPress();
                    }}
                    style={{ width: "100%", height: "10%", backgroundColor: "blue" }}>
                    <View></View>
                </TouchableHighlight>
            )}
        </>
    );
}
