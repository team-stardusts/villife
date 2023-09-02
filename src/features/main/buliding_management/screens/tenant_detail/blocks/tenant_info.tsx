import { View } from "react-native";
import TitleCard from "../../../../../common/blocks/title_card";
import { TenantInfoProps } from "../types";
import StardustDateParser from "../../../../../../libs/date_parser";
import CardRow from "./card_row";
import TenantBottomSlidableModal, { ModalFeature } from "./tenant_bottom_slidable_modal";
import { useState } from "react";

export default function TenantInfo(props: TenantInfoProps) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const features: ModalFeature[] = [
        {
            icon: "pencil",
            text: "수정하기",
            onPress: () => console.log("수정하기"),
        },
        {
            icon: "trash-can",
            text: "삭제하기",
            onPress: () => console.log("삭제하기"),
        },
    ];

    const switchContractType = () => {
        switch (props.tenant.contractInfo?.rentType) {
            case "lump-sum-deposit":
                return props.messages.words.lump_sum_deposit;
            case "partial-lump-sum-deposit":
                return props.messages.words.partial_lump_sum_deposit;
            case "monthly-rent":
                return props.messages.words.monthly_rent;
            default: // undefined
                return props.messages.words.not_registed;
        }
    };

    const convertDateToString = (date: Date | undefined) => {
        if (date === undefined) return "";

        date = StardustDateParser.changeGMT(new Date(date), "kr");

        const convertOneDigitToTwoDigits = (number: number): string => {
            const numString = number.toString();

            if (number < 10) {
                return "0" + numString;
            }

            return numString;
        };
        return `${date.getFullYear().toString()}-${convertOneDigitToTwoDigits(
            date.getMonth() + 1
        )}-${convertOneDigitToTwoDigits(date.getDay())}`;
    };

    const insertCommaToMoney = (money: number | undefined): string => {
        if (money === undefined) return "";
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <View style={props.styles.tenantInfoContainer}>
            <TitleCard
                title="세입자 정보"
                headerButton={{
                    title: "수정",
                    onPress: () => setModalVisible(true),
                }}
                minHeight={props.styles.tenantInfo.minHeight}>
                <View style={props.styles.tenantInfo}>
                    <CardRow styles={props.styles} rowKey={"빌라명"} rowValue={props.tenant.residentName} />
                    <CardRow
                        styles={props.styles}
                        rowKey={"호수"}
                        rowValue={`${props.tenant.roomNumber.toString()}호`}
                    />
                    <CardRow styles={props.styles} rowKey={"계약"} rowValue={switchContractType()} />
                    <CardRow
                        styles={props.styles}
                        rowKey={"관리비"}
                        rowValue={insertCommaToMoney(props.tenant.contractInfo?.managementFee) + " 원"}
                    />
                    <CardRow
                        styles={props.styles}
                        rowKey={"월세"}
                        rowValue={insertCommaToMoney(props.tenant.contractInfo?.monthlyRent) + " 원"}
                    />
                    <CardRow
                        styles={props.styles}
                        rowKey={"보증금"}
                        rowValue={insertCommaToMoney(props.tenant.contractInfo?.deposit) + " 원"}
                    />
                    <CardRow
                        styles={props.styles}
                        rowKey={"만기일"}
                        rowValue={convertDateToString(props.tenant.contractInfo?.expirationDate)}
                    />
                </View>
            </TitleCard>
            <TenantBottomSlidableModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                features={features}
            />
        </View>
    );
}
