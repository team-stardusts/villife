import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintDetailScreenProps from "./type";
import useComplaintDetailSecreenStyle from "./style";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import RemoteCSS from "../../../../../libs/themes/remote_css";
import AutoHeightWebView from "react-native-autoheight-webview";
import ComplaintStatusLable from "../../blocks/status_lable";
import IconBuilding from "../../../../common/atoms/icon/building";
import { IconPerson } from "../../../../common/atoms/icon/human";
import ComplaintReplyItem from "../../blocks/reply_item";
import ReplyInputSection from "../../blocks/reply_input";
import { useComplaintDetailViewModel } from "./view_model";
import IconPencil from "../../../../common/atoms/icon/pencil";
import ComplaintDetailEditModal from "../../blocks/detail_bottom_edit";
import ComplaintProgressEditModal from "../../blocks/progress_edit";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useUserInformation from "../../../../common/hooks/service/user_info";
import Icon from "../../../../common/atoms/icon";
import { Callable } from "../../../../../libs/call/types";
import Telephone from "../../../../../libs/call";
import VillifeToastMessage from "../../../../common/atoms/toast";

export default function ComplaintDetailScreen({ navigation, route }: ComplaintDetailScreenProps) {
    const messages = useScreenMessage();
    const styles = useComplaintDetailSecreenStyle();
    const uiState = useComplaintDetailViewModel(route.params);
    const user = useUserInformation();
    const phone: Callable = new Telephone();
    const callTo = async () => {
        console.log("민원", user?.adminInfomation);
        Alert.alert(`${uiState.complaint.complainant_name}와 통화를 하시겠어요?`, undefined, [
            { text: "취소" },
            {
                text: "확인",
                onPress: async () => {
                    const callSuccess = await phone.call(uiState.complaint.phone_number);
                    if (!callSuccess) {
                        VillifeToastMessage.showBottomToast(
                            "error",
                            "죄송합니다. 전화를 연결하지 못했어요. 관리자를 통해 의견 전달 부탁드려요."
                        );
                    }
                },
            },
        ]);
    };

    const [editModalVisible, setEditModalVisible] = React.useState(false);
    const [progressEditModalVisible, setProgressEditModalVisible] = React.useState(false);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.complaint.detail,
                style: {
                    backgroundColor: styles.navContainer.backgroundColor,
                },
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{ shown: false }}>
            <ComplaintDetailEditModal
                visible={editModalVisible}
                setVisible={setEditModalVisible}
                ComplaintInfo={uiState.complaint}
            />
            <ComplaintProgressEditModal
                modalVisible={progressEditModalVisible}
                setModalVisible={setProgressEditModalVisible}
                complaint={uiState.complaint}
            />
            <KeyboardAwareScrollView style={[styles.topLevelBox]} scrollEventThrottle={20}>
                <>
                    <View style={styles.titleSection}>
                        {/* <Text style={styles.title}>{uiState.complaint.title}</Text> */}
                        <Text style={uiState.complaint.title.length < 12 ? styles.title : styles.titleSmall}>
                            {uiState.complaint.title}
                        </Text>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => {
                                if (user?.isAdmin) {
                                    setProgressEditModalVisible(true);
                                    return;
                                }
                                setEditModalVisible(true);
                            }}>
                            <Icon name="pencil" size={styles.editIcon.width} color={styles.editIcon.color} />
                            <Text style={styles.registerButtonText}>
                                {user?.isAdmin
                                    ? messages.messages.main.complaint.progress_status
                                    : messages.messages.words.edit}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
                <View style={styles.statusBarSection}>
                    <ComplaintStatusLable status={uiState.complaint.status} />
                    <View style={styles.blockWithRoomNumber}>
                        <Icon name="home" size={styles.iconBuilding.width} color={styles.iconBuilding.color} />
                        <Text style={styles.textRoomNumber}>{uiState.complaint.room_number}</Text>
                    </View>
                    <View style={styles.blockWithName}>
                        <Icon name="person" size={styles.iconPerson.width} color={styles.iconPerson.color} />
                        <Text style={styles.textRenterName}>{uiState.complaint.complainant_name}</Text>
                    </View>
                </View>
                <View style={styles.webViewContainerMinHeight}>
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
                        source={{ html: uiState.complaint.content }}
                        cacheEnabled={false}
                        customScript={`
                    try {
                        const images = document.getElementsByTagName('img'); 
                        for (const image of images) {
                            image.addEventListener('click', () => {
                                const src = image.src
                                window.ReactNativeWebView.postMessage(JSON.stringify(src));
                            });
                        }
                    }catch(e){
                        window.ReactNativeWebView.postMessage(JSON.stringify("error"));    
                    }
                    `}
                        javaScriptEnabled={true}
                        onMessage={(event) => {
                            const imageUri = JSON.parse(event.nativeEvent.data);
                            navigation.navigate("image_detail_view", { uri: imageUri });
                        }}
                        scalesPageToFit={false}
                        viewportContent={"width=device-width, user-scalable=no"}></AutoHeightWebView>
                </View>

                <View style={styles.replyTitleBox}>
                    <Text style={styles.replyTitle}>답글</Text>
                    {user?.isAdmin ? (
                        <TouchableOpacity
                            style={styles.replyTitleSection}
                            onPress={() => {
                                callTo();
                            }}>
                            <Icon name="phone" size={styles.iconPhone.width} color={styles.iconPhone.color} />
                            <Text style={styles.callText}>전화하기</Text>
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>
                <View style={styles.horizontalLine} />
                {uiState.replies.map((reply, inedx) => {
                    return (
                        <View key={reply.id} style={styles.replyItem}>
                            <ComplaintReplyItem data={reply} />
                        </View>
                    );
                })}
            </KeyboardAwareScrollView>
            <ReplyInputSection complaintID={uiState.complaint.id} />
        </NavigationView>
    );
}
