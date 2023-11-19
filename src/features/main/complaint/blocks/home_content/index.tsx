import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import ComplaintHomeViewModel from "../../screens/home/view_model";
import useHomeContentCardStyle from "./styles";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import ColorLable from "../../../../common/blocks/universial/color_label.tsx";
import useStyler from "../../../../common/hooks/styler/hooks";
import { ComplaintStatus } from "../../../../../libs/rest_apis/villife/complaint/types";
import useUserInformation from "../../../../common/hooks/service/user_info";
import Icon from "../../../../common/atoms/icon";

export default function HomeContentFromComplaint() {
    const messages = useScreenMessage();
    const viewModel = ComplaintHomeViewModel();
    const style = useHomeContentCardStyle();
    const message = useScreenMessage();
    const user = useUserInformation();
    const navigation = useNavigation<VillifeNavigation>();
    const { theme, deviceUI } = useStyler();

    return (
        <MiniContent
            title={user?.isAdmin ? "빌라 민원" : messages.messages.main.complaint.renter_home_content_title}
            navigation={{ to: "complaint" }}
            eanbleShadow={false}>
            {viewModel.uiState.loading ? (
                <View style={{ justifyContent: "center", flex: 1 }}>
                    <ActivityIndicator size="large" color={theme.color.specified.grey} />
                </View>
            ) : viewModel.uiState.complaintsWillBeDisplayed.length == 0 ? (
                /*           <Pressable
                    onPress={() => {
                        if (!user?.isAdmin) navigation.navigate("complaint_register", {});
                    }}>
                    <Text style={style.text}>
                        {user?.isAdmin
                            ? message.messages.main.complaint.when_complaint_empty_admin
                            : message.messages.main.complaint.when_complaint_empty_admin}
                    </Text>
                </Pressable> */
                <Pressable
                    onPress={() => {
                        if (!user?.isAdmin) navigation.navigate("complaint_register", {});
                    }}
                    style={style.whenEmpty}>
                    <Text style={style.whenEmptyCardText}>
                        {user?.isAdmin ? (
                            message.messages.main.complaint.when_complaint_empty_admin
                        ) : (
                            <View style={style.whenEmptyText}>
                                <Text style={style.whenEmptyCardText}>현재 민원이 없어요.</Text>
                                <Text style={style.whenEmptyCardText}>클릭 하시면 민원 등록 가능해요.</Text>
                            </View>
                        )}
                    </Text>
                    <View style={style.whenEmptyIcon}>
                        <Icon name="check_illustration" size={10} />
                    </View>
                </Pressable>
            ) : (
                <View style={style.contentContainer}>
                    {viewModel.uiState.complaintsWillBeDisplayed.map((complaint, index) => {
                        if (index > 2) return;

                        let labelText = messages.messages.main.complaint.done;
                        let labelStyle = style.completedLabel;

                        switch (complaint.status) {
                            case "received":
                                labelText = messages.messages.main.complaint.received;
                                labelStyle = style.receivedLabel;
                                break;
                            case "in_progress":
                                labelText = messages.messages.main.complaint.inprogress;
                                labelStyle = style.progressLabel;
                                break;
                        }

                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("complaint_detail", complaint);
                                }}
                                key={complaint.id}
                                style={style.itemContainer}>
                                <Text style={style.text}>{complaint.title}</Text>
                                <ColorLable
                                    text={labelText}
                                    backgroundColor={labelStyle.backgroundColor}
                                    textColor={labelStyle.color}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </MiniContent>
    );
}
