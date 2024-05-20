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

/**
 * @param OutlinedBoxProp
 * @description this components are used by noti and complaint domains which are in charge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const styles = useNotiOutlinedBoxStyles();
    const navigation = useNavigation<VillifeNavigation>();

    const [editModalVisible, setEditModalVisible] = useState(false);
    const url = useMemo(() => {
        return addSearchParamsToPathname("http://192.168.0.27:3000/mobile-view/notice", {
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

function addSearchParamsToPathname(pathname: string, params: Record<string, string>): string {
    const searchParams = new URLSearchParams();

    // params 객체에서 키와 값을 추출하여 searchParams에 추가
    for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, value);
    }

    // searchParams가 비어있지 않다면 문자열로 변환
    const queryString = searchParams.toString();

    // 새로운 경로 생성 (query string이 비어있지 않은 경우만 추가)
    return queryString ? `${pathname}?${queryString}` : pathname;
}
