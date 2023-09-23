import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ManagementFeeStatusScrollViewProps } from "../types";
import ContentBox from "../../../../../common/blocks/content_box";
import useManagementFeeHomeScreenStyles from "../styles";
import { ManagementFee } from "../../../../../../libs/rest_apis/villife/expense/types";
import Icon from "../../../../../common/atoms/icon";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../common/router/types";

export default function ManagementFeeStatusScrollView(props: ManagementFeeStatusScrollViewProps) {
    const [fees, setFees] = useState<ManagementFee.ManagementFee[]>([]);
    const scrollviewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (props.manangementFee === undefined) return;

        if (props.manangementFee.length > 12) {
            setFees([...props.manangementFee.slice(props.manangementFee.length - 12, props.manangementFee.length)]);
        } else {
            setFees([...props.manangementFee]);
        }
        scrollviewRef.current?.scrollToEnd({ animated: true });
    }, [props.manangementFee]);

    useEffect(() => {}, [fees]);

    return (
        <ScrollView
            ref={scrollviewRef}
            style={props.styles.container}
            onContentSizeChange={() => scrollviewRef.current?.scrollToEnd({ animated: true })}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {fees.map((fee, index) => (
                <PaymentByMonth
                    key={index}
                    isFirstElement={index === 0}
                    isLastElement={fees.length === index + 1}
                    styles={props.styles}
                    managementFee={fee}
                />
            ))}
        </ScrollView>
    );
}

function PaymentByMonth(props: PaymentByMonthProps) {
    const navigation = useNavigation<VillifeNavigation>();

    const handlePressPaymentBtn = () => {
        navigation.navigate("confirm_payment_cost", {
            title: "관리비 결제하기",
            product_id: props.managementFee.bill_id,
            product_name: "?",
            product_type: "pt_management_fee",
            price: props.managementFee.amount_won,
            bill: {
                관리용역비: 20000,
                일반관리비: 45000,
                소독비: 100,
                화재보험료: 100,
                수선유지비: 100,
            },
        });
    };

    return (
        <View
            style={[
                props.styles.managementFeeContainer,
                /* 아래 스타일링은 다른 ContentBox 컴포넌트들과 정렬을 맞추기 위함임 */
                props.isFirstElement && { marginLeft: props.styles.managementFeeContainer.marginLeft * 1.5 },
                props.isLastElement && { marginRight: props.styles.managementFeeContainer.marginLeft * 1.5 },
            ]}>
            <ContentBox backgroundColor={props.styles.contentBox.color} enableShadow={false}>
                <TouchableOpacity
                    style={props.styles.contentWrapper}
                    activeOpacity={0.6}
                    disabled={props.managementFee.is_paid || !props.isLastElement}
                    onPress={handlePressPaymentBtn}>
                    <View style={props.styles.monthBox}>
                        <Text style={props.styles.month}>{props.managementFee.month}월</Text>
                    </View>
                    <View style={props.styles.btnBox}>
                        {props.managementFee.is_paid ? (
                            <View style={props.styles.iconBox}>
                                <Icon
                                    name="check"
                                    size={props.styles.checkIcon.width}
                                    color={props.styles.checkIcon.color}
                                />
                            </View>
                        ) : props.isLastElement ? (
                            <View style={props.styles.paymentBtn}>
                                <Text style={props.styles.paymentBtnText} adjustsFontSizeToFit>
                                    납부하기
                                </Text>
                            </View>
                        ) : (
                            <View style={[props.styles.iconBox, { transform: [{ rotateZ: "45deg" }] }]}>
                                <Icon name="plus" size={props.styles.xIcon.width} color={props.styles.xIcon.color} />
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </ContentBox>
        </View>
    );
}

type PaymentByMonthProps = {
    isFirstElement: boolean;
    isLastElement: boolean;
    styles: ReturnType<typeof useManagementFeeHomeScreenStyles>["managementFeeStatus"];
    managementFee: ManagementFee.ManagementFee;
};
