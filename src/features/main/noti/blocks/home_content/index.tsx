import { Pressable, Text, TouchableOpacity, View } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import ColorLable from "../../../../common/blocks/universial/color_label.tsx";
import useStyler from "../../../../common/hooks/styler/hooks";
import useHomeContentCardStyle from "./styles";
import useNotiViewModel from "../outlined_box_list/useNotiViewModel";
import useUserInformation from "../../../../common/hooks/service/user_info";
import Icon from "../../../../common/atoms/icon";

export default function HomeContentFromNoti() {
    const messages = useScreenMessage();
    const style = useHomeContentCardStyle();
    const message = useScreenMessage();
    const user = useUserInformation();
    const viewModel = useNotiViewModel();
    const navigation = useNavigation<VillifeNavigation>();

    return (
        <MiniContent
            title={messages.messages.main.noti.screen_title}
            navigation={{ to: "noti_home" }}
            eanbleShadow={false}>
            {viewModel?.length == 0 ? (
                <Pressable
                    onPress={() => {
                        if (user?.isAdmin) navigation.navigate("noti_register", {});
                    }}
                    style={style.whenEmpty}>
                    <Text style={style.whenEmptyCardText}>
                        {user?.isAdmin ? (
                            <View style={style.whenEmptyText}>
                                <Text style={style.whenEmptyCardText}>현재 공지사항이 없어요.</Text>
                                <Text style={style.whenEmptyCardText}>클릭 하시면 공지사항 등록 가능해요.</Text>
                            </View>
                        ) : (
                            "현재 등록되어 있는 공지사항이 없어요."
                        )}
                    </Text>
                    <View style={style.whenEmptyIcon}>
                        <Icon name="document_illustration" size={10} />
                    </View>
                </Pressable>
            ) : (
                <View style={style.contentContainer}>
                    {viewModel === undefined ? (
                        <></>
                    ) : (
                        viewModel
                            .sort((a, b) => {
                                // Priority 숫자가 낮을 수록 우선 순위가 높음
                                if (a.Priority < b.Priority) return -1;
                                else if (a.Priority > b.Priority) return 1;
                                return 0;
                            })
                            .map((noti, index) => {
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
