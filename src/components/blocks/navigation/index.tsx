import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { LayoutAnimation, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import useAppTheme from "../../../hooks/themes/hooks";
import Icon from "../../atoms/icon";
import { IconSeries } from "../../atoms/icon/types";
import { RouterParams, StackParamList } from "../../router/types";
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

    type BottomLink = {
        icon: IconSeries;
        caption: string;
        screen: {
            name: keyof StackParamList;
            params: StackParamList[BottomLink["screen"]["name"]];
        };
    };

    const bottomLinks: BottomLink[] = [
        {
            icon: "home",
            caption: "홈",
            screen: {
                name: "home",
                params: {},
            },
        },
        {
            icon: "car",
            caption: "주차",
            screen: {
                name: "parking",
                params: {},
            },
        },
        {
            icon: "wallet",
            caption: "관리비",
            screen: {
                name: "payment",
                params: {},
            },
        },
        {
            icon: "messenger",
            caption: "민원",
            screen: {
                name: "noti_home",
                params: {},
            },
        },
        {
            icon: "person",
            caption: "마이페이지",
            screen: {
                name: "mypage",
                params: {},
            },
        },
    ];

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
            {bottomNavShown && (
                <View style={styles.bottomNavBox}>
                    {bottomLinks.map((obj, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.bottomNavWrapper}
                            onPress={() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: obj.screen.name, params: obj.screen.params }],
                                });
                            }}>
                            <View style={styles.bottomNavIconBox}>
                                <Icon name={obj.icon} size={50} color={backBtnColor} />
                            </View>
                            <View style={styles.bottomNavCaptionBox}>
                                <Text style={styles.bottomNavCaption}>{obj.caption}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </SafeAreaView>
    );
}
