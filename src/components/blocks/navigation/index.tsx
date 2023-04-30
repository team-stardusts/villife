import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import useScreenMessage from "../../../hooks/multilingual/hooks";
import Icon from "../../atoms/icon";
import { RouterParams, VillifeStackParamList } from "../../router/types";
import useNavigationViewStyles from "./styles";
import NavigationViewProps, { BottomLink } from "./types";
import useStyler from "../../../hooks/styler/hooks";

export default function NavigationView({ headerOptions, bottomNavOptions, children }: NavigationViewProps) {
    const { deviceUI, theme } = useStyler();
    const message = useScreenMessage();
    const styles = useNavigationViewStyles();
    const navigation = useNavigation<RouterParams["navigation"]>();

    const [currentRootScreen, setCurrentRootPage] = useState<keyof VillifeStackParamList>("home");
    const [backBtnColor, setBackBtnColor] = useState<string>(theme.colorFamily.black);
    const [menuBtnHighlight, setMenuBtnHighlight] = useState<boolean>(false);

    const headerShown: boolean = headerOptions?.shown ?? true;
    const bottomNavShown: boolean = bottomNavOptions?.shown ?? true;
    const statusBarContent = theme.scheme === "light" ? "dark-content" : "light-content";

    // Navigation child에 props를 넣어주기 위함
    let navComponentProps = headerOptions.navComponentProps;
    navComponentProps = navComponentProps !== undefined ? navComponentProps : {};

    const handleBackBtnPress = () => {
        //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setBackBtnColor(theme.colorFamily.black);

        navigation.pop();
    };

    const handleMenuPress = (params: BottomLink["screen"]) => {
        //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setMenuBtnHighlight(!menuBtnHighlight);

        navigation.reset({
            index: 0,
            routes: [params],
        });
    };

    useEffect(() => {
        setCurrentRootPage(navigation.getState().routes[0].name);
    }, []);

    useFocusEffect(
        useCallback(() => {
            // 현재 스크린이 루트 스크린일 시 Alert 생성
            // [TO-DO] Alert 컴포넌트와 메세지 변경 필요
            const onBackPress = () => {
                const routes = navigation.getState().routes;

                // 현재 스크린이 루트 스크린일 시
                if (routes.length === 1) {
                    Alert.alert(message.messages.navigation.say_wait, message.messages.navigation.ask_shutdown, [
                        { text: message.messages.words.okay, onPress: () => BackHandler.exitApp() },
                        {
                            text: message.messages.words.cancle,
                            onPress: () => null,
                        },
                    ]);
                    return true;
                }
            };

            const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

            return () => subscription.remove();
        }, [])
    );

    const bottomLinks: BottomLink[] = [
        {
            icon: "home",
            caption: message.messages.main.home.screen_title,
            screen: {
                name: "home",
                params: {},
            },
        },
        {
            icon: "car",
            caption: message.messages.main.parking.screen_title,
            screen: {
                name: "parking",
                params: {},
            },
        },
        {
            icon: "wallet",
            caption: message.messages.main.payment.screen_title,
            screen: {
                name: "payment",
                params: {},
            },
        },
        {
            icon: "messenger",
            caption: message.messages.main.complaint.screen_title,
            screen: {
                name: "complaint",
                params: {},
            },
        },
        {
            icon: "person",
            caption: message.messages.main.mypage.screen_title,
            screen: {
                name: "mypage",
                params: {},
            },
        },
    ];

    return (
        <SafeAreaView style={styles.toplevelBox}>
            <StatusBar barStyle={statusBarContent} backgroundColor={theme.colorFamily.white} />
            {headerShown && (
                <View style={styles.headerBox}>
                    <View style={styles.headerNavBox}>
                        {navigation.getState().index > 0 && (
                            <TouchableOpacity style={styles.headerNavIconBox} onPress={() => handleBackBtnPress()}>
                                <Icon name="arrow-left" size={deviceUI.moderateScale(65)} color={backBtnColor} />
                            </TouchableOpacity>
                        )}
                        <View style={styles.headerNavTitleBox}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                minimumFontScale={0.2}
                                maxFontSizeMultiplier={1}
                                adjustsFontSizeToFit={true}
                                style={styles.headerTitle}>
                                {headerOptions.title}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.headerCenterReactFuncBox}>
                        <Text numberOfLines={2} ellipsizeMode="tail">
                            Admin, Building selector's space
                        </Text>
                    </View>
                    <View style={styles.headerRightReactFuncBox}>
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
                            activeOpacity={1}
                            style={styles.bottomNavWrapper}
                            onPress={() => {
                                handleMenuPress({ name: obj.screen.name, params: obj.screen.params });
                            }}>
                            <View style={styles.bottomNavIconBox}>
                                <Icon
                                    name={obj.icon}
                                    size={deviceUI.moderateScale(50)}
                                    color={
                                        currentRootScreen === obj.screen.name
                                            ? theme.colorFamily.black
                                            : theme.colorFamily.lightgrey
                                    }
                                />
                            </View>
                            <View style={styles.bottomNavCaptionBox}>
                                <Text
                                    style={[
                                        styles.bottomNavCaption,
                                        {
                                            color:
                                                currentRootScreen === obj.screen.name
                                                    ? theme.colorFamily.black
                                                    : theme.colorFamily.lightgrey,
                                        },
                                    ]}>
                                    {obj.caption}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </SafeAreaView>
    );
}
