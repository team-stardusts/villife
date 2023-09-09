import { useEffect, useState } from "react";
import VillifeToastMessage from "../../../../../common/atoms/toast";
import { View, Text } from "react-native";
import UniversalTextInput from "../../../../../common/blocks/universial/textinput";
import type { MoneyProps } from "../types";

export default function Money(props: MoneyProps) {
    const [money, setMoney] = useState<number | null>(null);

    useEffect(() => {
        props.onChangeInfo(money === null ? 0 : money);
    }, [money]);

    const handleChangeMoney = (text: string) => {
        const number = parseInt(text);

        if (Number.isNaN(number)) {
            setMoney(null);
            VillifeToastMessage.showBottomToast("error", "숫자만 입력할 수 있습니다.");
        } else {
            setMoney(number);
        }
    };

    const insertCommaToMoney = (money: number | undefined): string => {
        if (money === undefined) return "";
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <View style={props.styles.row}>
            <View style={props.styles.rowTitleBox}>
                <Text style={props.styles.title}>{props.title}</Text>
            </View>
            <View style={props.styles.moneyInputBox}>
                <UniversalTextInput
                    style={props.styles.moneyInput}
                    placeholder={`${props.title}를 입력해주세요.`}
                    value={money?.toString()}
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
