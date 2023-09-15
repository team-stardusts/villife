import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VillifeRouterParams } from "../../../router/types";
import Icon from "../../../atoms/icon";
import useNavigationViewHeaderStyles from "./styles";
import { NavigationViewHeaderProps } from "./types";
import BuildingSelector from "./building_selector";

export default function NavigationViewHeader(props: NavigationViewHeaderProps) {
    const [crrNavIndex, setCrrNavIndex] = useState<number>(0);
    const navigation = useNavigation<VillifeRouterParams["navigation"]>();
    const styles = useNavigationViewHeaderStyles(crrNavIndex);
    const backgroundColor = props?.style?.backgroundColor ?? styles.container.backgroundColor;
    const borderBottomColor = props?.style?.borderBottomColor ?? styles.container.borderBottomColor;

    useEffect(() => {
        setCrrNavIndex(navigation.getState().index);
    }, [navigation]);

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor, borderBottomColor: borderBottomColor }]}>
            <View style={styles.box}>
                <TouchableOpacity style={styles.wrapper} disabled={crrNavIndex === 0} onPress={() => navigation.pop(1)}>
                    {crrNavIndex > 0 && (
                        <View style={styles.iconBox}>
                            <Icon name="arrow-left" size={styles.icon.width} color={styles.icon.color} />
                        </View>
                    )}
                    <View style={styles.titleBox}>
                        <Text
                            style={styles.title}
                            numberOfLines={1}
                            minimumFontScale={0.2}
                            ellipsizeMode="tail"
                            //maxFontSizeMultiplier={1}
                            adjustsFontSizeToFit>
                            {props.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.centerReactFuncBox}>{!props.hideBuidingSelector && <BuildingSelector />}</View>
            <View style={styles.rightReactFuncBox}>
                {props.navComponent !== undefined && <props.navComponent {...props.navComponentProps} />}
            </View>
        </View>
    );
}
