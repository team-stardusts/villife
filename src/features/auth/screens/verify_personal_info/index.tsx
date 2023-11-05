import { SafeAreaView } from "react-native-safe-area-context";
import VerifyPersonalInfoScreenProps, { PersonalInfo } from "./types";
import ScreenTitleView from "../../../common/blocks/title_view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useVerifyPersonalInfoScreenStyles from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import ReusableTextInput from "../../../common/blocks/text_input";
import UniversalTextInput from "../../../common/blocks/universial/textinput";
import Icon from "../../../common/atoms/icon";
import ListBottomSlidableModal from "../../../common/blocks/modal/bottom_list";
import { useEffect, useState } from "react";
import StringValidator from "../../../../libs/string_validator";
import VillifeToastMessage from "../../../common/atoms/toast";

export default function VerifyPersonalInfoScreen({ navigation, route }: VerifyPersonalInfoScreenProps) {
    const styles = useVerifyPersonalInfoScreenStyles();
    const validator = new StringValidator();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        name: null,
        phoneNumber: null,
        mobileCarrier: null,
        identityNumber: null,
    });

    const handlePressMobileCarrier = (name: string) => {
        setPersonalInfo({
            ...personalInfo,
            mobileCarrier: name,
        }),
            setModalVisible(false);
    };

    const isDone = (): boolean => {
        return (
            personalInfo.name !== null &&
            personalInfo.identityNumber !== null &&
            personalInfo.mobileCarrier !== null &&
            personalInfo.phoneNumber !== null
        );
    };

    return (
        <SafeAreaView style={styles.main.container}>
            <ListBottomSlidableModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                features={[
                    {
                        icon: "phone",
                        onPress: () => handlePressMobileCarrier("SKT"),
                        text: "SKT",
                    },
                    {
                        icon: "phone",
                        onPress: () => handlePressMobileCarrier("KT"),
                        text: "KT",
                    },
                    {
                        icon: "phone",
                        onPress: () => handlePressMobileCarrier("LG U+"),
                        text: "LG U+",
                    },
                    {
                        icon: "phone",
                        onPress: () => handlePressMobileCarrier("SKT 알뜰폰"),
                        text: "SKT 알뜰폰",
                    },
                    {
                        icon: "phone",
                        onPress: () => handlePressMobileCarrier("KT 알뜰폰"),
                        text: "KT 알뜰폰",
                    },
                    {
                        icon: "phone",
                        onPress: () => handlePressMobileCarrier("LG U+ 알뜰폰"),
                        text: "LG U+ 알뜰폰",
                    },
                ]}
            />
            <ScreenTitleView
                titles={["본인 인증"]}
                subtitles={["본인 인증을 위해 필요한 정보들을 입력해주세요."]}
                bottomButton={{
                    title: "다음",
                    onPress: () => {
                        navigation.navigate("verify_auth_code", {
                            identityNumberFrontDigit: personalInfo.identityNumber?.split("-")[0] as string,
                            mobileCarrier: personalInfo.mobileCarrier as string,
                            phoneNumber: personalInfo.phoneNumber as string,
                            userName: personalInfo.name as string,
                        });
                    },
                    disabled: !isDone(),
                }}>
                <KeyboardAwareScrollView
                    style={styles.main.contents}
                    showsVerticalScrollIndicator={false} /* behavior="padding" */
                >
                    <View style={styles.input.container}>
                        <View style={styles.input.titleWrapper}>
                            <Text style={styles.input.title} adjustsFontSizeToFit numberOfLines={1}>
                                이름
                            </Text>
                        </View>
                        <View style={styles.input.inputWrapper}>
                            <UniversalTextInput
                                value={personalInfo.name ?? ""}
                                placeholder="이름을 입력해주세요"
                                onChangeText={(text) => {
                                    if (validator.hasNumber(text) && validator.hasSpecialChar(text)) {
                                        VillifeToastMessage.showBottomToast(
                                            "error",
                                            "이름에 숫자와 특수문자는 사용할 수 없어요."
                                        );

                                        return;
                                    }

                                    setPersonalInfo({
                                        ...personalInfo,
                                        name: text,
                                    });
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.input.container}>
                        <View style={styles.input.titleWrapper}>
                            <Text style={styles.input.title} adjustsFontSizeToFit numberOfLines={1}>
                                휴대폰 번호
                            </Text>
                        </View>
                        <View style={styles.input.inputWrapper}>
                            <ReusableTextInput
                                type="phone-number"
                                onInputValidValue={(value) => {
                                    setPersonalInfo({
                                        ...personalInfo,
                                        phoneNumber: value,
                                    });
                                }}
                                onInputInvalidValue={() =>
                                    setPersonalInfo({
                                        ...personalInfo,
                                        phoneNumber: null,
                                    })
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.input.container}>
                        <View style={styles.input.titleWrapper}>
                            <Text style={styles.input.title} adjustsFontSizeToFit numberOfLines={1}>
                                통신사
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.input.inputWrapper}
                            activeOpacity={0.6}
                            onPress={() => setModalVisible(true)}>
                            <UniversalTextInput
                                placeholder="통신사를 선택해주세요."
                                value={personalInfo.mobileCarrier ?? ""}
                                editable={false}
                            />
                            <View style={styles.input.iconWrapper}>
                                <Icon
                                    name="arrow-down"
                                    size={styles.input.icon.width}
                                    color={styles.input.icon.color}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.input.container}>
                        <View style={styles.input.titleWrapper}>
                            <Text style={styles.input.title} adjustsFontSizeToFit numberOfLines={1}>
                                주민등록번호
                            </Text>
                        </View>
                        <View style={styles.input.inputWrapper}>
                            <ReusableTextInput
                                type="identity-number"
                                onInputValidValue={(value) => {
                                    setPersonalInfo({
                                        ...personalInfo,
                                        identityNumber: value,
                                    });
                                }}
                                onInputInvalidValue={() =>
                                    setPersonalInfo({
                                        ...personalInfo,
                                        identityNumber: null,
                                    })
                                }
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ScreenTitleView>
        </SafeAreaView>
    );
}
