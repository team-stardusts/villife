import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../../../common/router/types";
import ContentBox from "../../../../../../../common/blocks/content_box";
import SpinningWon from "../../../../../blocks/icon/spinning_won";
import { ManagementFeeBoxProps } from "../types";
import useUserInformation from "../../../../../../../common/hooks/service/user_info";

export default function ManagementFeeBox(props: ManagementFeeBoxProps) {
    const navigation = useNavigation<VillifeNavigation>();
    const user = useUserInformation();
    const insertCommaToMoney = (money: number): string => {
        if (money == undefined) return "0";
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handlePressPaymentBtn = () => {
        if (props.manangementFee?.amount_won) {
            navigation.navigate("confirm_payment_cost", {
                title: "관리비 결제하기",
                product_id: props.manangementFee.bill_id,
                product_name: "?",
                product_type: "pt_management_fee",
                price: props.manangementFee.amount_won,
                bill: {
                    관리용역비: 20000,
                    일반관리비: 45000,
                    소독비: 100,
                    화재보험료: 100,
                    수선유지비: 100,
                },
            });
        }
    };

    return (
        <View style={props.styles.container}>
            <ContentBox backgroundColor={props.styles.contentBox.color} enableShadow={false}>
                <View style={props.styles.contentWrapper}>
                    <View style={props.styles.header}>
                        {props.manangementFee && (
                            <Text style={props.styles.headerText}>{user?.roomNumber}호 관리비</Text>
                        )}
                    </View>
                    <View style={props.styles.body}>
                        <View style={props.styles.managementFeeBox}>
                            <SpinningWon size={20} />
                            {
                                <Text style={props.styles.managementFee}>
                                    {props.manangementFee ? insertCommaToMoney(props.manangementFee.amount_won) : "0"}원
                                </Text>
                            }
                        </View>
                        {props.manangementFee !== undefined && props.manangementFee.amount_won !== 0 && (
                            <TouchableOpacity
                                style={props.styles.paymentBtn}
                                activeOpacity={0.6}
                                onPress={handlePressPaymentBtn}>
                                <Text style={props.styles.paymentText}>결제하기</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ContentBox>
        </View>
    );
}
