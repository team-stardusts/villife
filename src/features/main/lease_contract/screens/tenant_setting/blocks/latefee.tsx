import { useEffect, useState } from "react";
import VillifeToastMessage from "../../../../../common/atoms/toast";
import { View, Text } from "react-native";
import UniversalTextInput from "../../../../../common/blocks/universial/textinput";
import type { LateFeeRateProps } from "../types";
import { insertCommaToNumber } from "../../../../../common/global_function";

export default function LateFeeRate(props: LateFeeRateProps) {
    const [lateFeeRate, setLateFeeRate] = useState<number | null>(null);

    useEffect(() => {
        if (props.initialRate) {
            setLateFeeRate(props.initialRate);
        }
    }, []);

    useEffect(() => {
        props.onChangeInfo(lateFeeRate === null ? 0 : lateFeeRate);
    }, [lateFeeRate]);

    const handleChangeRate = (text: string) => {
        const number = parseInt(text);

        if (Number.isNaN(number)) {
            setLateFeeRate(null);
            VillifeToastMessage.showBottomToast("error", "숫자만 입력할 수 있어요.");

            return;
        } else if (number > 100 || number < 0) {
            setLateFeeRate(null);
            VillifeToastMessage.showBottomToast("error", "0 이상, 100 이하의 숫자만 입력할 수 있어요.");

            return;
        }
        setLateFeeRate(number);
    };

    return (
        <View style={props.styles.row}>
            <View style={props.styles.rowTitleBox}>
                <Text style={props.styles.title}>연체요율</Text>
            </View>
            <View style={props.styles.moneyInputBox}>
                <UniversalTextInput
                    style={props.styles.moneyInput}
                    placeholder={"연체요율을 입력해주세요."}
                    value={lateFeeRate === null ? undefined : lateFeeRate.toString()}
                    lowlightColor={props.styles.moneyInputLowLight.color}
                    onChangeText={(text) => handleChangeRate(text)}
                />
                <View style={props.styles.moneyInputPostFixBox}>
                    <Text style={props.styles.contractText}>%</Text>
                </View>
            </View>
        </View>
    );
}
