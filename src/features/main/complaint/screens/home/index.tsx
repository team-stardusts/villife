import { View, Text, TouchableOpacity, FlatList, Pressable } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintHomeScreenProps, { ComplaintHomeDisplayMode } from "./types";
import useComplaintHomeSecreenStyle from "./styles";
import IconQuestionMark from "../../../../common/atoms/icon/question_mark";
import PressableVectorIcon from "../../../../common/blocks/icon/vector";
import IconPlus from "../../../../common/atoms/icon/plus";
import ComplaintContentCard from "../../blocks/content_card";
import { ComplaintInfo } from "../../services/type";
import ComplaintHomeViewModel from "./view_model";
import React, { useEffect } from "react";
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
                    pagingEnabled
                    data={viewModel.uiState.complaintsWillBeDisplayed}
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

const sampleData: Array<ComplaintInfo> = [
    {
        id: 6,
        title: "세탁기가 고장났어요",
        content:
            "<div>세탁기가 고장나서 매우 불편합니다. 고쳐주세요!</div> </br> <div> 3일전부터 안되기 시작했고 사진 첨부합니다. </div><div>세탁기가 고장나서 매우 불편합니다. 고쳐주세요!</div> </br> <div> 3일전부터 안되기 시작했고 사진 첨부합니다. </div><div>세탁기가 고장나서 매우 불편합니다. 고쳐주세요!</div> </br> <div> 3일전부터 안되기 시작했고 사진 첨부합니다. </div><div>세탁기가 고장나서 매우 불편합니다. 고쳐주세요!</div> </br> <div> 3일전부터 안되기 시작했고 사진 첨부합니다. </div><div>세탁기가 고장나서 매우 불편합니다. 고쳐주세요!</div> </br> <div> 3일전부터 안되기 시작했고 사진 첨부합니다. </div><div>세탁기가 고장나서 매우 불편합니다. 고쳐주세요!</div> </br> <div> 3일전부터 안되기 시작했고 사진 첨부합니다. </div> <br/> <br/> <br/>  <br/> <br/> <br/> <br/> <br/> <br/>",
        status: "received",
        created_at: "2022-12-01",
        updated_at: "",
    },
    {
        id: 2,
        title: "세탁기가 고장났어요",
        content: "내용2222",
        status: "in_progress",
        created_at: "2022-12-01",
        updated_at: "",
    },
    {
        id: 3,
        title: "세탁기가 고장났어요",
        content: "내용",
        status: "in_progress",
        created_at: "2022-12-01",
        updated_at: "",
    },
    {
        id: 4,
        title: "세탁기가 고장났어요",
        content: "내용",
        status: "in_progress",
        created_at: "2022-12-01",
        updated_at: "",
    },
];
const sampleData2: Array<ComplaintInfo> = [
    {
        id: 1,
        title: "세탁기가 고장났어요",
        content: "내용",
        status: "completed",
        created_at: "2022-12-01",
        updated_at: "",
    },
    {
        id: 2,
        title: "세탁기가 고장났어요",
        content: "내용",
        status: "completed",
        created_at: "2022-12-01",
        updated_at: "",
    },
    {
        id: 3,
        title: "세탁기가 고장났어요",
        content: "내용",
        status: "completed",
        created_at: "2022-12-01",
        updated_at: "",
    },
    {
        id: 4,
        title: "세탁기가 고장났어요",
        content: "내용",
        status: "completed",
        created_at: "2022-12-01",
        updated_at: "",
    },
];
