import { ScrollView, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import HomeScreenProps from "./type";
import useHomeScreenStyles from "./styles";
import HomeContentFromComplaint from "../../../complaint/blocks/home_content";
import MenuButton from "../../blocks/menu_button";
import HomeContentFromParking from "../../../parking/blocks/home_content";
import HomeContentFromNoti from "../../../noti/blocks/home_content";

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
    const messages = useScreenMessage();
    const styles = useHomeScreenStyles();

    console.log("[HomeScreen] onCreate");
    const contents = [HomeContentFromComplaint, HomeContentFromNoti, HomeContentFromParking];

    return (
        <NavigationView
            headerOptions={{
                backgroundColor: "#F0F2F5",
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
                backgroundColor: "#F0F2F5",
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
