import { Image, SafeAreaView } from "react-native";
import ImageDetailViewProp from "./type";
import useImageDetailViewScreenStyles from "./style";
import NavigationView from "../../blocks/navigation";

export default function ImageDetailView({ navigation, route }: ImageDetailViewProp) {
    const style = useImageDetailViewScreenStyles();
    return (
        <NavigationView
            headerOptions={{
                title: "사진 자세히 보기",
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
