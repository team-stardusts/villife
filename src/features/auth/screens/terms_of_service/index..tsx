import { useEffect, useState } from "react";
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, Linking, LayoutAnimation } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import ScreenTitleView from "../../../common/blocks/title_view";
import useTermsOfServiceScreenStyles from "./styles";
import TermsOfServiceScreenProps from "./types";
import AuthScreenSwitchButton from "../../blocks/switch_button";
import PressableVectorIcon from "../../../common/blocks/icon/vector";
import useSystemInfo from "../../../common/hooks/systeminfo/hooks";

export default function TermsOfServiceScreen({ navigation, route }: TermsOfServiceScreenProps) {
    const iconDiameter: number = useSystemInfo().window.width * 0.065;
    const messages = useScreenMessage();
    const Styles = useTermsOfServiceScreenStyles();

    const [isAllGranted, setIsAllGranted] = useState(false);
    const [isPrivacyGranted, setIsPrivacyGranted] = useState(false);
    const [isServiceGranted, setIsServiceGranted] = useState(false);

    useEffect(() => {
        if (isAllGranted) {
            setIsPrivacyGranted(true);
            setIsServiceGranted(true);
            return;
        }
        if (!isPrivacyGranted || !isServiceGranted) return;
        setIsPrivacyGranted(false);
        setIsServiceGranted(false);
    }, [isAllGranted]);

    useEffect(() => {
        if (isPrivacyGranted && isServiceGranted) {
            setIsAllGranted(true);
        }
        if (isAllGranted) {
            !isPrivacyGranted || !isServiceGranted ? setIsAllGranted(false) : () => {};
        }
    }, [isPrivacyGranted, isServiceGranted]);

    return (
        <SafeAreaView style={Styles.main.container}>
            <ScreenTitleView
                titles={[messages.messages.auth.terms_of_service.title]}
                subtitles={[messages.messages.auth.terms_of_service.subtitle]}
                bottomButton={{
                    title: messages.messages.auth.create_account.next_btn_title,
                    onPress: () => {
                        console.log("회원가입 클릭");
                        navigation.navigate("create_account", {
                            host: "villife",
                            access_token: undefined,
                        });
                    },
                    disabled: !isAllGranted,
                }}>
                <ScrollView style={Styles.input.container}>
                    <View style={Styles.input.barSort}>
                        <View style={Styles.input.lefrBox}>
                            <AuthScreenSwitchButton
                                onPress={() => {
                                    LayoutAnimation.configureNext({
                                        duration: 50,
                                        update: {
                                            type: LayoutAnimation.Types.linear,
                                        },
                                    });
                                    setIsAllGranted(!isAllGranted);
                                }}
                                disabled={isAllGranted}
                            />
                            <Text style={Styles.input.descriptionMessage}>
                                {messages.messages.auth.terms_of_service.terms_of_service_all}
                            </Text>
                        </View>
                    </View>
                    <View style={Styles.input.horizontalLine} />
                    <View style={Styles.input.barSort}>
                        <View style={Styles.input.lefrBox}>
                            <AuthScreenSwitchButton
                                onPress={() => {
                                    LayoutAnimation.configureNext({
                                        duration: 50,
                                        update: {
                                            type: LayoutAnimation.Types.linear,
                                        },
                                    });
                                    setIsPrivacyGranted(!isPrivacyGranted);
                                }}
                                disabled={isPrivacyGranted}
                            />
                            <Text style={Styles.input.descriptionMessage}>
                                {messages.messages.auth.terms_of_service.terms_of_service_Privacy}
                            </Text>
                        </View>
                        <PressableVectorIcon
                            providerName="right"
                            diameter={iconDiameter}
                            onPress={() =>
                                navigation.navigate("mypage_webview", {
                                    title: "서비스 이용 약관",
                                    url: "https://villife.notion.site/d60bebc9a0c5400883375d8257ad4bfc",
                                })
                            }
                        />
                    </View>
                    <View style={Styles.input.barSort}>
                        <View style={Styles.input.lefrBox}>
                            <AuthScreenSwitchButton
                                onPress={() => {
                                    LayoutAnimation.configureNext({
                                        duration: 50,
                                        update: {
                                            type: LayoutAnimation.Types.linear,
                                        },
                                    });
                                    setIsServiceGranted(!isServiceGranted);
                                }}
                                disabled={isServiceGranted}
                            />
                            <Text style={Styles.input.descriptionMessage}>
                                {messages.messages.auth.terms_of_service.terms_of_service_service}
                            </Text>
                        </View>
                        <PressableVectorIcon
                            providerName="right"
                            diameter={iconDiameter}
                            onPress={() =>
                                navigation.navigate("mypage_webview", {
                                    title: "개인정보 처리 방침",
                                    url: "https://villife.notion.site/4aa060ac489b44e7b8bdfaae6b4cab54",
                                })
                            }
                        />
                    </View>
                </ScrollView>
            </ScreenTitleView>
        </SafeAreaView>
    );
}
