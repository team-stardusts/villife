import { View, Text, TouchableOpacity, FlatList, Pressable, ScrollView } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintHomeScreenProps, { ComplaintHomeDisplayMode } from "./types";
import useComplaintHomeSecreenStyle from "./styles";
import IconQuestionMark from "../../../../common/atoms/icon/question_mark";
import PressableVectorIcon from "../../../../common/blocks/icon/vector";
import IconPlus from "../../../../common/atoms/icon/plus";
import ComplaintContentCard from "../../blocks/content_card";
import ComplaintHomeViewModel from "./view_model";
import React from "react";
import ComplaintHomeEditModal from "../../blocks/home_bottom_edit";
import IconArrow from "../../../../common/atoms/icon/arrow";
import IconFilterSetting from "../../../../common/atoms/icon/filter_setting";

export default function ComplaintHomeScreen({ navigation, route }: ComplaintHomeScreenProps) {
    const messages = useScreenMessage();
    const styles = useComplaintHomeSecreenStyle();
    const viewModel = ComplaintHomeViewModel();
    const [editModalVisible, setEditModalVisible] = React.useState(false);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.complaint.screen_title,
            }}
            bodyOptions={{ applyDefaultVerticalPadding: false }}>
            <ComplaintHomeEditModal
                visible={editModalVisible}
                setVisible={setEditModalVisible}
                setDisplayMode={viewModel.setDisplayMode}
            />
            <ScrollView style={styles.topLevelContainer}>
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
                </TouchableOpacity>
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
                    {viewModel.uiState.complaintsWillBeDisplayed.map((item) => (
                        <Pressable
                            key={item.id} // Make sure to assign a unique key
                            onPress={() => {
                                navigation.navigate("complaint_detail", item);
                            }}
                            style={{ alignItems: "center" }}>
                            <ComplaintContentCard info={item} />
                        </Pressable>
                    ))}
                    {/*  <FlatList
                        style={styles.flatList}
                        contentContainerStyle={styles.flatListContainer}
                        data={viewModel.uiState.complaintsWillBeDisplayed}
                        ListEmptyComponent={() => {
                            return (
                                <TouchableOpacity
                                    style={styles.whenEmptyCard}
                                    onPress={() => {
                                        navigation.navigate("complaint_register", {});
                                    }}>
                                    <Text style={styles.whenEmptyCardText}>
                                        {messages.messages.main.complaint.when_complaint_empty}
                                    </Text>
                                    <IconPlus
                                        size={(styles.plusIcon.width as number) * 2}
                                        color={styles.plusIcon.borderColor}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                        renderItem={(info) => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate("complaint_detail", info.item);
                                    }}
                                    style={{ marginVertical: 2 }}>
                                    <ComplaintContentCard info={info.item} />
                                </Pressable>
                            );
                        }}
                    /> */}
                </View>
            </ScrollView>
        </NavigationView>
    );
}
