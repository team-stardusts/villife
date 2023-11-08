import { useEffect, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import useSetAuthorityScreenStyles from "./styles";
import ScreenTitleView from "../../../common/blocks/title_view";
import SetAuthorityScreenProps from "./types";
import UserTypeSelectionButton from "../../blocks/icon_user_type";
import { VILLIFE_AUTHORITY } from "../../../../libs/rest_apis/villife/absc";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Authority } from "../../../../libs/rest_apis/villife/types";
import { IAuthServiceProvider } from "../../services/authentication/types";
import useAuthService from "../../services/authentication";

export default function SetAuthorityScreen({ navigation, route }: SetAuthorityScreenProps) {
    const { host, access_token } = route.params;
    const messages = useScreenMessage();
    const styles = useSetAuthorityScreenStyles(host);
    const auth: IAuthServiceProvider = useAuthService();
    const [authority, setAuthority] = useState<Authority["RENTER"] | Authority["ADMIN"]>();

    const [isDone, setIsDone] = useState<boolean>(false);

    const handleJoin = async () => {
        if (authority === null || authority === undefined) return;

        if (host == "naver") {
            const result = await auth.join(host, {
                id: "",
                password: "",
                authority: authority,
                accessToken: access_token as string,
            });

            if (!result.isSuccessful) {
                console.error("[CREATE_ACCOUNT]", result.data?.status, result.data?.data);
                Alert.alert("회원가입 오류", "잠시 후 다시 시도해주세요.", [
                    {
                        text: "확인",
                        onPress: () => {
                            navigation.canGoBack() && navigation.goBack();
                        },
                    },
                ]);
                return;
            }
            console.log("[CREATE_ACCOUNT]", "Succeeded in sigining up");

            // Welcome screen으로 이동하며 Stack 초기화
            navigation.reset({
                index: 0,
                routes: [{ name: "welcome", params: { host, authority, id: "", password: "" } }],
            });
        }

        if (host == "villife") {
            navigation.navigate("set_account", { authority: authority });
        }
    };

    useEffect(() => {
        if (host === "naver" && access_token === undefined) {
            Alert.alert("소셜 로그인에 문제가 있습니다.", "다른 소셜 로그인 서비스를 사용해주세요.", [
                {
                    text: "확인",
                    onPress: () => {
                        navigation.canGoBack() && navigation.goBack();
                    },
                },
            ]);
        }
    }, [route.params]);

    useEffect(() => {
        if (host === "villife") {
            setIsDone(authority ? true : false);

            return;
        }

        setIsDone(authority !== null);
    }, [authority]);

    return (
        <SafeAreaView style={styles.main.container}>
            <ScreenTitleView
                titles={[messages.messages.auth.create_account.title]}
                subtitles={[messages.messages.auth.create_account.subtitle]}
                bottomButton={{
                    title: messages.messages.auth.create_account.next_btn_title,
                    onPress: () => {
                        handleJoin();
                    },
                    disabled: !isDone,
                }}>
                <KeyboardAwareScrollView
                    style={styles.main.contents}
                    showsVerticalScrollIndicator={false} /* behavior="padding" */
                >
                    <View style={styles.userTypeIcon.container}>
                        <View style={styles.userTypeIcon.wrapper}>
                            <UserTypeSelectionButton
                                userType={VILLIFE_AUTHORITY.RENTER}
                                caption={messages.messages.words.renter}
                                size={styles.userTypeIcon.wrapper.height * 0.65}
                                selected={authority === VILLIFE_AUTHORITY.RENTER}
                                onPress={() => {
                                    setAuthority(VILLIFE_AUTHORITY.RENTER);
                                }}
                            />
                            <UserTypeSelectionButton
                                userType={VILLIFE_AUTHORITY.ADMIN}
                                caption={messages.messages.words.admin}
                                size={styles.userTypeIcon.wrapper.height * 0.65}
                                selected={authority === VILLIFE_AUTHORITY.ADMIN}
                                onPress={() => {
                                    setAuthority(VILLIFE_AUTHORITY.ADMIN);
                                }}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ScreenTitleView>
        </SafeAreaView>
    );
}
