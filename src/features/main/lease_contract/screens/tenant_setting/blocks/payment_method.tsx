import { Text, TouchableOpacity, View } from "react-native";
import ListBottomSlidableModal from "../../../../../common/blocks/modal/bottom_list";
import Icon from "../../../../../common/atoms/icon";
import { useEffect, useState } from "react";
import type { PaymentMethodProps } from "../types";
import type { Building } from "../../../../../../libs/rest_apis/villife/building/types";
import { ModalFeature } from "../../../../../common/blocks/modal/bottom_list/types";

export default function PaymentMethod(props: PaymentMethodProps) {
    const [isPrePaidMr, setisPrePaidMr] = useState<Building.PaymentMethodType | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        if (props.initialPaymentMethodType !== undefined) setisPrePaidMr(props.initialPaymentMethodType);
    }, []);

    useEffect(() => {
        if (isPrePaidMr === null) return;

        props.onChangeInfo(isPrePaidMr);
    }, [isPrePaidMr]);

    const features: ModalFeature[] = [
        {
            icon: "pencil",
            text: "선불",
            onPress: () => {
                setisPrePaidMr(true);
                setModalVisible(false);
            },
        },
        {
            icon: "pencil",
            text: "후불",
            onPress: () => {
                setisPrePaidMr(false);
                setModalVisible(false);
            },
        },
    ];

    const setContractText = () => {
        if (isPrePaidMr === null) return "선택";

        return isPrePaidMr ? "선불" : "후불";
    };

    return (
        <View style={props.styles.row}>
            <ListBottomSlidableModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                features={features}
            />
            <View style={props.styles.rowTitleBox}>
                <Text style={props.styles.title}>월세 선/후불</Text>
            </View>
            <TouchableOpacity
                style={props.styles.contractSettingBox}
                activeOpacity={0.6}
                onPress={() => setModalVisible(true)}>
                <View style={props.styles.contractTextBox}>
                    <Text style={props.styles.contractText}>{setContractText()}</Text>
                </View>
                <View style={props.styles.arrowDownIconBox}>
                    <Icon
                        name="arrow-down"
                        size={props.styles.arrowDownIcon.width}
                        color={props.styles.arrowDownIcon.color}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}
