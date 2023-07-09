import { ActivityIndicator, Pressable, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import React, { useEffect } from "react";
import { LayoutAnimation } from "react-native";
import { OutlinedBoxProps } from "./type";
import NotiLable from "../noti_label.tsx";
import PressableVectorIcon from "../../../../common/blocks/icon/vector";
import NotiBottomEditModal from "../bottom_edit_modal";
import { EditIcon } from "../../../../common/atoms/icon/edit";
import useNotiOutlinedBoxStyles from "./style";
import AutoHeightWebView from "react-native-autoheight-webview";
import RemoteCSS from "../../../../../libs/themes/remote_css";
import useUserInfoService from "../../../../common/hooks/service/user_info";
import { VILLIFE_AUTHORITY } from "../../../../../libs/rest_apis/villife/absc";
import { Polygon } from "react-native-svg";
import useStyler from "../../../../common/hooks/styler/hooks";

/**
 * @param OutlinedBoxProp
 * @description this componets are used by noti and complaint domains which are incharge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const styles = useNotiOutlinedBoxStyles();
    const userInfo = useUserInfoService();
    const { theme } = useStyler();

    const [unfold, setUnfold] = React.useState(false);
    const [editModalVisible, setEditModalVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        return () => {
            console.log("unmount", props.title);
            setEditModalVisible(false);
        };
    }, []);

    const onPress = () => {
        if (!loading) {
            setLoading(true);
            console.log(props);
            setUnfold(!unfold);
            LayoutAnimation.configureNext({
                duration: 50,
                update: {
                    type: LayoutAnimation.Types.linear,
                },
            });
        }
        setLoading(false);
    };

    return (
        <>
            <NotiBottomEditModal visible={editModalVisible} setVisible={setEditModalVisible} noticeInfo={props} />
            <Pressable
                onPressOut={() => {
                    if (!unfold) onPress();
                }}
                style={styles.container}>
                <View style={styles.innerBox}>
                    <View style={[styles.innerTitleSection, { borderBottomWidth: !unfold ? 0 : 2 }]}>
                        <View style={styles.contentBox}>
                            <NotiLable priority={props.priority} />
                            <View style={styles.titleTextBox}>
                                <Text style={styles.titleText}>{props.title}</Text>
                                <Text style={styles.subTitleText}>{props.wroteAt}</Text>
                            </View>
                            <View style={styles.absoluteWrapper}>
                                <View style={styles.iconBox}>
                                    {unfold && userInfo.basicInfo?.authority == VILLIFE_AUTHORITY.ADMIN ? (
                                        <TouchableOpacity
                                            style={styles.editButton}
                                            onPress={() => {
                                                setEditModalVisible(true);
                                            }}>
                                            <EditIcon size={styles.iconEditSize.width as number} />
                                        </TouchableOpacity>
                                    ) : (
                                        <></>
                                    )}
                                    <PressableVectorIcon
                                        onPress={() => {
                                            onPress();
                                        }}
                                        providerName={unfold ? "up" : "down"}
                                        diameter={styles.iconVectorSize.width as number}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    {unfold && (
                        <AutoHeightWebView
                            startInLoadingState={true}
                            renderLoading={() => {
                                return (
                                    <View style={{ justifyContent: "center", marginBottom: 50 }}>
                                        <ActivityIndicator size="large" color={theme.colorFamily.grey} />
                                    </View>
                                );
                            }}
                            style={styles.foldedContainer}
                            // [TO-DO] : 글꼴이랑 색상 양식에 맞게 변경
                            customStyle={`${RemoteCSS.getPretendardRegular()}
                                        body {
                                          font-size: 14px;
                                          font-family:"Pretendard-Regular";
                                        }
                                        div {
                                          color: ${theme.colorFamily.black}; 
                                          
                                        }
                                        img {
                                            width: 50vw !important;
                                            height: 50vw !important;
                                            object-fit: cover;
                                            display:block;
                                            border-radius: 15px;
                                          }`}
                            source={{ html: props.content }}
                            scalesPageToFit={false}
                            viewportContent={"width=device-width, user-scalable=no"}></AutoHeightWebView>
                    )}
                </View>
            </Pressable>
        </>
    );
}

export default OutlinedBox;
