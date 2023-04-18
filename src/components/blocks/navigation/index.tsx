import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Alert, BackHandler, LayoutAnimation, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import useScreenMessage from "../../../hooks/multilingual/hooks";
import useAppTheme from "../../../hooks/themes/hooks";
import Icon from "../../atoms/icon";
import { RouterParams, StackParamList } from "../../router/types";
import useNavigationViewStyles from "./styles";
import NavigationViewProps, { BottomLink } from "./types";

export default function NavigationView({ headerOptions, bottomNavOptions, children }: NavigationViewProps) {
    const theme = useAppTheme();
    const message = useScreenMessage();
    const styles = useNavigationViewStyles();
    const navigation = useNavigation<RouterParams["navigation"]>();

    const [currentRootScreen, setCurrentRootPage] = useState<keyof StackParamList>("home");
    const [backBtnColor, setBackBtnColor] = useState<string>(theme.colors.colorFamily.black);
    const [menuBtnHighlight, setMenuBtnHighlight] = useState<boolean>(false);

    const headerShown: boolean = headerOptions?.shown ?? true;
    const bottomNavShown: boolean = bottomNavOptions?.shown ?? true;

    // Navigation child에 props를 넣어주기 위함
    let navComponentProps = headerOptions.navComponentProps;
    navComponentProps = navComponentProps !== undefined ? navComponentProps : {};

    const handleBackBtnPress = () => {
        //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setBackBtnColor(theme.colors.colorFamily.black);

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
                    Alert.alert("잠시만요!", "앱을 종료하시겠습니까?", [
                        {
                            text: "취소",
                            onPress: () => null,
                        },
                        { text: "확인", onPress: () => BackHandler.exitApp() },
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
            caption: message.messages.main.complaints.screen_title,
            screen: {
                name: "noti_home",
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
            {headerShown && (
                <View style={styles.headerBox}>
                    <View style={styles.headerNavBox}>
                        {navigation.getState().index > 0 && (
                            <TouchableOpacity style={styles.headerNavIconBox} onPress={() => handleBackBtnPress()}>
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
                            activeOpacity={1}
                            style={styles.bottomNavWrapper}
                            onPress={() => {
                                handleMenuPress({ name: obj.screen.name, params: obj.screen.params });
                            }}>
                            <View style={styles.bottomNavIconBox}>
                                <Icon
                                    name={obj.icon}
                                    size={50}
                                    color={
                                        currentRootScreen === obj.screen.name
                                            ? theme.colors.colorFamily.black
                                            : theme.colors.colorFamily.lightgrey
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
                                                    ? theme.colors.colorFamily.black
                                                    : theme.colors.colorFamily.lightgrey,
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
