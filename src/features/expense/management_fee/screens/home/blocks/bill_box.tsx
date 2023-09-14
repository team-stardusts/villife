import { Text, TouchableOpacity, View } from "react-native";
import { ManagementFeeBillBoxProps } from "../types";
import ContentBox from "../../../../../common/blocks/content_box";

export default function BillBox(props: ManagementFeeBillBoxProps) {
    const insertCommaToMoney = (money: number | undefined): string => {
        if (money === undefined || money === null) return "-";
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <View style={props.styles.container}>
            <ContentBox backgroundColor={props.styles.contentBox.color} enableShadow={false}>
                <View style={props.styles.contentWrapper}>
                    <View style={props.styles.header}>
                        <Text style={props.styles.headerText}>관리비</Text>
                        <TouchableOpacity
                            style={props.styles.detailBtn}
                            activeOpacity={0.6}
                            onPress={() => console.log("상세!!")}>
                            <Text style={props.styles.detailText}>상세내역</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={props.styles.body}>
                        <View style={props.styles.bodyRow}>
                            <Text style={props.styles.bodyRowKey}>당월 부과액</Text>
                            <Text style={props.styles.bodyRowValue}>
                                {insertCommaToMoney(props.manangementFee?.amount_won)} 원
                            </Text>
                        </View>
                        <View style={props.styles.bodyRow}>
                            <Text style={props.styles.bodyRowKey}>미납액</Text>
                            {/* TODO: 미납액 가져오기 */}
                            <Text style={props.styles.bodyRowValue}>{insertCommaToMoney(props.unpaidFee)} 원</Text>
                        </View>
                    </View>
                </View>
            </ContentBox>
        </View>
    );
}
