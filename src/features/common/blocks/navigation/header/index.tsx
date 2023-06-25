import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { RouterParams } from "../../../router/types";
import Icon from "../../../atoms/icon";
import { useEffect, useState } from "react";
import useNavigationViewHeaderStyles from "./styles";
import { NavigationViewHeaderProps } from "./types";
import { useRecoilState } from "recoil";
import useUserInfoService from "../../../hooks/service/user_info";
import { VILLIFE_AUTHORITY } from "../../../../../libs/rest_apis/villife/absc";

export default function NavigationViewHeader(props: NavigationViewHeaderProps) {
    const [crrNavIndex, setCrrNavIndex] = useState<number>(0);
    const navigation = useNavigation<RouterParams["navigation"]>();
    const styles = useNavigationViewHeaderStyles(crrNavIndex);
    const userService = useUserInfoService();

    const isAdmin = () => {
        if (userService.basicInfo?.authority === undefined) return false;

        return (
            userService.basicInfo.authority === VILLIFE_AUTHORITY.ADMIN ||
            userService.basicInfo.authority === VILLIFE_AUTHORITY.OWNER
        );
    };

    useEffect(() => {
        setCrrNavIndex(navigation.getState().index);
    }, [navigation.getState().index]);

    return (
        <View style={styles.container}>
            <View style={styles.navBox}>
                {navigation.getState().index > 0 && (
                    <TouchableOpacity style={styles.navIconBox} onPress={() => navigation.pop()}>
                        <Icon name="arrow-left" size={styles.navIcon.width} color={styles.navIcon.color} />
                    </TouchableOpacity>
                )}
                <View style={styles.navTitleBox}>
                    <Text
                        style={styles.title}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        minimumFontScale={0.2}
                        maxFontSizeMultiplier={1}
                        adjustsFontSizeToFit={true}>
                        {props.title}
                    </Text>
                </View>
            </View>
            <View style={styles.centerReactFuncBox}>
                {isAdmin() && (
                    <Text numberOfLines={2} ellipsizeMode="tail">
                        Admin, Building selector's space
                    </Text>
                )}
            </View>
            <View style={styles.rightReactFuncBox}>
                {props.navComponent !== undefined && <props.navComponent {...props.navComponentProps} />}
            </View>
        </View>
    );
}
