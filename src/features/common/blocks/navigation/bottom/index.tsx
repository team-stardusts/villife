import { Text, TouchableOpacity, View } from "react-native";
import useNavigationViewBottomStyles from "./styles";
import Icon from "../../../atoms/icon";
import { useEffect, useState } from "react";
import useRootLinks from "../root_links";
import { useNavigation } from "@react-navigation/native";
import { RouterParams, VillifeStackParamList } from "../../../router/types";
import { RootLink } from "../types";

export default function NavigationViewBottom() {
    const navigation = useNavigation<RouterParams["navigation"]>();
    const styles = useNavigationViewBottomStyles();
    const rootLinks = useRootLinks();

    const [currentRootScreen, setCurrentRootScreen] = useState<keyof VillifeStackParamList>("home");

    const handleLinkPress = (link: RootLink) => {
        // 현재 스크린의 버튼 클릭 시 routing 되지 않도록 함.
        if (link.screen.name === currentRootScreen) return;

        navigation.reset({
            index: 0,
            routes: [link.screen],
        });
    };

    useEffect(() => {
        setCurrentRootScreen(navigation.getState().routes[0].name);
    }, [navigation.getState().routes]);

    return (
        <View style={styles.container}>
            {rootLinks.map((link, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    style={styles.wrapper}
                    onPress={() => handleLinkPress(link)}>
                    <View style={styles.iconBox}>
                        <Icon
                            name={link.icon}
                            size={styles.icon.width}
                            color={
                                currentRootScreen === link.screen.name ? styles.selected.color : styles.unselected.color
                            }
                        />
                    </View>
                    <View style={styles.captionBox}>
                        <Text
                            style={[
                                styles.caption,
                                {
                                    color:
                                        currentRootScreen === link.screen.name
                                            ? styles.selected.color
                                            : styles.unselected.color,
                                },
                            ]}>
                            {link.caption}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}
