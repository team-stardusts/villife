import { View, Text, TouchableOpacity, Pressable, ScrollView, ActivityIndicator } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintHomeScreenProps from "./types";
import useComplaintHomeSecreenStyle from "./styles";
import IconPlus from "../../../../common/atoms/icon/plus";
import ComplaintContentCard from "../../blocks/content_card";
import ComplaintHomeViewModel from "./view_model";
import React, { useEffect } from "react";
import ComplaintHomeEditModal from "../../blocks/home_bottom_edit";
import IconArrow from "../../../../common/atoms/icon/arrow";
import IconFilterSetting from "../../../../common/atoms/icon/filter_setting";
import useUserInformation from "../../../../common/hooks/service/user_info";
import IllustrationDocument from "../../../../common/atoms/icon/document_illustration";
import Icon from "../../../../common/atoms/icon";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function ComplaintHomeScreen({ navigation, route }: ComplaintHomeScreenProps) {
    const messages = useScreenMessage();
    const { deviceUI, theme } = useStyler();

    const styles = useComplaintHomeSecreenStyle();
    const viewModel = ComplaintHomeViewModel();
    const user = useUserInformation();
    const [editModalVisible, setEditModalVisible] = React.useState(false);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.complaint.screen_title,
            }}
            bodyOptions={{ applyDefaultVerticalPadding: false, applyDefaultHorizontalPadding: true }}>
            <ComplaintHomeEditModal
                visible={editModalVisible}
                setVisible={setEditModalVisible}
                setDisplayMode={viewModel.setDisplayMode}
            />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/*자주 묻는 민원 버튼
                 <TouchableOpacity onPress={() => navigation.navigate("noti_home", {})}>
                    <View style={styles.FAQContainer}>
                        <View style={styles.FAQTextContainer}>
                            <Text style={styles.FAQTitle}>
                                {messages.messages.main.complaint.frequently_reported_complaints}
                            </Text>
                            <IconArrow
                                direction="right"
                                size={styles.arrowIcon.width as number}
                                color={styles.arrowIcon.backgroundColor}
                            />
                        </View>
                    </View>
                </TouchableOpacity> */}
                {!user?.isAdmin && (
                    <TouchableOpacity
                        style={styles.registerContainer}
                        onPress={() => {
                            navigation.navigate("complaint_register", {});
                        }}>
                        <View style={styles.registerTextContainer}>
                            <Text style={styles.registerTitle}>{messages.messages.main.complaint.register}</Text>
                            <IconPlus size={styles.plusIcon.width as number} color={styles.plusIcon.borderColor} />
                        </View>
                    </TouchableOpacity>
                )}
                <View style={styles.complaintBox}>
                    <View style={styles.menuContainer}>
                        <Text style={styles.menuTitleText}>{viewModel.uiState.menuTitle}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setEditModalVisible(true);
                            }}>
                            <IconFilterSetting
                                size={styles.filterIcon.width as number}
                                color={styles.filterIcon.borderColor}
                            />
                        </TouchableOpacity>
                    </View>
                    {viewModel.uiState.loading ? (
                        <View style={{ justifyContent: "center", minHeight: deviceUI.moderateScale(320) }}>
                            <ActivityIndicator size="large" color={theme.color.specified.grey} />
                        </View>
                    ) : viewModel.uiState.complaintsWillBeDisplayed.length > 0 ? (
                        viewModel.uiState.complaintsWillBeDisplayed
                            /* .sort((a, b) => {
                                return (
                                    new Date(b.updated_at.substring(0, 10)) - new Date(a.updated_at.substring(0, 10))
                                );
                            }) */
                            .map((item) => {
                                return (
                                    <View key={item.id} style={{ alignItems: "center" }}>
                                        <ComplaintContentCard
                                            info={item}
                                            onPress={() => navigation.navigate("complaint_detail", item)}
                                        />
                                    </View>
                                );
                            })
                    ) : (
                        <View style={styles.whenEmpty}>
                            <Text style={styles.whenEmptyCardText}>현재 민원이 없어요.</Text>
                            <View style={{ alignContent: "center" }}>
                                <Icon name="check_illustration" size={4} />
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </NavigationView>
    );
}
