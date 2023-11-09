import { useEffect, useState } from "react";
import VillifeToastMessage from "../../../../../common/atoms/toast";
import { View, Text } from "react-native";
import UniversalTextInput from "../../../../../common/blocks/universial/textinput";
import type { MoneyProps } from "../types";
import { insertCommaToNumber } from "../../../../../common/global_function";

export default function Money(props: MoneyProps) {
    const [money, setMoney] = useState<number | null>(null);

    useEffect(() => {
        if (props.initialMoney) {
            setMoney(props.initialMoney);
        }
    }, []);

    useEffect(() => {
        props.onChangeInfo(money === null ? 0 : money);
    }, [money]);

    const handleChangeMoney = (text: string) => {
        const stringWithoutComma = text.replace(/,/g, "");
        const number = parseInt(stringWithoutComma);

        if (Number.isNaN(number)) {
            setMoney(null);
            VillifeToastMessage.showBottomToast("error", "숫자만 입력할 수 있습니다.");
        } else {
            setMoney(number);
        }
    };

    return (
        <View style={props.styles.row}>
            <View style={props.styles.rowTitleBox}>
                <Text style={props.styles.title}>{props.title}</Text>
            </View>
            <View style={props.styles.moneyInputBox}>
                <UniversalTextInput
                    textAlign="right"
                    placeholder={`${props.title}를 입력해주세요.`}
                    value={money === null ? undefined : insertCommaToNumber(money)}
                    lowlightColor={props.styles.moneyInputLowLight.color}
                    onChangeText={(text) => handleChangeMoney(text)}
                />
                <View style={props.styles.moneyInputPostFixBox}>
                    <Text style={props.styles.contractText}>원</Text>
                </View>
            </View>
        </View>
    );
}
