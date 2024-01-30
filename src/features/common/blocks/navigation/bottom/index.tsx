import { Animated, Text, TouchableOpacity, View } from "react-native";
import useNavigationViewBottomStyles from "./styles";
import Icon from "../../../atoms/icon";
import { useEffect, useMemo, useRef } from "react";
import useRootLinks from "../root_links";
import { useNavigation } from "@react-navigation/native";
import { VillifeRouterParams } from "../../../router/types";
import { RootLink } from "../types";
import useUserInformation from "../../../hooks/service/user_info";
import { ANIMATION_DURATION_FAST_LV3 } from "../../../constants";

export default function NavigationViewBottom() {
    const navigation = useNavigation<VillifeRouterParams["navigation"]>();
    const styles = useNavigationViewBottomStyles();
    const rootLinks = useRootLinks();
    const user = useUserInformation();
    const translateYValue = useRef(new Animated.Value(30)).current;

    const currentRootScreen = useMemo(() => {
        return navigation.getState().routes[0].name;
    }, [navigation.getState().routes]);

    const activatedNavs = useMemo<Array<RootLink["screen"]["name"]> | null>(() => {
        if (!user?.isAdmin) return null;

        const managedBuilding = user.adminInfomation?.managedBuildings;

        if (managedBuilding === undefined || managedBuilding.length === 0) {
            return ["home", "my_page"];
        }

        return null;
    }, [user?.adminInfomation?.managedBuildings]);

    const handleLinkPress = (link: RootLink) => {
        // 현재 스크린의 버튼 클릭 시 routing 되지 않도록 함.
        if (link.screen.name === currentRootScreen) return;

        navigation.reset({
            index: 0,
            routes: [link.screen],
        });
    };

    useEffect(() => {
        Animated.timing(translateYValue, {
            toValue: 0,
            duration: ANIMATION_DURATION_FAST_LV3,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        if (!navigation.getState()) return;
        const linkNames = rootLinks.map((link) => link.screen.name);
        const routes = navigation.getState().routes;
        let rootlinkCnt = 0;

        routes.forEach((route) => {
            if (linkNames.findIndex((link) => link === route.name) != -1) {
                rootlinkCnt += 1;
            }
        });

        if (rootlinkCnt >= 2) {
            navigation.reset({
                index: 0,
                routes: routes.slice(1).map((route) => {
                    return {
                        name: route.name,
                        params: route.params,
                        path: route.path,
                    };
                }),
            });
        }
    }, [navigation.getState().routes]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.menuBox, { transform: [{ translateY: translateYValue }] }]}>
                {rootLinks.map((link, index) => {
                    if (user?.isAdmin && link.screen.name === "parking") {
                        return;
                    } else if (user?.isRenter && link.screen.name === "lease_contract") {
                        return;
                    }

                    const isActivated =
                        activatedNavs === null ? true : activatedNavs.find((v) => v === link.screen.name) !== undefined;

                    return (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={1}
                            disabled={!isActivated}
                            style={styles.wrapper}
                            onPress={() => handleLinkPress(link)}>
                            {isActivated && (
                                <>
                                    <View style={styles.iconBox}>
                                        <Icon
                                            name={link.icon}
                                            size={styles.icon.width}
                                            color={
                                                currentRootScreen === link.screen.name
                                                    ? styles.selected.color
                                                    : styles.unselected.color
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
                                </>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </Animated.View>
            <View style={styles.dummyView} />
        </View>
    );
}
