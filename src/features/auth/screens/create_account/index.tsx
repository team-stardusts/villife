import { useEffect, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import useCreateAccountScreenStyles from "./styles";
import ScreenTitleView from "../../../common/blocks/title_view";
import CreateAccountScreenProps, { AccountType } from "./types";
import AuthScreenCommonInput from "../../blocks/input";
import UserTypeSelectionButton from "../../blocks/icon_user_type";
import useAuthService from "../../services/authentication";
import { VILLIFE_AUTHORITY } from "../../../../libs/rest_apis/villife/absc";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IAuthServiceProvider } from "../../services/authentication/types";

export default function CreateAccountScreen({ navigation, route }: CreateAccountScreenProps) {
    //const { host, access_token } = route.params;
    const { host, access_token } = route.params;
    //const host: HostType = "villife";
    const auth: IAuthServiceProvider = useAuthService();
    const messages = useScreenMessage();
    const styles = useCreateAccountScreenStyles(host);

    const [account, setAccount] = useState<AccountType>({
        authority: null, //VILLIFE_AUTHORITY.RENTER,
        id: null,
        password: null,
        confirm_password: null,
    });

    const [isDone, setIsDone] = useState<boolean>(false);

    const handleJoin = async () => {
        const { authority, id, password, confirm_password } = account;

        if (authority === null) return;

        if (host === "villife" && id === null && password === null && confirm_password === null) {
            return;
        }

        if (host === "apple") {
            navigation.navigate("verify_personal_info", { authority: authority });
            return;
        }

        // TODO: 각 요소에 문제가 있을 때 알림 필요
        const result = await auth.join(host, {
            id: id || "",
            password: password || "",
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
            routes: [{ name: "welcome", params: { host, authority, id, password } }],
        });
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
            setIsDone(
                account.authority !== null &&
                    account.id !== null &&
                    account.password !== null &&
                    account.confirm_password !== null
            );

            return;
        }

        setIsDone(account.authority !== null);
    }, [account]);

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
                                selected={account.authority === VILLIFE_AUTHORITY.RENTER}
                                onPress={() => {
                                    setAccount({
                                        ...account,
                                        authority: VILLIFE_AUTHORITY.RENTER,
                                    });
                                }}
                            />
                            <UserTypeSelectionButton
                                userType={VILLIFE_AUTHORITY.ADMIN}
                                caption={messages.messages.words.admin}
                                size={styles.userTypeIcon.wrapper.height * 0.65}
                                selected={account.authority === VILLIFE_AUTHORITY.ADMIN}
                                onPress={() => {
                                    setAccount({
                                        ...account,
                                        authority: VILLIFE_AUTHORITY.ADMIN,
                                    });
                                }}
                            />
                        </View>
                    </View>
                    {host === "villife" && route.params.access_token !== undefined ? (
                        <View style={styles.input.container}>
                            <View style={styles.input.inputBox}>
                                <AuthScreenCommonInput
                                    name="id"
                                    title={messages.messages.auth.create_account.name_input_title}
                                    placeholder={messages.messages.auth.create_account.name_input_placeholder}
                                    inspect={{
                                        hasEnglishOnlySmallCase: true,
                                        hasNumber: true,
                                        tokens4to10: true,
                                    }}
                                    onInputText={(text: string, isValid: boolean) =>
                                        setAccount({ ...account, id: isValid ? text : null })
                                    }
                                />
                            </View>
                            <View style={styles.input.inputBox}>
                                <AuthScreenCommonInput
                                    name="password"
                                    title={messages.messages.auth.create_account.password_input_title}
                                    placeholder={messages.messages.auth.create_account.password_input_placeholder}
                                    inspect={{
                                        hasEnglish: true,
                                        hasNumber: true,
                                        hasSpecialChar: true,
                                        tokens8to20: true,
                                    }}
                                    onInputText={(text: string, isValid: boolean) =>
                                        setAccount({ ...account, password: isValid ? text : null })
                                    }
                                    secureTextEntry
                                />
                            </View>
                            <View style={styles.input.inputBox}>
                                <AuthScreenCommonInput
                                    name="confirm_password"
                                    title={messages.messages.auth.create_account.confirm_password_input_title}
                                    highlightColor={
                                        account.password === null || account.password === account.confirm_password
                                            ? undefined
                                            : "red"
                                    }
                                    lowlightColor={
                                        account.password === null || account.password === account.confirm_password
                                            ? undefined
                                            : "red"
                                    }
                                    placeholder={
                                        messages.messages.auth.create_account.confirm_password_input_placeholder
                                    }
                                    inspect={{
                                        matching: account.password,
                                    }}
                                    onInputText={(text: string, isValid: boolean) =>
                                        setAccount({ ...account, confirm_password: isValid ? text : null })
                                    }
                                    secureTextEntry
                                />
                            </View>
                            {/* <View style={styles.input.inputBox}>
                                <AuthScreenCommonInput
                                    title={messages.messages.auth.join.title_of_select_carrier_input}
                                />
                                <View style={styles.input.btnBox}>
                                    <UniversialButton
                                        title={messages.messages.auth.join.title_of_send_btn}
                                        //titleStyle={styles.InputsSection.btnTitle}
                                        onPress={() => {}}
                                        disabled={false}
                                    />
                                </View>
                            </View> */}
                        </View>
                    ) : (
                        <></>
                    )}
                </KeyboardAwareScrollView>
            </ScreenTitleView>
        </SafeAreaView>
    );
}

/*
        <View>
            <UniversalButton
                title="NaverJoinTest" 
                titleStyle={{fontSize: 20}}
                onPress={() => handleJoin()}
                />
        </View>
*/
