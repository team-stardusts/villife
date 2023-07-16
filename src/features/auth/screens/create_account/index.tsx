import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, View } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import UniversialButton from "../../../common/blocks/universial/button";
import useCreateAccountScreenStyles from "./styles";
import AuthScreenTitleView from "../../blocks/title_view";
import AuthScreenBottonButton from "../../blocks/bottom_button";
import CreateAccountScreenProps from "./types";
import AuthScreenCommonInput from "../../blocks/input";
import UserTypeSelectionButton from "../../blocks/icon_user_type";
import { Authority } from "../../../../libs/rest_apis/villife/types";
import useStyler from "../../../common/hooks/styler/hooks";
import useAuthService from "../../services/authentication";
import { VILLIFE_AUTHORITY } from "../../../../libs/rest_apis/villife/absc";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type AccountType = {
    authority: Authority["ADMIN"] | Authority["RENTER"];
    id: string | null;
    password: string | null;
    confirm_password: string | null;
};

export default function CreateAccountScreen({ navigation, route }: CreateAccountScreenProps) {
    const { host, access_token } = route.params;
    const login = useAuthService().login;
    const join = useAuthService().join;
    const messages = useScreenMessage();
    const styles = useCreateAccountScreenStyles();
    const { deviceUI } = useStyler();

    const [account, setAccount] = useState<AccountType>({
        authority: VILLIFE_AUTHORITY.RENTER,
        id: null,
        password: null,
        confirm_password: null,
    });

    const [isCorrectID, setIsCorrectID] = useState<boolean>(false);
    const [isCorrectPassword, setIsCorrectPassword] = useState<boolean>(false);
    const [isCorrectConfirmPassword, setIsCorrectConfirmPassword] = useState<boolean>(false);

    const [isDone, setIsDone] = useState<boolean>(false);

    const handleJoin = async () => {
        const { authority, id, password } = account;

        if (id && password && access_token) {
            const result = await join(host, { id, password, authority, accessToken: access_token });

            if (!result.isSuccessful) {
                Alert.alert(result.data?.data ?? "Failed to join.");
                return;
            } else {
                console.log("succeeded in sigining up");
                login(host, { id, password });
            }
            // [TO-DO] Welcome screen으로 이동 전에 Stack 초기화
            navigation.navigate("welcome", { authority, id, password });
        }
    };

    useEffect(() => {
        setIsDone(isCorrectID && isCorrectPassword && isCorrectConfirmPassword);
    }, [isCorrectID, isCorrectPassword, isCorrectConfirmPassword]);

    return (
        <SafeAreaView style={styles.main.container}>
            <View style={styles.main.wrapper}>
                <AuthScreenTitleView
                    title={messages.messages.auth.create_account.title}
                    subtitles={[messages.messages.auth.create_account.subtitle]}
                />
                <KeyboardAwareScrollView
                    style={styles.main.contentWrapper}
                    showsVerticalScrollIndicator={false} /* behavior="padding" */
                >
                    <View style={styles.userTypeIcon.container}>
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
                    <View style={styles.input.container}>
                        <View style={styles.input.inputBox}>
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
                                onValidate={
                                    (isValid: boolean) => setIsCorrectID(isValid)
                                    /* setInputValidation({
                                        ...inputValidation,
                                        id: isValid,
                                    }) */
                                }
                            />
                        </View>
                        <View style={styles.input.inputBox}>
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
                                onValidate={
                                    (isValid: boolean) => setIsCorrectPassword(isValid)
                                    /* setInputValidation({
                                        ...inputValidation,
                                        password: isValid,
                                    }) */
                                }
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.input.inputBox}>
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
                                onValidate={(isValid: boolean) => setIsCorrectConfirmPassword(isValid)}
                                secureTextEntry
                            />
                        </View>
                        {host === "villife" && route.params.access_token !== undefined ? (
                            <View style={styles.input.inputBox}>
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
                            </View>
                        ) : (
                            <></>
                        )}
                    </View>
                </KeyboardAwareScrollView>
            </View>
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
