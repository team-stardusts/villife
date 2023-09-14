import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ManagementFeeStatusScrollViewProps } from "../types";
import ContentBox from "../../../../../common/blocks/content_box";
import useManagementFeeHomeScreenStyles from "../styles";
import { ManagementFee } from "../../../../../../libs/rest_apis/villife/expense/types";
import Icon from "../../../../../common/atoms/icon";
import { useEffect, useRef, useState } from "react";

export default function ManagementFeeStatusScrollView(props: ManagementFeeStatusScrollViewProps) {
    const [fees, setFees] = useState<ManagementFee.ManagementFee[]>([]);
    const scrollviewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (props.manangementFees === undefined) return;

        if (props.manangementFees.length > 12) {
            setFees([...props.manangementFees.slice(props.manangementFees.length - 12, props.manangementFees.length)]);
        } else {
            setFees([...props.manangementFees]);
        }
        scrollviewRef.current?.scrollToEnd({ animated: true });
    }, [props.manangementFees]);

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
    return (
        <View
            style={[
                props.styles.managementFeeContainer,
                /* 아래 스타일링은 다른 ContentBox 컴포넌트들과 정렬을 맞추기 위함임 */
                props.isFirstElement && { marginLeft: props.styles.managementFeeContainer.marginLeft * 1.5 },
                props.isLastElement && { marginRight: props.styles.managementFeeContainer.marginLeft * 1.5 },
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
    isFirstElement: boolean;
    isLastElement: boolean;
    styles: ReturnType<typeof useManagementFeeHomeScreenStyles>["managementFeeStatus"];
    managementFee: ManagementFee.ManagementFee;
};
