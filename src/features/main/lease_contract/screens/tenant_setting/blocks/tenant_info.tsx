import { Text, View } from "react-native";
import { TenantInfo, TenantInfoInputProps } from "../types";
import ReusableTextInput from "../../../../../common/blocks/text_input";
import UniversalTextInput from "../../../../../common/blocks/universial/textinput";
import { useEffect, useState } from "react";
import StringValidator from "../../../../../../libs/string_validator";
import VillifeToastMessage from "../../../../../common/atoms/toast";

export default function TenantInfoInput(props: TenantInfoInputProps) {
    const vaildator = new StringValidator();
    const [tenantInfo, setTenantInfo] = useState<TenantInfo>({
        name: null,
        phoneNumber: null,
    });

    useEffect(() => {
        props.onChangeInfo(tenantInfo);
    }, [tenantInfo]);

    return (
        <View style={props.styles.wrapper}>
            <View style={props.styles.col}>
                <View style={props.styles.colTitleBox}>
                    <Text style={props.styles.title}>이름</Text>
                </View>
                <View style={props.styles.tenantInfoInputBox}>
                    <UniversalTextInput
                        placeholder="임차인의 이름을 입력해주세요."
                        value={tenantInfo.name ?? ""}
                        onChangeText={(text) => {
                            if (vaildator.hasNumber(text) || vaildator.hasSpecialChar(text)) {
                                VillifeToastMessage.showBottomToast(
                                    "error",
                                    "이름에는 숫자와 특수 문자를 입력할 수 없어요."
                                );
                                return;
                            }

                            if (text.length > 12) {
                                VillifeToastMessage.showBottomToast("error", "이름의 최대 길이는 12글자 입니다.");
                                return;
                            }

                            setTenantInfo({
                                ...tenantInfo,
                                name: text.length === 0 ? null : text,
                            });
                        }}
                    />
                </View>
            </View>
            <View style={props.styles.col}>
                <View style={props.styles.colTitleBox}>
                    <Text style={props.styles.title}>휴대폰 번호</Text>
                </View>
                <View style={props.styles.tenantInfoInputBox}>
                    <ReusableTextInput
                        type="phone-number"
                        onInputValidValue={(value) =>
                            setTenantInfo({
                                ...tenantInfo,
                                phoneNumber: value,
                            })
                        }
                        onInputInvalidValue={() => {
                            setTenantInfo({
                                ...tenantInfo,
                                phoneNumber: null,
                            });
                        }}
                    />
                </View>
            </View>
        </View>
    );
}
