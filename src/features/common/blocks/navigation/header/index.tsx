import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RouterParams } from "../../../router/types";
import Icon from "../../../atoms/icon";
import useNavigationViewHeaderStyles from "./styles";
import { NavigationViewHeaderProps } from "./types";
import BuildingSelector from "./building_selector";

export default function NavigationViewHeader(props: NavigationViewHeaderProps) {
    const [crrNavIndex, setCrrNavIndex] = useState<number>(0);
    const navigation = useNavigation<RouterParams["navigation"]>();
    const styles = useNavigationViewHeaderStyles(crrNavIndex);
    const backgroundColor = props.backgroundColor ?? styles.container.backgroundColor;

    useEffect(() => {
        setCrrNavIndex(navigation.getState().index);
    }, [navigation]);

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <View style={styles.box}>
                {crrNavIndex > 0 && (
                    <TouchableOpacity style={styles.iconBox} onPress={() => navigation.pop(1)}>
                        <Icon name="arrow-left" size={styles.icon.width} color={styles.icon.color} />
                    </TouchableOpacity>
                )}
                <View style={styles.titleBox}>
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
                <BuildingSelector />
            </View>
            <View style={styles.rightReactFuncBox}>
                {props.navComponent !== undefined && <props.navComponent {...props.navComponentProps} />}
            </View>
        </View>
    );
}
