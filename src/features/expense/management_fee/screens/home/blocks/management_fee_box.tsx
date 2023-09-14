import { Text, TouchableOpacity, View } from "react-native";
import { ManagementFeeBoxProps } from "../types";
import ContentBox from "../../../../../common/blocks/content_box";

export default function ManagementFeeBox(props: ManagementFeeBoxProps) {
    const insertCommaToMoney = (money: number): string => {
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <View style={props.styles.container}>
            <ContentBox backgroundColor={props.styles.contentBox.color} enableShadow={false}>
                <View style={props.styles.contentWrapper}>
                    <View style={props.styles.header}>
                        {props.manangementFee && (
                            <Text style={props.styles.headerText}>
                                {props.manangementFee.year}년 {props.manangementFee.month}월 납부할 금액
                            </Text>
                        )}
                    </View>
                    <View style={props.styles.body}>
                        {props.manangementFee && (
                            <Text style={props.styles.managementFee}>
                                {insertCommaToMoney(props.manangementFee.amount_won)} 원
                            </Text>
                        )}
                        <TouchableOpacity
                            style={props.styles.paymentBtn}
                            activeOpacity={0.6}
                            onPress={() => console.log("결제!!")}>
                            <Text style={props.styles.paymentText}>결제하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ContentBox>
        </View>
    );
}
