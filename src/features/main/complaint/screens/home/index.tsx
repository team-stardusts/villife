import { View, Text, TouchableOpacity, Pressable, ScrollView } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintHomeScreenProps from "./types";
import useComplaintHomeSecreenStyle from "./styles";
import IconPlus from "../../../../common/atoms/icon/plus";
import ComplaintContentCard from "../../blocks/content_card";
import ComplaintHomeViewModel from "./view_model";
import React from "react";
import ComplaintHomeEditModal from "../../blocks/home_bottom_edit";
import IconArrow from "../../../../common/atoms/icon/arrow";
import IconFilterSetting from "../../../../common/atoms/icon/filter_setting";
import useUserInformation from "../../../../common/hooks/service/user_info";

export default function ComplaintHomeScreen({ navigation, route }: ComplaintHomeScreenProps) {
    const messages = useScreenMessage();
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
                    {viewModel.uiState.complaintsWillBeDisplayed.map((item) => {
                        //console.log("[complaint 변경 ComplaintHomeScreen] : ", item);
                        return (
                            <View key={item.id} style={{ alignItems: "center" }}>
                                <ComplaintContentCard
                                    info={item}
                                    onPress={() => navigation.navigate("complaint_detail", item)}
                                />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </NavigationView>
    );
}
