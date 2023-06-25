import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Alert, BackHandler, SafeAreaView, StatusBar, View } from "react-native";
import useScreenMessage from "../../hooks/multilingual/hooks";
import useNavigationViewStyles from "./styles";
import NavigationViewProps from "./types";
import useStyler from "../../hooks/styler/hooks";
import { RouterParams } from "../../router/types";
import NavigationViewHeader from "./header";
import NavigationViewBottom from "./bottom";

export default function NavigationView({
    headerOptions,
    bodyOptions = {
        applyDefaultHorizontalPadding: true,
        applyDefaultVerticalPadding: true,
    },
    bottomNavOptions,
    children,
}: NavigationViewProps) {
    const { theme } = useStyler();
    const message = useScreenMessage();
    const styles = useNavigationViewStyles(bodyOptions);
    const navigation = useNavigation<RouterParams["navigation"]>();

    const headerShown: boolean = headerOptions?.shown ?? true;
    const bottomNavShown: boolean = bottomNavOptions?.shown ?? true;
    const statusBarContent = theme.scheme === "light" ? "dark-content" : "light-content";

    // Navigation child에 props를 넣어주기 위함
    let navComponentProps = headerOptions.navComponentProps;
    navComponentProps = navComponentProps !== undefined ? navComponentProps : {};

    // Android back button 대비 코드
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

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={statusBarContent} backgroundColor={theme.colorFamily.white} />
            {headerShown && (
                <NavigationViewHeader
                    title={headerOptions.title}
                    navComponent={headerOptions.navComponent}
                    navComponentProps={headerOptions.navComponentProps}
                />
            )}
            <View style={styles.bodyBox} children={children} />
            {bottomNavShown && <NavigationViewBottom />}
        </SafeAreaView>
    );
}
