import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { PaymentStatusScrollViewProps } from "../types";
import ContentBox from "../../../../../common/blocks/content_box";
import usePaymentScreenStyles from "../styles";
import { Payment } from "../../../../../../libs/rest_apis/villife/payment/types";
import Icon from "../../../../../common/atoms/icon";

export default function PaymentStatusScrollView(props: PaymentStatusScrollViewProps) {
    return (
        <ScrollView style={props.styles.container} horizontal showsHorizontalScrollIndicator={false}>
            {props.manangementFees &&
                props.manangementFees.map((fee, index) => (
                    <PaymentByMonth
                        key={index}
                        isLastElement={props.manangementFees?.length === index + 1}
                        styles={props.styles}
                        managementFee={fee}
                    />
                ))}
        </ScrollView>
    );
}

function PaymentByMonth(props: PaymentByMonthProps) {
    return (
        <View
            style={[
                props.styles.paymentContainer,
                props.isLastElement && { marginRight: props.styles.paymentContainer.marginLeft },
            ]}>
            <ContentBox backgroundColor={props.styles.contentBox.color} enableShadow={false}>
                <View style={props.styles.contentWrapper}>
                    <View style={props.styles.monthBox}>
                        <Text style={props.styles.month}>{props.managementFee.month}월</Text>
                    </View>
                    <View style={props.styles.btnBox}>
                        {props.managementFee.is_paid ? (
                            <View style={props.styles.iconBox}>
                                <Icon name="check" size={props.styles.icon.width} color={props.styles.icon.color} />
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={props.styles.paymentBtn}
                                activeOpacity={0.6}
                                onPress={() => console.log("납부!!")}>
                                <Text style={props.styles.paymentBtnText}>납부하기</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ContentBox>
        </View>
    );
}

type PaymentByMonthProps = {
    isLastElement: boolean;
    styles: ReturnType<typeof usePaymentScreenStyles>["paymentStatus"];
    managementFee: Payment.ManagementFee;
};
