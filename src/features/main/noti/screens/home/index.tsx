import { TouchableOpacity, View } from "react-native";
import NoticeHomeScreenProps from "./type";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import React from "react";
import FlatListOutlinedContentsBox from "../../../../common/blocks/noti_screens/outlined_box_list";
import NavigationView from "../../../../common/blocks/navigation";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";

function test({ name }: { name: string }) {
    const navigation = useNavigation<VillifeNavigation>();
    return (
        <View
            style={{
                height: "100%",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingRight: 15,
            }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("noti_register", {});
                }}>
                <Text>작성하기</Text>
            </TouchableOpacity>
        </View>
    );
}

function NoticeHomeScreen(props: NoticeHomeScreenProps) {
    return (
        <NavigationView
            headerOptions={{
                title: "공지사항",
                shown: true,
                navComponent: test,
                navComponentProps: {
                    name: "Hello!",
                },
            }}>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatListOutlinedContentsBox />
            </SafeAreaView>
        </NavigationView>
    );
}

export default NoticeHomeScreen;
