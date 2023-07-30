import { Image, SafeAreaView } from "react-native";
import ImageDetailViewProp from "./type";
import useImageDetailViewScreenStyles from "./style";
import NavigationView from "../../blocks/navigation";
import useScreenMessage from "../../hooks/multilingual/hooks";

export default function ImageDetailView({ navigation, route }: ImageDetailViewProp) {
    const style = useImageDetailViewScreenStyles();
    const message = useScreenMessage();
    return (
        <NavigationView
            headerOptions={{
                shown: false,
                title: message.messages.image_detail.title,
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{ shown: false }}>
            <SafeAreaView style={style.screen.topLevelBox}>
                <Image style={style.imageBox.image} source={{ uri: route.params.uri }}></Image>
            </SafeAreaView>
        </NavigationView>
    );
}
