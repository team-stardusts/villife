import { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import ScreenTitleView from "../../../common/blocks/title_view";
import useTermsOfServiceScreenStyles from "./styles";
import TermsOfServiceScreenProps from "./types";
import AuthScreenSwitchButton from "../../blocks/switch_button";
import AuthScreenBottonButton from "../../blocks/bottom_button";
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
                subtitles={[messages.messages.auth.terms_of_service.subtitle]}>
                <View style={Styles.main.contentsWrapper}>
                    <View style={Styles.input.barSort}>
                        <AuthScreenSwitchButton
                            onPress={() => {
                                setIsAllGranted(!isAllGranted);
                            }}
                            disabled={isAllGranted}
                        />
                        <Text style={Styles.input.descriptionMessage}>
                            {messages.messages.auth.terms_of_service.terms_of_service_all}
                        </Text>
                        <PressableVectorIcon providerName="right" diameter={iconDiameter} />
                    </View>
                    <View style={Styles.input.horizontalLine} />
                    <View style={Styles.input.barSort}>
                        <AuthScreenSwitchButton
                            onPress={() => {
                                setIsPrivacyGranted(!isPrivacyGranted);
                            }}
                            disabled={isPrivacyGranted}
                        />
                        <Text style={Styles.input.descriptionMessage}>
                            {messages.messages.auth.terms_of_service.terms_of_service_Privacy}
                        </Text>
                        <PressableVectorIcon providerName="right" diameter={iconDiameter} />
                    </View>
                    <View style={Styles.input.barSort}>
                        <AuthScreenSwitchButton
                            onPress={() => {
                                setIsServiceGranted(!isServiceGranted);
                            }}
                            disabled={isServiceGranted}
                        />
                        <Text style={Styles.input.descriptionMessage}>
                            {messages.messages.auth.terms_of_service.terms_of_service_service}
                        </Text>
                        <PressableVectorIcon providerName="right" diameter={iconDiameter} />
                    </View>
                </View>
            </ScreenTitleView>

            <AuthScreenBottonButton
                title={messages.messages.auth.create_account.next_btn_title}
                onPress={() => console.log("NOT IMPLEMENTED")}
                disabled={!isAllGranted}
            />
        </SafeAreaView>
    );
}
