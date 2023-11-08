import { useEffect, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import useSetAccountScreenStyles from "./styles";
import ScreenTitleView from "../../../common/blocks/title_view";
import SetAccountScreenProps from "./types";
import AuthScreenCommonInput from "../../blocks/input";
import UserTypeSelectionButton from "../../blocks/icon_user_type";
import { VILLIFE_AUTHORITY } from "../../../../libs/rest_apis/villife/absc";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AccountType } from "../set_authority/types";

export default function SetAccountScreen({ navigation, route }: SetAccountScreenProps) {
    const { authority } = route.params;
    const messages = useScreenMessage();
    const styles = useSetAccountScreenStyles("villife");

    const [account, setAccount] = useState<AccountType>({
        authority: authority, //VILLIFE_AUTHORITY.RENTER,
        id: null,
        password: null,
        confirm_password: null,
    });

    const [isDone, setIsDone] = useState<boolean>(false);

    const navigateToVerificationPage = async () => {
        const { authority, id, password, confirm_password } = account;

        if (authority === null || id === null || password === null) return;

        console.log("[CREATE_ACCOUNT]", "Succeeded in sigining up");

        navigation.navigate("verify_personal_info", {
            authority: authority,
            host: "villife",
            id: id,
            password: password,
        });
    };

    useEffect(() => {
        setIsDone(account.id !== null && account.password !== null && account.confirm_password !== null);

        return;
    }, [account]);

    return (
        <SafeAreaView style={styles.main.container}>
            <ScreenTitleView
                titles={[messages.messages.auth.create_account.title]}
                subtitles={[messages.messages.auth.create_account.subtitle]}
                bottomButton={{
                    title: messages.messages.auth.create_account.next_btn_title,
                    onPress: () => {
                        navigateToVerificationPage();
                    },
                    disabled: !isDone,
                }}>
                <KeyboardAwareScrollView style={styles.main.contents} showsVerticalScrollIndicator={false}>
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
                                placeholder={messages.messages.auth.create_account.confirm_password_input_placeholder}
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
                </KeyboardAwareScrollView>
            </ScreenTitleView>
        </SafeAreaView>
    );
}
