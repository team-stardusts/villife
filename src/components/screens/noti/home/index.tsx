import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import NoticeHomeScreenProps from "./type";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeModules, Text } from "react-native";
import React from "react";
import Button from "../../../atoms/button";
import { LayoutAnimation } from "react-native";
import { Image } from "react-native-svg";
import PressableVectorIcon from "../../../blocks/icon/vector/index";

function NoticeHomeScreen(props: NoticeHomeScreenProps) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: "100%", height: "10%", backgroundColor: "red" }}>
                <Text>Top Nav</Text>
            </View>
            <View style={{ height: "80%", width: "100%", alignItems: "center" }}>
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
            </View>
            <View style={{ width: "100%", height: "10%", backgroundColor: "red" }}>
                <Text>Bottom Nav</Text>
            </View>
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
    const size = Dimensions.get("window");

    const onPress = () => {
        setUnfold(!unfold);
        LayoutAnimation.configureNext({
            duration: 100,
            update: {
                type: LayoutAnimation.Types.linear,
            },
        });
    };

    return (
        <>
            <Pressable
                onPressOut={() => {
                    if (!unfold) onPress();
                }}
                style={[NotiItemStyle.container, { minHeight: size.height * 0.1 * 0.8 }]}>
                <View style={NotiItemStyle.innerBox}>
                    <View
                        style={[
                            NotiItemStyle.innerTitleSection,
                            {
                                height: size.height * 0.1 * 0.8,
                                borderBottomWidth: !unfold ? 0 : 2,
                                borderBottomColor: "#0B75F2",
                            },
                        ]}>
                        <NotiLable priority={0} />
                        <View style={NotiItemStyle.titleTextBox}>
                            <Text style={[]}>공지사항제목</Text>
                            <Text style={[]}>2023-01</Text>
                        </View>
                        <View style={NotiItemStyle.absoluteWrapper}>
                            <PressableVectorIcon
                                onPress={() => {
                                    onPress();
                                }}
                                providerName={unfold ? "up" : "down"}
                                diameter={30}
                            />
                        </View>
                    </View>
                    {unfold && (
                        <Text>
                            {
                                "hello \n hello \n hello \n hello \n hello \n hello \n hello \n hello \n hello \n hello \n hello \n hello \n hello \n hello \n"
                            }
                        </Text>
                    )}
                </View>
            </Pressable>
        </>
    );
}

const NotiItemStyle = StyleSheet.create({
    container: {
        width: "90%",
        borderWidth: 2,
        borderColor: "#0B75F2",
        marginVertical: "1.5%",
        borderRadius: 15,
        overflow: "hidden",
    },
    innerBox: {
        alignItems: "center",
        overflow: "visible",
    },
    innerTitleSection: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
    },
    titleTextBox: {
        marginLeft: "5%",
    },
    absoluteWrapper: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
    },
});

// @description 0: must read , 1: normal
type NotiPriority = 0 | 1 | 2 | 3;

type NotiLableProps = {
    priority: NotiPriority;
};
function NotiLable(props: NotiLableProps) {
    switch (props.priority) {
        case 0:
            return (
                <View style={[NotiLableStyle.container, { backgroundColor: "#EC2222" }]}>
                    <Text>필독</Text>
                </View>
            );
        case 1:
            return (
                <View style={[NotiLableStyle.container, { backgroundColor: "#7C7C7C" }]}>
                    <Text>필독</Text>
                </View>
            );
        case 2:
        case 3:

        default:
            return <></>;
    }
}

const NotiLableStyle = StyleSheet.create({
    container: {
        width: "15%",
        height: "50%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
