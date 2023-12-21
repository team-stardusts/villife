import { Text, View } from "react-native";
import ContentBox from "../../../../../../../common/blocks/content_box";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../../../common/router/types";
import { ManagementFeeBillBoxProps } from "../types";
import { insertCommaToNumber } from "../../../../../../../common/global_function";

export default function BillBox(props: ManagementFeeBillBoxProps) {
    const navigation = useNavigation<VillifeNavigation>();

    return (
        <View style={props.styles.container}>
            <ContentBox backgroundColor={props.styles.contentBox.color} enableShadow={false}>
                <View style={props.styles.contentWrapper}>
                    <View style={props.styles.header}>
                        <Text style={props.styles.headerText}>청구금액</Text>
                        {/* <TouchableOpacity
                            style={props.styles.detailBtn}
                            activeOpacity={0.6}
                            onPress={() =>
                                navigation.navigate("management_fee_current_month_detail", {
                                    ...props,
                                })
                            }>
                            <Text style={props.styles.detailText}>상세내역</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={props.styles.body}>
                        <View style={props.styles.bodyRow}>
                            <Text style={props.styles.bodyRowKey}>당월 부과액</Text>
                            <Text style={props.styles.bodyRowValue}>
                                {insertCommaToNumber(props.currentMonthlyCharge)}원
                            </Text>
                        </View>
                        <View style={props.styles.bodyRow}>
                            <Text style={props.styles.bodyRowKey}>미납액</Text>
                            <Text style={props.styles.bodyRowValue}>{insertCommaToNumber(props.unpaidFee)}원</Text>
                        </View>
                        <View style={props.styles.bodyRow}>
                            <Text style={props.styles.bodyRowKey}>미납 연체료</Text>
                            <Text style={props.styles.bodyRowValue}>{insertCommaToNumber(props.lateFee)}원</Text>
                        </View>
                        <View style={props.styles.bodyRow}>
                            <Text style={props.styles.bodyRowKey}>오늘 입금 시</Text>
                            <Text style={props.styles.bodyRowValue}>{insertCommaToNumber(props.feeToPay)}원</Text>
                        </View>
                    </View>
                </View>
            </ContentBox>
        </View>
    );
}
