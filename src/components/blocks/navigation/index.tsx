import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { LayoutAnimation, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import useAppTheme from "../../../hooks/themes/hooks";
import Icon from "../../atoms/icon";
import { RouterParams } from "../../router/types";
import useNavigationViewStyles from "./styles";
import NavigationViewProps, { HeaderOptions } from "./types";

export default function NavigationView({ headerOptions, bottomNavOptions, children }: NavigationViewProps) {
    const styles = useNavigationViewStyles();
    const theme = useAppTheme();
    const navigation = useNavigation<RouterParams["navigation"]>();
    const [backBtnColor, setBackBtnColor] = useState<string>(theme.colors.colorFamily.black);

    const headerShown: boolean = headerOptions?.shown ?? true;
    const bottomNavShown: boolean = bottomNavOptions?.shown ?? true;

    // Navigation child에 props를 넣어주기 위함
    let navComponentProps = headerOptions.navComponentProps;
    navComponentProps = navComponentProps !== undefined ? navComponentProps : {};

    const handleBackBtnPress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setBackBtnColor(
            backBtnColor === theme.colors.colorFamily.black
                ? theme.colors.colorFamily.black
                : theme.colors.colorFamily.grey
        );

        navigation.pop();
    };

    return (
        <SafeAreaView style={styles.toplevelBox}>
            {headerShown && (
                <View style={styles.headerBox}>
                    <View style={styles.headerNavBox}>
                        {navigation.getState().index > 0 && (
                            <TouchableOpacity style={styles.headerNavIconBox} onPress={handleBackBtnPress}>
                                <Icon name="arrow-left" size={80} color={backBtnColor} />
                            </TouchableOpacity>
                        )}
                        <View style={styles.headerNavTitleBox}>
                            <Text style={styles.headerTitle}>{headerOptions.title}</Text>
                        </View>
                    </View>
                    <View style={styles.headerReactFuncBox}>
                        {headerOptions.navComponent && <headerOptions.navComponent {...navComponentProps} />}
                    </View>
                </View>
            )}
            <View style={styles.contentsBox} children={children} />
            {bottomNavShown && <View style={styles.bottomNavBox}></View>}
        </SafeAreaView>
    );
}
