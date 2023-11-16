import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import useUserMFViewStyles from "../styles";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ManagementFeeStatusScrollViewProps } from "../types";
import { ManagementFee } from "../../../../../../../../libs/rest_apis/villife/expense/types";
import { VillifeNavigation } from "../../../../../../../common/router/types";
import ContentBox from "../../../../../../../common/blocks/content_box";
import Icon from "../../../../../../../common/atoms/icon";

export default function ManagementFeeStatusScrollView(props: ManagementFeeStatusScrollViewProps) {
    const [fees, setFees] = useState<ManagementFee.ManagementFee[]>([]);
    const scrollviewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (props.manangementFees === null || props.manangementFees === undefined) return;

        if (props.manangementFees.length > 12) {
            setFees([...props.manangementFees.slice(props.manangementFees.length - 12, props.manangementFees.length)]);
        } else {
            setFees([...props.manangementFees]);
        }
        scrollviewRef.current?.scrollToEnd({ animated: true });
    }, [props.manangementFees]);

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
                    //feeToPay={props.feeToPay}
                />
            ))}
        </ScrollView>
    );
}

function PaymentByMonth(props: PaymentByMonthProps) {
    const navigation = useNavigation<VillifeNavigation>();

    /* const handlePressPaymentBtn = () => {
        navigation.navigate("wire_amount_manually", {
            amount_won: props.feeToPay,
        });
    }; */

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
                    //onPress={handlePressPaymentBtn}
                >
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
                        ) : (
                            <View style={[props.styles.iconBox, { transform: [{ rotateZ: "45deg" }] }]}>
                                <Icon name="plus" size={props.styles.xIcon.width} color={props.styles.xIcon.color} />
                            </View>
                        )}
                        {/* {props.managementFee.is_paid ? (
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
                        )} */}
                    </View>
                </TouchableOpacity>
            </ContentBox>
        </View>
    );
}

type PaymentByMonthProps = {
    isFirstElement: boolean;
    isLastElement: boolean;
    styles: ReturnType<typeof useUserMFViewStyles>["managementFeeStatus"];
    managementFee: ManagementFee.ManagementFee;
    //feeToPay: number;
};
