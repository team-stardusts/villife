import { View } from "react-native";
import NoticeHomeScreenProps from "./type";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import React from "react";
import FlatListOutlinedContentsBox from "../../../blocks/noti_screens/outlined_box_list";
import Button from "../../../atoms/button";
import NavigationView from "../../../blocks/navigation";

function test({ name }: { name: string }) {
    return (
        <View
            style={{
                backgroundColor: "tomato",
                height: "100%",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingRight: 15,
            }}>
            <Text>{name}</Text>
        </View>
    );
}

function NoticeHomeScreen(props: NoticeHomeScreenProps) {
    return (
        <NavigationView
            headerOptions={{
                title: "테스트헤더",
                shown: true,
                navComponent: test,
                navComponentProps: {
                    name: "Hello!",
                },
            }}>
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
        </NavigationView>
    );
}

export default NoticeHomeScreen;
