import { View } from "react-native";
import NoticeHomeScreenProps from "./type";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import React from "react";
import FlatListOutlinedContentsBox from "../../../blocks/noti_screens/outlined_box_list";
import Button from "../../../atoms/button";

function NoticeHomeScreen(props: NoticeHomeScreenProps) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: "100%", height: "10%", backgroundColor: "red" }}>
                <Text>Top Nav</Text>
                <Button
                    style={{ width: 200, height: 50, backgroundColor: "blue" }}
                    title="공지사항 등록"
                    titleStyle={{ color: "white" }}
                    onPress={() => props.navigation.navigate("noti_register", {})}></Button>
            </View>
            <FlatListOutlinedContentsBox />

            <View style={{ width: "100%", height: "10%", backgroundColor: "red" }}>
                <Text>Bottom Nav</Text>
            </View>
        </SafeAreaView>
    );
}

export default NoticeHomeScreen;
