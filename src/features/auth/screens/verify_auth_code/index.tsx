import { SafeAreaView } from "react-native-safe-area-context";
import VerifyAuthCodeScreenProps from "./types";
import ScreenTitleView from "../../../common/blocks/title_view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useVerifyAuthCodeScreenStyles from "./styles";
import { Text, View } from "react-native";
import UniversalTextInput from "../../../common/blocks/universial/textinput";
import { useEffect, useState } from "react";
import StringValidator from "../../../../libs/string_validator";
import VillifeToastMessage from "../../../common/atoms/toast";
import { Verifiable } from "../../../../libs/rest_apis/villife/auth/types";
import VillifeServer from "../../../../libs/rest_apis/villife";

export default function VerifyAuthCodeScreen({ navigation, route }: VerifyAuthCodeScreenProps) {
    const styles = useVerifyAuthCodeScreenStyles();
    const validator = new StringValidator();
    const [authcode, setAuthcode] = useState<string | null>(null);
    const api: Verifiable = VillifeServer.getAuthenticator();

    useEffect(() => {
        api.sendVerifyCode({
            phone_number: route.params.phoneNumber.replace(/-/g, ""),
        })
            .then()
            .catch(() => {
                VillifeToastMessage.showBottomToast("error", "인증코드 전송에 실패했습니다.");
            });
    }, []);

    const verify = async () => {
        const result = await api.verifyPersonalInfo({
            birth_year: route.params.identityNumberFrontDigit.slice(0, 2),
            birth_day: route.params.identityNumberFrontDigit.slice(2),
            code: authcode as string,
            phone_number: route.params.phoneNumber.replace(/-/g, ""),
            user_name: route.params.userName,
        });

        console.log(result.data?.data, result.data?.status);
    };

    return (
        <SafeAreaView style={styles.main.container}>
            <ScreenTitleView
                titles={["휴대폰 인증"]}
                subtitles={["인증번호를 정확하게 입력해주세요."]}
                bottomButton={{
                    title: "다음",
                    onPress: () => {
                        verify();
                    },
                    disabled: authcode === null || authcode?.length < 6,
                }}>
                <KeyboardAwareScrollView
                    style={styles.main.contents}
                    showsVerticalScrollIndicator={false} /* behavior="padding" */
                >
                    <View style={styles.input.container}>
                        <View style={styles.input.titleWrapper}>
                            <Text style={styles.input.title} adjustsFontSizeToFit numberOfLines={1}>
                                인증번호
                            </Text>
                        </View>
                        <View style={styles.input.inputWrapper}>
                            <UniversalTextInput
                                value={authcode ?? ""}
                                placeholder="인증번호 6자리를 입력해주세요."
                                onChangeText={(text) => {
                                    if (text === "") {
                                        setAuthcode(null);
                                    }

                                    if (!validator.isNumber(text)) {
                                        VillifeToastMessage.showBottomToast("error", "숫자만 입력해주세요.");

                                        return;
                                    }

                                    if (text.length > 6) {
                                        return;
                                    }

                                    setAuthcode(text);
                                }}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ScreenTitleView>
        </SafeAreaView>
    );
}
