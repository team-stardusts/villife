import { Text, TouchableOpacity, View } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import ColorLable from "../../../../common/blocks/universial/color_label.tsx";
import useStyler from "../../../../common/hooks/styler/hooks";
import useHomeContentCardStyle from "./styles";
import useNotiViewModel from "../outlined_box_list/useNotiViewModel";
import useUserInformation from "../../../../common/hooks/service/user_info";

export default function HomeContentFromNoti() {
    const messages = useScreenMessage();
    const style = useHomeContentCardStyle();
    const message = useScreenMessage();
    const user = useUserInformation();
    const viewModel = useNotiViewModel();
    const navigation = useNavigation<VillifeNavigation>();
    const { theme, deviceUI } = useStyler();

    return (
        <MiniContent
            title={messages.messages.main.noti.screen_title}
            navigation={{ to: "noti_home" }}
            eanbleShadow={false}>
            {viewModel?.length == 0 ? (
                <TouchableOpacity
                    style={style.whenEmptyContainer}
                    onPress={() => {
                        if (user?.isAdmin) navigation.navigate("noti_register", {});
                    }}>
                    <Text style={style.text}>
                        {user?.isAdmin
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

                            let labelText = message.messages.main.noti.reading;
                            let labelStyle = style.generalLabel;

                            if (noti.Priority === 1) {
                                labelStyle = style.requireReadingLabel;
                                labelText = message.messages.main.noti.required_reading;
                            }

                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("noti_home", noti);
                                    }}
                                    key={noti.ID}
                                    style={style.itemContainer}>
                                    <Text style={style.text}>{noti.Title}</Text>
                                    <ColorLable
                                        text={labelText}
                                        backgroundColor={labelStyle.backgroundColor}
                                        textColor={labelStyle.color}
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
