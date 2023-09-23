import { ActivityIndicator, Pressable, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { LayoutAnimation } from "react-native";
import { OutlinedBoxProps } from "./type";
import NotiLable from "../noti_label.tsx";
import NotiBottomEditModal from "../bottom_edit_modal";
import useNotiOutlinedBoxStyles from "./style";
import AutoHeightWebView from "react-native-autoheight-webview";
import RemoteCSS from "../../../../../libs/themes/remote_css";
import useStyler from "../../../../common/hooks/styler/hooks";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import useUserInformation from "../../../../common/hooks/service/user_info";
import { Shadow } from "react-native-shadow-2";
import Icon from "../../../../common/atoms/icon";

/**
 * @param OutlinedBoxProp
 * @description this components are used by noti and complaint domains which are in charge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const styles = useNotiOutlinedBoxStyles();
    const user = useUserInformation();
    const { theme } = useStyler();
    const navigation = useNavigation<VillifeNavigation>();

    const [unfold, setUnfold] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);

    useEffect(() => {
        return () => {
            setEditModalVisible(false);
        };
    }, []);

    const onPress = async (position: number) => {
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
    };

    return (
        <>
            <NotiBottomEditModal visible={editModalVisible} setVisible={setEditModalVisible} noticeInfo={props} />

            <Shadow style={styles.container} distance={4}>
                <View style={styles.innerBox}>
                    <Pressable
                        onPress={() => onPress(props.position)}
                        style={[styles.innerTitleSection, { borderBottomWidth: unfold ? 2 : 0 }]}>
                        <View style={styles.contentBox}>
                            <NotiLable priority={props.priority} />
                            <View style={styles.titleTextBox}>
                                <Text style={props.title.length < 12 ? styles.titleText : styles.titleTextSmall}>
                                    {props.title}
                                </Text>
                                <Text style={styles.subTitleText}>{props.wroteAt}</Text>
                            </View>
                            <View style={styles.absoluteWrapper}>
                                <View style={styles.iconBox}>
                                    {unfold && user?.isAdmin && (
                                        <TouchableOpacity
                                            style={styles.editButton}
                                            onPress={() => {
                                                setEditModalVisible(true);
                                            }}>
                                            <Icon
                                                name={"pencil"}
                                                size={styles.editIcon.width}
                                                color={styles.editIcon.color}
                                            />
                                        </TouchableOpacity>
                                    )}
                                    {showActivityIndicator ? (
                                        <ActivityIndicator
                                            size={styles.indicator.size}
                                            color={styles.indicator.color}
                                        />
                                    ) : (
                                        <TouchableOpacity onPress={() => onPress(props.position)}>
                                            <Icon
                                                name={unfold ? "arrow-up" : "arrow-down"}
                                                size={styles.vectorIcon.width}
                                                color={styles.vectorIcon.color}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    </Pressable>

                    {unfold && (
                        <AutoHeightWebView
                            style={styles.foldedContainer}
                            customStyle={`
                                ${RemoteCSS.getPretendardRegular()}
                                body {
                                    font-size: 14px;
                                    font-family:"Pretendard-Regular";
                                }
                                div {
                                    color: ${theme.color.specified.black.toString()};
                                }
                                img {
                                    width: 50vw !important;
                                    height: 50vw !important;
                                    object-fit: cover;
                                    display:block;
                                    border-radius: 15px;
                                }`}
                            source={{ html: props.content }}
                            cacheEnabled={false}
                            onLoadEnd={() => {
                                setShowActivityIndicator(false);
                                props.flatListRef.current?.scrollToIndex({
                                    animated: false,
                                    index: props.position,
                                });
                            }}
                            customScript={`
                                try {
                                    const images = document.getElementsByTagName('img'); 
                                    for (const image of images) {
                                        image.addEventListener('click', () => {
                                            const src = image.src
                                            window.ReactNativeWebView.postMessage(JSON.stringify(src));
                                        });
                                    }
                                } catch(e){
                                    window.ReactNativeWebView.postMessage(JSON.stringify("error"));
                                }`}
                            javaScriptEnabled={true}
                            onMessage={(event) => {
                                const imageUri = JSON.parse(event.nativeEvent.data);
                                navigation.navigate("image_detail_view", {
                                    uri: imageUri,
                                });
                            }}
                            scalesPageToFit={false}
                            viewportContent={"width=device-width, user-scalable=no"}></AutoHeightWebView>
                    )}
                </View>
            </Shadow>
        </>
    );
}

export default OutlinedBox;
