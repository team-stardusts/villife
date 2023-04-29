import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, View } from "react-native";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import UniversialButton from "../../../blocks/universial/button";
import useCreateAccountScreenStyles from "./styles";
import AuthScreenTitleView from "../../../blocks/auth_screens/title_view";
import AuthScreenBottonButton from "../../../blocks/auth_screens/bottom_button";
import CreateAccountScreenProps from "./types";
import AuthScreenCommonInput from "../../../blocks/auth_screens/input";
import StringValidator from "../../../../libs/string_validator";
import { useLoginService } from "../../../../hooks/services/hooks";
import UserTypeSelectionButton from "../../../blocks/auth_screens/icon_user_type";
import { Authority } from "../../../../libs/rest_apis/villife/types";
import { VILLIFE_AUTHORITY } from "../../../../libs/rest_apis/villife";
import VillifeStorage from "../../../../libs/storage";
import useStyler from "../../../../hooks/styler/hooks";
import useAuthService from "../../../../hooks/services/login/hooks";

type AccountType = {
    authority: Authority["ADMIN"] | Authority["RENTER"];
    id: string | null;
    password: string | null;
    confirm_password: string | null;
};

export default function CreateAccountScreen({ navigation, route }: CreateAccountScreenProps) {
    const { host, access_token } = route.params;
    const loginManagers = useLoginService();
    const login = useAuthService().login;
    const messages = useScreenMessage();
    const styles = useCreateAccountScreenStyles();
    const { deviceUI } = useStyler();
    const validator = new StringValidator();

    const [account, setAccount] = useState<AccountType>({
        authority: VILLIFE_AUTHORITY.RENTER,
        id: null,
        password: null,
        confirm_password: null,
    });
    const [inputValidation, setInputValidation] = useState({
        id: false,
        password: false,
        confirmPassword: false,
    });
    const [isDone, setIsDone] = useState<boolean>(false);

    const handleJoin = async () => {
        const { authority, id, password } = account;

        if (id && password && access_token) {
            /**
             * TODO ::
             * 1. UI 에서 Authority 추출 후 API Param 에 삽입
             * ※
             */
            // [TO-DO] join 성공 시 로그인, setLoginData
            // Home으로 이동 시 navigation stack 초기화
            const result = await loginManagers[host].join({ id, password, access_token, authority });
            // [TO-DO] login 작업 추가 해야함.
            if (!result.isSuccessful) {
                Alert.alert(result.data?.data);
                return;
            } else {
                console.log("succeeded in sigining up");
                login(host, { id, password });
            }
            navigation.navigate("welcome", { authority, id, password });
        }
    };

    useEffect(() => {
        setIsDone(inputValidation.id && inputValidation.password && inputValidation.confirmPassword);
    }, [inputValidation]);

    return (
        <SafeAreaView style={styles.Screen.topLevelBox}>
            <KeyboardAvoidingView style={styles.Screen.screenWrapper} behavior="padding">
                <AuthScreenTitleView
                    title={messages.messages.auth.create_account.title}
                    subtitles={[messages.messages.auth.create_account.subtitle]}
                />
                <View style={styles.Screen.contentsWrapper}>
                    <View style={styles.UserTypeIconSection.toplevelBox}>
                        <UserTypeSelectionButton
                            userType={VILLIFE_AUTHORITY.RENTER}
                            caption={messages.messages.words.renter}
                            size={deviceUI.verticalScale(80)}
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
                            size={deviceUI.verticalScale(80)}
                            selected={account.authority === VILLIFE_AUTHORITY.ADMIN}
                            onPress={() => {
                                setAccount({
                                    ...account,
                                    authority: VILLIFE_AUTHORITY.ADMIN,
                                });
                            }}
                        />
                    </View>
                    <View style={styles.InputsSection.topLevelBox}>
                        <View style={styles.InputsSection.inputsWrapper}>
                            <AuthScreenCommonInput
                                name="id"
                                title={messages.messages.auth.create_account.name_input_title}
                                onChangeText={(text, name) => {
                                    if (name === "id") setAccount({ ...account, [name]: text });
                                }}
                                placeholder={messages.messages.auth.create_account.name_input_placeholder}
                                inspect={{
                                    hasEnglishOnlySmallCase: true,
                                    hasNumber: true,
                                    tokens4to10: true,
                                }}
                                onValidate={(isValid: boolean) =>
                                    setInputValidation({
                                        ...inputValidation,
                                        id: isValid,
                                    })
                                }
                            />
                            <AuthScreenCommonInput
                                name="password"
                                title={messages.messages.auth.create_account.password_input_title}
                                onChangeText={(text, name) => {
                                    if (name === "password") setAccount({ ...account, [name]: text });
                                }}
                                placeholder={messages.messages.auth.create_account.password_input_placeholder}
                                inspect={{
                                    hasEnglish: true,
                                    hasNumber: true,
                                    hasSpecialChar: true,
                                    tokens8to20: true,
                                }}
                                onValidate={(isValid: boolean) =>
                                    setInputValidation({
                                        ...inputValidation,
                                        password: isValid,
                                    })
                                }
                                secureTextEntry
                            />
                            <AuthScreenCommonInput
                                name="confirm_password"
                                title={messages.messages.auth.create_account.confirm_password_input_title}
                                onChangeText={(text, name) => {
                                    if (name === "confirm_password") setAccount({ ...account, [name]: text });
                                }}
                                highlightColor={account.password === account.confirm_password ? undefined : "red"}
                                lowlightColor={account.password === account.confirm_password ? undefined : "red"}
                                placeholder={messages.messages.auth.create_account.confirm_password_input_placeholder}
                                inspect={{
                                    matching: account.password,
                                }}
                                onValidate={(isValid: boolean) =>
                                    setInputValidation({
                                        ...inputValidation,
                                        confirmPassword: isValid,
                                    })
                                }
                                secureTextEntry
                            />
                            {host === "villife" && route.params.access_token !== undefined ? (
                                <>
                                    <AuthScreenCommonInput
                                        title={messages.messages.auth.join.title_of_select_carrier_input}
                                    />
                                    <View style={styles.InputsSection.btnWrapper}>
                                        <UniversialButton
                                            title={messages.messages.auth.join.title_of_send_btn}
                                            titleStyle={styles.InputsSection.btnTitle}
                                            onPress={() => {}}
                                            disabled={false}
                                        />
                                    </View>
                                </>
                            ) : (
                                <></>
                            )}
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
            <View style={styles.Screen.marginView}></View>
            <AuthScreenBottonButton
                title={messages.messages.auth.create_account.next_btn_title}
                onPress={() => {
                    handleJoin();
                }}
                disabled={!isDone}
            />
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
