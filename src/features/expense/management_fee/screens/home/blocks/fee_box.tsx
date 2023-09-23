import { Animated, Text, TouchableOpacity, View } from "react-native";
import { ManagementFeeBoxProps } from "../types";
import ContentBox from "../../../../../common/blocks/content_box";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../common/router/types";
import { useEffect, useRef } from "react";
import { ANIMATION_DURATION_DEFAULT } from "../../../../../common/constants";

export default function ManagementFeeBox(props: ManagementFeeBoxProps) {
    const navigation = useNavigation<VillifeNavigation>();
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

    const unitRotaionValue = useRef(new Animated.Value(0)).current;
    const interpolate = unitRotaionValue.interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1],
        outputRange: ["0deg", "90deg", "180deg", "270deg", "360deg"],
    });

    useEffect(() => {
        Animated.sequence([
            Animated.timing(unitRotaionValue, {
                toValue: 1,
                duration: ANIMATION_DURATION_DEFAULT,
                useNativeDriver: true,
            }),
            Animated.timing(unitRotaionValue, {
                toValue: 0,
                duration: ANIMATION_DURATION_DEFAULT,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

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
                            <View style={props.styles.managementFeeBox}>
                                <Animated.View
                                    style={[
                                        props.styles.managementFeeUnitCircle,
                                        {
                                            transform: [{ rotateY: interpolate }],
                                        },
                                    ]}>
                                    <Text style={props.styles.managementFeeUnitText}>₩</Text>
                                </Animated.View>
                                <Text style={props.styles.managementFee}>
                                    {insertCommaToMoney(props.manangementFee.amount_won)}
                                </Text>
                            </View>
                        )}
                        <TouchableOpacity
                            style={props.styles.paymentBtn}
                            activeOpacity={0.6}
                            onPress={handlePressPaymentBtn}>
                            <Text style={props.styles.paymentText}>결제하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ContentBox>
        </View>
    );
}
