import { View, Text, TouchableOpacity, FlatList } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintHomeScreenProps from "./type";
import useComplaintHomeSecreenStyle from "./style";
import IconQuestionMark from "../../../../common/atoms/icon/question_mark";
import PressableVectorIcon from "../../../../common/blocks/icon/vector";
import IconPlus from "../../../../common/atoms/icon/plus";
import ComplaintContentCard from "../../blocks/content_card/indext";
import { ComplaintInfo } from "../../services/type";

export default function ComplaintHomeScreen({ navigation, route }: ComplaintHomeScreenProps) {
    const messages = useScreenMessage();
    const styles = useComplaintHomeSecreenStyle();

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.complaint.screen_title,
            }}>
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
                    <TouchableOpacity style={styles.menuTitleBox}>
                        <Text style={styles.menuTitleText}>
                            {messages.messages.main.complaint.complaints_in_progress}
                        </Text>
                        <PressableVectorIcon
                            providerName={"right"}
                            diameter={styles.vectorIconSize.height as number}></PressableVectorIcon>
                    </TouchableOpacity>
                    <View style={styles.registerButtonWrapper}>
                        <TouchableOpacity style={styles.registerButton}>
                            <IconPlus size={styles.plusIconSize.width as number} />
                            <Text style={styles.registerButtonText}>{messages.messages.main.complaint.register}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    style={styles.flatList}
                    contentContainerStyle={styles.flatListContainer}
                    pagingEnabled
                    data={sampleData}
                    renderItem={(info) => {
                        return (
                            <View style={{ marginVertical: 2 }}>
                                <ComplaintContentCard info={info.item} />
                            </View>
                        );
                    }}
                />

                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuTitleBox}>
                        <Text style={styles.menuTitleText}>{messages.messages.main.complaint.complaints_done}</Text>
                        <PressableVectorIcon
                            providerName={"right"}
                            diameter={styles.vectorIconSize.height as number}></PressableVectorIcon>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.flatList}
                    contentContainerStyle={styles.flatListContainer}
                    pagingEnabled
                    data={sampleData2}
                    renderItem={(info) => {
                        return (
                            <View style={{ marginVertical: 2 }}>
                                <ComplaintContentCard info={info.item} />
                            </View>
                        );
                    }}
                />
            </View>
        </NavigationView>
    );
}

const sampleData: Array<ComplaintInfo> = [
    {
        id: 1,
        title: "세탁기가 고장났어요",
        content: "내용",
        status: "received",
        created_at: "2022-12-01",
        updated_at: "",
    },
    {
        id: 2,
        title: "세탁기가 고장났어요",
        content: "내용",
        status: "received",
        created_at: "2022-12-01",
        updated_at: "",
    },
    {
        id: 3,
        title: "세탁기가 고장났어요",
        content: "내용",
        status: "received",
        created_at: "2022-12-01",
        updated_at: "",
    },
    {
        id: 4,
        title: "세탁기가 고장났어요",
        content: "내용",
        status: "received",
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
