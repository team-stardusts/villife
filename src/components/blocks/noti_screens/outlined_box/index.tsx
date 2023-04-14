import { Dimensions, FlatList, ListRenderItemInfo, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import React from "react";
import { LayoutAnimation } from "react-native";
import OutlinedBoxStyle from "./style";
import PressableVectorIcon from "../../icon/vector";
import { OutlinedBoxProps } from "./type";
import NotiLable from "../box_label.tsx";

/**
 * @param OutlinedBoxProp
 * @description this componets are used by noti and complaint domains which are incharge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
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
                style={[OutlinedBoxStyle.container, { minHeight: size.height * 0.1 * 0.8, width: size.width * 0.9 }]}>
                <View style={OutlinedBoxStyle.innerBox}>
                    <View
                        style={[
                            OutlinedBoxStyle.innerTitleSection,
                            {
                                height: size.height * 0.1 * 0.8,
                                borderBottomWidth: !unfold ? 0 : 2,
                                borderBottomColor: "#0B75F2",
                            },
                        ]}>
                        <NotiLable priority={props.priority} name={props.priorityName} />
                        <View style={OutlinedBoxStyle.titleTextBox}>
                            <Text style={[]}>공지사항제목</Text>
                            <Text style={[]}>2023-01</Text>
                        </View>
                        <View style={OutlinedBoxStyle.absoluteWrapper}>
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

export default OutlinedBox;
