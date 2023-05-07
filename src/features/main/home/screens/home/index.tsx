import { ScrollView, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import IconNavComponent from "../../../../common/blocks/navigation/icon_navcomponent";
import HomeScreenProps from "./type";
import useHomeScreenStyles from "./styles";
import HomeContentFromComplaint from "../../../complaint/blocks/home_content";
import useStyler from "../../../../common/hooks/styler/hooks";

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
                <ScrollView style={styles.contentsScrollBox} showsVerticalScrollIndicator={false}>
                    {contents.map((Content, index) => (
                        <Content key={index} backgroundColor={getBgColor(index)} />
                    ))}
                </ScrollView>
            </View>
        </NavigationView>
    );
}
