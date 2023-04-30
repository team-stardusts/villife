import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { Alert, BackHandler, Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import useAuthService from "../../../../hooks/services/login/hooks";
import { loginDataState } from "../../../../hooks/states/atoms/login";
import { LoginDataStateType } from "../../../../hooks/states/atoms/login/types";
import Icon from "../../../atoms/icon";
import NavigationView from "../../../blocks/navigation";
import IconNavComponent from "../../../blocks/navigation/icon_navcomponent";
import HomeScreenProps from "./type";
import HomeScreenContent from "./content";
import useHomeScreenStyles from "./styles";
import HomeContentFromComplaint from "../complaint/home_content";
import useStyler from "../../../../hooks/styler/hooks";

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
    const messages = useScreenMessage();
    const styles = useHomeScreenStyles();
    const { theme } = useStyler();

    const contents = [
        HomeContentFromComplaint,
        HomeContentFromComplaint,
        HomeContentFromComplaint,
        HomeContentFromComplaint,
    ];

    const getBgColor = (index: number) => {
        const colors = [theme.colorFamily.blue, theme.colorFamily.lightblue, theme.colorFamily.green];

        return colors[index % 3];
    };

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.home.screen_title,
                navComponent: IconNavComponent,
                // [TO-DO] caption: 공지사항 -> messages.~~
                navComponentProps: {
                    iconName: "speaker",
                    caption: messages.messages.main.noti.screen_title,
                    onPress: () => {
                        navigation.navigate("noti_home");
                    },
                },
            }}>
            <View style={styles.toplevelBox}>
                <ScrollView style={styles.contentsScrollBox}>
                    {contents.map((Content, index) => (
                        <Content key={index} backgroundColor={getBgColor(index)} />
                    ))}
                </ScrollView>
            </View>
        </NavigationView>
    );
}
