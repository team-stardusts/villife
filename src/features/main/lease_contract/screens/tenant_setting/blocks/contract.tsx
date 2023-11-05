import { Text, TouchableOpacity, View } from "react-native";
import ListBottomSlidableModal from "../../../../../common/blocks/modal/bottom_list";
import Icon from "../../../../../common/atoms/icon";
import { useEffect, useState } from "react";
import type { ContractProps } from "../types";
import type { Building } from "../../../../../../libs/rest_apis/villife/building/types";
import { ModalFeature } from "../../../../../common/blocks/modal/bottom_list/types";

export default function Contract(props: ContractProps) {
    //const contracts: Building.RentType[] = ["lump-sum-deposit", "monthly-rent", "partial-lump-sum-deposit"];
    const [contract, setContract] = useState<Building.RentType | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        if (props.initialRentType) {
            setContract(props.initialRentType);
        }
    }, []);

    useEffect(() => {
        props.onChangeInfo(contract);
    }, [contract]);

    const features: ModalFeature[] = [
        {
            icon: "pencil",
            text: "전세",
            onPress: () => {
                setContract("lump-sum-deposit");
                setModalVisible(false);
            },
        },
        {
            icon: "pencil",
            text: "월세",
            onPress: () => {
                setContract("monthly-rent");
                setModalVisible(false);
            },
        },
    ];

    const setContractText = () => {
        switch (contract) {
            case "lump-sum-deposit":
                return "전세";
            case "monthly-rent":
                return "월세";
            default:
                return "선택";
        }
    };

    return (
        <View style={props.styles.row}>
            <ListBottomSlidableModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                features={features}
            />
            <View style={props.styles.rowTitleBox}>
                <Text style={props.styles.title}>계약 구분</Text>
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
