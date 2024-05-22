import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import React, { useMemo, useState } from "react";
import { OutlinedBoxProps } from "./type";
import NotiLable from "../noti_label.tsx";
import NotiBottomEditModal from "../bottom_edit_modal";
import useNotiOutlinedBoxStyles from "./style";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import { Shadow } from "react-native-shadow-2";
import Icon from "../../../../common/atoms/icon";
import { addSearchParamsToPathname } from "../../../../common/global_function";

/**
 * @param OutlinedBoxProp
 * @description this components are used by noti and complaint domains which are in charge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const styles = useNotiOutlinedBoxStyles();
    const navigation = useNavigation<VillifeNavigation>();

    const [editModalVisible, setEditModalVisible] = useState(false);
    const url = useMemo(() => {
        return addSearchParamsToPathname("https://myvillife.com/mobile-view/notice", {
            content: props.content,
            createdAt: props.wroteAt,
            title: props.title,
            priority: props.priority.toString(),
        });
    }, [props]);

    /* const onPress = async (position: number) => {
        if (!loading) {
            setLoading(true);
            if (!unfold) {
                setShowActivityIndicator(true);
            }
            LayoutAnimation.configureNext({
                duration: 50,
                update: {
                    type: LayoutAnimation.Types.linear,
                },
            });
            setUnfold(!unfold);
            setLoading(false);
        }
    }; */

    return (
        <>
            <NotiBottomEditModal visible={editModalVisible} setVisible={setEditModalVisible} noticeInfo={props} />
            <Shadow style={[styles.container, styles.innerBox]} distance={4}>
                <TouchableOpacity
                    style={styles.innerTitleSection}
                    activeOpacity={0.6}
                    onPress={() =>
                        navigation.navigate("general_webview", {
                            title: "공지사항",
                            url: url,
                        })
                    }>
                    <View style={styles.contentBox}>
                        <NotiLable priority={props.priority} />
                        <View style={styles.titleTextBox}>
                            <Text style={styles.titleText} numberOfLines={3}>
                                {props.title.length < 14 ? props.title : props.title.slice(0, 14) + "..."}
                            </Text>
                            <Text style={styles.subTitleText}>{props.wroteAt}</Text>
                        </View>
                        <View style={styles.absoluteWrapper}>
                            <View style={styles.iconBox}>
                                <Icon
                                    name={"arrow-right"}
                                    size={styles.vectorIcon.width}
                                    color={styles.vectorIcon.color}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Shadow>
        </>
    );
}

export default OutlinedBox;
