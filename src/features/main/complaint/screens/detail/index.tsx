import { useEffect, useRef, useState } from "react";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintDetailScreenProps from "./type";
import useComplaintDetailSecreenStyle from "./style";
import {
    Keyboard,
    LayoutAnimation,
    ScrollView,
    Text,
    TextInput,
    Touchable,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import RemoteCSS from "../../../../../libs/themes/remote_css";
import AutoHeightWebView from "react-native-autoheight-webview";
import useUserInfoService from "../../../../common/hooks/service/user_info";
import ComplaintStatusLable from "../../blocks/status_lable";
import IconBuilding from "../../../../common/atoms/icon/building";
import { IconPerson } from "../../../../common/atoms/icon/human";
import ComplaintReplyItem from "../../blocks/reply_item";
import ReplyInputSection from "../../blocks/reply_input";
import { useComplaintDetailViewModel } from "./view_model";
import IconPencil from "../../../../common/atoms/icon/pencil";
import ComplaintDetailEditModal from "../../blocks/detail_bottom_edit";
import { AUTHORITY } from "../../../../common/hooks/service/user_info/constant";
import ComplaintProgressEditModal from "../../blocks/progress_edit";

export default function ComplaintDetailScreen({ navigation, route }: ComplaintDetailScreenProps) {
    const messages = useScreenMessage();
    const styles = useComplaintDetailSecreenStyle();
    const uiState = useComplaintDetailViewModel(route.params);
    const userInfoService = useUserInfoService();
    const [editModalVisible, setEditModalVisible] = React.useState(false);
    const [progressEditModalVisible, setProgressEditModalVisible] = React.useState(false);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.complaint.detail,
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{ shown: false }}>
            <ComplaintDetailEditModal
                visible={editModalVisible}
                setVisible={setEditModalVisible}
                ComplaintInfo={route.params}
            />
            <ComplaintProgressEditModal
                modalVisible={progressEditModalVisible}
                setModalVisible={setProgressEditModalVisible}
                complaint={route.params}
            />
            <ScrollView style={[styles.topLevelBox]} scrollEventThrottle={20}>
                <>
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>{route.params.title}</Text>
                        <TouchableOpacity>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => {
                                    if (userInfoService.basicInfo?.authority == AUTHORITY.ADMIN) {
                                        setProgressEditModalVisible(true);
                                        return;
                                    }
                                    setEditModalVisible(true);
                                }}>
                                <IconPencil size={(styles.iconSize.width as number) * 3} />
                                <Text style={styles.registerButtonText}>
                                    {userInfoService.basicInfo?.authority == AUTHORITY.ADMIN
                                        ? messages.messages.main.complaint.progress_status
                                        : messages.messages.words.edit}
                                </Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </>
                <View style={styles.statusBarSection}>
                    <ComplaintStatusLable status={route.params.status} />
                    <View style={styles.blockWithIcon}>
                        <IconBuilding size={styles.iconSize.width as number} />
                        <Text>{route.params.building_name}</Text>
                    </View>
                    <View style={styles.blockWithIcon}>
                        <IconPerson color="black" size={(styles.iconSize.width as number) * 2} />
                        <Text>{route.params.complainant_name}</Text>
                    </View>
                </View>
                <AutoHeightWebView
                    style={styles.webViewContainer}
                    customStyle={`${RemoteCSS.getPretendardRegular()}
                    body {
                      font-size: 14px;
                      font-family:"Pretendard-Regular";
                    }
                    div {
                      color: #333;
                    }
                    img {
                        width: 50vw !important;
                        height: 50vw !important;
                        object-fit: cover;
                        display:block;
                        border-radius: 15px;
                      }`}
                    source={{ html: route.params.content }}
                    scalesPageToFit={false}
                    viewportContent={"width=device-width, user-scalable=no"}></AutoHeightWebView>
                {uiState.replies.length > 0 ? (
                    <View>
                        <Text style={styles.replyTitle}>답글</Text>
                        <View style={styles.horizontalLine}></View>
                        {uiState.replies.map((reply, inedx) => {
                            return (
                                <View key={reply.id} style={styles.replyItem}>
                                    <ComplaintReplyItem data={reply} />
                                </View>
                            );
                        })}
                    </View>
                ) : (
                    <></>
                )}
            </ScrollView>
            <ReplyInputSection complaintID={route.params.id} />
        </NavigationView>
    );
}
