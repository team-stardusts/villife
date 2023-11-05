import { SafeAreaView } from "react-native-safe-area-context";
import VerifyAuthCodeScreenProps from "./types";
import ScreenTitleView from "../../../common/blocks/title_view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useVerifyAuthCodeScreenStyles from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import VillifeToastMessage from "../../../common/atoms/toast";
import { Loginable, Verifiable } from "../../../../libs/rest_apis/villife/auth/types";
import VillifeServer from "../../../../libs/rest_apis/villife";
import ReusableTextInput from "../../../common/blocks/text_input";

export default function VerifyAuthCodeScreen({ navigation, route }: VerifyAuthCodeScreenProps) {
    const styles = useVerifyAuthCodeScreenStyles();
    const api: Verifiable & Loginable = VillifeServer.getAuthenticator();
    const TIME_LIMIT = 180;
    const [authcode, setAuthcode] = useState<string | null>(null);
    const [timer, setTimer] = useState<number | null>(null);

    useEffect(() => {
        sendAuthcode();
    }, []);

    useEffect(() => {
        setTimerTime();
    }, [timer]);

    const sendAuthcode = () => {
        api.sendVerifyCode({
            phone_number: route.params.phoneNumber.replace(/-/g, ""),
        })
            .then(() => {
                setTimer(0);
            })
            .catch(() => {
                VillifeToastMessage.showBottomToast("error", "인증코드 전송에 실패했어요.");
                api.logout();
            });
    };

    const setTimerTime = async () => {
        if (timer === TIME_LIMIT) {
            setTimer(null);

            VillifeToastMessage.showBottomToast("info", "인증 시간이 만료되었습니다. 다시 로그인 해주세요.");

            api.logout();

            return;
        }

        if (timer === null) {
            return;
        }

        setTimeout(() => {
            setTimer(timer + 1);
        }, 1000);
    };

    const keep2Digit = (num: number) => {
        if (num < 10) {
            return "0" + num.toString();
        }

        return num.toString();
    };

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
                        <View style={styles.input.row}>
                            <View style={styles.input.inputWrapper}>
                                <ReusableTextInput
                                    type="6digit-authcode"
                                    onInputValidValue={(value) => setAuthcode(value)}
                                    onInputInvalidValue={() => {
                                        VillifeToastMessage.showBottomToast("error", "숫자만 입력해주세요.");
                                        setAuthcode(null);
                                    }}
                                />
                            </View>
                            <View style={[styles.input.timerWrapper, styles.input.row]}>
                                {timer !== null && (
                                    <>
                                        <Text style={styles.input.timerTxt}>{keep2Digit(Math.floor(timer / 60))}</Text>
                                        <Text style={styles.input.timerTxt}>:</Text>
                                        <Text style={styles.input.timerTxt}>{keep2Digit(timer % 60)}</Text>
                                    </>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={styles.main.resendMessageWrapper}>
                        <Text style={styles.main.resend}>인증번호가 오지 않는다면?</Text>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => sendAuthcode()}>
                            <Text style={[styles.main.resend, styles.main.resendUnderline]}>재발송</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </ScreenTitleView>
        </SafeAreaView>
    );
}
