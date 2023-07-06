import { Pressable, Text, TouchableOpacity, View } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import ComplaintHomeViewModel from "../../screens/home/view_model";
import useHomeContentCardStyle from "./style";
import useUserInfoService from "../../../../common/hooks/service/user_info/index";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import ColorLable from "../../../../common/blocks/universial/color_label.tsx";
import useStyler from "../../../../common/hooks/styler/hooks";
import { ComplaintStatus } from "../../../../../libs/rest_apis/villife/complaint/types";

export default function HomeContentFromComplaint({ backgroundColor }: { backgroundColor: string }) {
    const messages = useScreenMessage();
    const viewModel = ComplaintHomeViewModel();
    const style = useHomeContentCardStyle();
    const message = useScreenMessage();
    const userInfo = useUserInfoService();
    const navigation = useNavigation<VillifeNavigation>();
    const { theme } = useStyler();

    const translateLableText = (status: ComplaintStatus) => {
        switch (status) {
            case "received":
                return message.messages.main.complaint.received;
            case "in_progress":
                return message.messages.main.complaint.inprogress;
            case "completed":
                return message.messages.main.complaint.done;
        }
    };
    return (
        <MiniContent
            title={messages.messages.main.complaint.renter_home_content_title}
            navigation={{ to: "complaint" }}
            backgroundColor={backgroundColor}>
            {viewModel.uiState.complaintsWillBeDisplayed.length == 0 ? (
                <Pressable
                    onPress={() => {
                        if (!userInfo.isAdmin()) navigation.navigate("complaint_register", {});
                    }}>
                    <Text style={style.text}>
                        {userInfo.isAdmin()
                            ? message.messages.main.complaint.when_complaint_empty_admin
                            : message.messages.main.complaint.when_complaint_empty_admin}
                    </Text>
                </Pressable>
            ) : (
                <View style={style.contentContainer}>
                    {viewModel.uiState.complaintsWillBeDisplayed.map((complaint, index) => {
                        if (index > 2) return;

                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("complaint_detail", complaint);
                                }}
                                key={complaint.id}
                                style={style.itemContainer}>
                                <Text style={style.text}>{complaint.title}</Text>
                                <ColorLable
                                    text={translateLableText(complaint.status)}
                                    backgroundColor={theme.colorFamily.green}
                                    textColor={theme.colorFamily.black}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </MiniContent>
    );
}
