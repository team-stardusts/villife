import { View, Text, TouchableOpacity, FlatList, Pressable } from "react-native";
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

export default function ComplaintHomeScreen({ navigation, route }: ComplaintHomeScreenProps) {
    const messages = useScreenMessage();
    const styles = useComplaintHomeSecreenStyle();
    const viewModel = ComplaintHomeViewModel();
    const [editModalVisible, setEditModalVisible] = React.useState(false);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.complaint.screen_title,
            }}>
            <ComplaintHomeEditModal
                visible={editModalVisible}
                setVisible={setEditModalVisible}
                setDisplayMode={viewModel.setDisplayMode}
            />

            <View style={styles.topLevelBox}>
                <TouchableOpacity onPress={() => navigation.navigate("noti_home", {})}>
                    <View style={styles.FAQContainer}>
                        <IconQuestionMark size={styles.questionMarkIconSize.width as number} />
                        <View style={styles.FAQTextContainer}>
                            <Text style={styles.FAQTitle}>
                                {messages.messages.main.complaint.frequently_reported_complaints}
                            </Text>
                            <Text style={styles.FAQContent}>
                                {messages.messages.main.complaint.frequently_reported_complaints_guide}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.menuContainer}>
                    <TouchableOpacity
                        style={styles.menuTitleBox}
                        onPress={() => {
                            setEditModalVisible(true);
                        }}>
                        <Text style={styles.menuTitleText}>{viewModel.uiState.menuTitle}</Text>
                        <PressableVectorIcon
                            providerName={"right"}
                            diameter={styles.vectorIconSize.height as number}></PressableVectorIcon>
                    </TouchableOpacity>
                    <View style={styles.registerButtonWrapper}>
                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={() => {
                                navigation.navigate("complaint_register", {});
                            }}>
                            <IconPlus size={styles.plusIconSize.width as number} />
                            <Text style={styles.registerButtonText}>{messages.messages.main.complaint.register}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
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
                                <IconPlus size={styles.plusIconSize.width as number} />
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
                />
            </View>
        </NavigationView>
    );
}
