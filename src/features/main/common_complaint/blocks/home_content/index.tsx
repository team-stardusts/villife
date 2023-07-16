import { Pressable, Text, TouchableOpacity, View } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useUserInfoService from "../../../../common/hooks/service/user_info/index";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import ColorLable from "../../../../common/blocks/universial/color_label.tsx";
import useStyler from "../../../../common/hooks/styler/hooks";
import { ComplaintStatus } from "../../../../../libs/rest_apis/villife/complaint/types";
import useHomeContentCardStyle from "./styles";
import useNotiViewModel from "../outlined_box_list/useNotiViewModel";
import IconPlus from "../../../../common/atoms/icon/plus";

export default function HomeContentFromNoti({ backgroundColor }: { backgroundColor: string }) {
    const messages = useScreenMessage();
    const style = useHomeContentCardStyle();
    const message = useScreenMessage();
    const userInfo = useUserInfoService();
    const viewModel = useNotiViewModel();
    const navigation = useNavigation<VillifeNavigation>();
    const { theme, deviceUI } = useStyler();

    return (
        <MiniContent
            title={messages.messages.main.noti.screen_title}
            navigation={{ to: "noti_home" }}
            backgroundColor={backgroundColor}>
            {viewModel?.length == 0 ? (
                <TouchableOpacity
                    style={style.whenEmptyContainer}
                    onPress={() => {
                        if (userInfo.isAdmin()) navigation.navigate("noti_register", {});
                    }}>
                    <Text style={style.text}>
                        {userInfo.isAdmin()
                            ? message.messages.main.noti.when_noti_empty_admin
                            : message.messages.main.noti.when_noti_empty}
                    </Text>
                </TouchableOpacity>
            ) : (
                <View style={style.contentContainer}>
                    {viewModel == undefined ? (
                        <></>
                    ) : (
                        viewModel.map((noti, index) => {
                            if (index > 2) return;

                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("noti_home", noti);
                                    }}
                                    key={noti.ID}
                                    style={style.itemContainer}>
                                    <Text style={style.text}>{noti.Title}</Text>
                                    <ColorLable
                                        text={message.messages.main.noti.required_reading}
                                        backgroundColor={noti.Priority == 1 ? theme.colorFamily.red : backgroundColor}
                                        textColor={noti.Priority == 1 ? theme.colorFamily.white : backgroundColor}
                                    />
                                </TouchableOpacity>
                            );
                        })
                    )}
                </View>
            )}
        </MiniContent>
    );
}
