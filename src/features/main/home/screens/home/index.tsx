import { ScrollView, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import HomeScreenProps from "./type";
import useHomeScreenStyles from "./styles";
import useStyler from "../../../../common/hooks/styler/hooks";
import HomeContentFromComplaint from "../../../complaint/blocks/home_content";
import MenuButton from "../../blocks/menu_button";
import HomeContentFromParking from "../../../parking/blocks/home_content";
import HomeContentFromNoti from "../../../noti/blocks/home_content";

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
    const messages = useScreenMessage();
    const styles = useHomeScreenStyles();
    const { theme } = useStyler();

    console.log("[HomeScreen] onCreate");
    const contents = [HomeContentFromComplaint, HomeContentFromNoti, HomeContentFromParking];

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.home.screen_title,
                navComponent: MenuButton,
                /* navComponentProps: {
                    iconName: "speaker",
                    title: messages.messages.main.noti.screen_title,
                    onPress: () => {
                        navigation.navigate("noti_home");
                    },
                }, */
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: true,
                applyDefaultVerticalPadding: false,
            }}>
            <View style={styles.container}>
                {/* <MenuButton /> */}
                <ScrollView style={styles.contentsScrollBox} showsVerticalScrollIndicator={false}>
                    {contents.map((Content, index) => (
                        <Content key={index} />
                    ))}
                </ScrollView>
            </View>
        </NavigationView>
    );
}
