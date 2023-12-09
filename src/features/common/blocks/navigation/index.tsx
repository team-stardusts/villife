import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Alert, BackHandler, SafeAreaView, StatusBar, View } from "react-native";
import useScreenMessage from "../../hooks/multilingual/hooks";
import useNavigationViewStyles from "./styles";
import NavigationViewProps from "./types";
import useStyler from "../../hooks/styler/hooks";
import { VillifeRouterParams } from "../../router/types";
import NavigationViewHeader from "./header";
import NavigationViewBottom from "./bottom";
import NetInfoEventHandler from "../../../../libs/netinfo";
import { IEventListenable } from "../../global_interface";
import { NetInfoEvents } from "../../../../libs/netinfo/types";
import { NetInfoState } from "@react-native-community/netinfo";
import VillifeSpinner from "../../atoms/spinner/villife";
import { useRecoilValue } from "recoil";
import { isConnetedToNetworkState } from "../../hooks/states/atoms/network";

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
    const navigation = useNavigation<VillifeRouterParams["navigation"]>();
    const netinfo: IEventListenable<NetInfoEvents, NetInfoState> = new NetInfoEventHandler();
    const isConnectedToNetwork = useRecoilValue<boolean>(isConnetedToNetworkState);
    //navigation.reset(navigation.getState())

    const headerBackGroundColor = headerOptions?.style?.backgroundColor ?? styles.container.backgroundColor;
    const bodyBackGroundColor = bodyOptions.backgroundColor ?? styles.container.backgroundColor;
    const headerShown: boolean = headerOptions.shown ?? true;
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
        <>
            <SafeAreaView style={[styles.container, { backgroundColor: headerBackGroundColor }]}>
                <StatusBar barStyle={statusBarContent} backgroundColor={headerBackGroundColor} />
                {headerShown && (
                    <View style={styles.HeaderConatiner}>
                        <NavigationViewHeader {...headerOptions} />
                    </View>
                )}
                <View style={[styles.bodyContainer, { backgroundColor: bodyBackGroundColor }]}>{children}</View>
                {bottomNavShown && (
                    <View style={styles.bottomContainer}>
                        <NavigationViewBottom />
                    </View>
                )}
            </SafeAreaView>
            {!isConnectedToNetwork && (
                <View
                    style={[
                        styles.disconnectionBox,
                        {
                            backgroundColor: "rgba(255,255,255,0.5)",
                        },
                    ]}>
                    <VillifeSpinner />
                </View>
            )}
        </>
    );
}
