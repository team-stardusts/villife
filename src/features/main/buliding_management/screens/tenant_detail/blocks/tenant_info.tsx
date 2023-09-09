import { View } from "react-native";
import TitleCard from "../../../../../common/blocks/title_card";
import { TenantInfoProps } from "../types";
import StardustDateParser from "../../../../../../libs/date_parser";
import CardRow from "./card_row";
import ListBottomSlidableModal from "../../../../../common/blocks/bottom_list_modal";
import { useState } from "react";
import { ModalFeature } from "../../../../../common/blocks/bottom_list_modal/types";
import { useNavigation } from "@react-navigation/native";
import { VillifeRouterParams } from "../../../../../common/router/types";
import VillifeToastMessage from "../../../../../common/atoms/toast";
import StardustAlert from "../../../../../common/blocks/universial/stardust_alert";
import { StardustAlertContent } from "../../../../../common/blocks/universial/stardust_alert/types";
import useBuildingRoomContractor from "../../../services/building_rooms";

export default function TenantInfo(props: TenantInfoProps) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const navigation = useNavigation<VillifeRouterParams["navigation"]>();
    const contractor = useBuildingRoomContractor();
    const [alert, setAlert] = useState<StardustAlertContent>({
        visible: false,
        type: "warning",
        title: "정말로 삭제하시겠습니까?",
        message: "삭제된 정보는 복구 할 수 없습니다.",
    });

    const [features] = useState<ModalFeature[]>([
        {
            icon: "pencil",
            text: "수정하기",
            onPress: () => {
                if (props.tenant.roomID === undefined) {
                    VillifeToastMessage.showBottomToast(
                        "error",
                        "등록되지 않은 방 번호 입니다. 빌라이프 관리자에게 문의해주세요."
                    );
                    return;
                }
                navigation.navigate("tenant_setting", {
                    type: "edit",
                    contractID: props.tenant.contractInfo.contractID,
                    roomID: props.tenant.roomID,
                });
                setModalVisible(false);
            },
        },
        {
            icon: "trash-can",
            text: "삭제하기",
            onPress: () => {
                setModalVisible(false);
                setAlert({
                    ...alert,
                    visible: true,
                    buttons: [
                        {
                            text: "취소",
                            onPress: () => cancleAlert(),
                        },
                        {
                            text: "확인",
                            onPress: () => deleteRoomInfo(),
                        },
                    ],
                });
            },
        },
    ]);

    const cancleAlert = () => {
        setAlert({
            ...alert,
            visible: false,
        });
    };

    const deleteRoomInfo = async () => {
        if (props.tenant.contractInfo === undefined) {
            VillifeToastMessage.showBottomToast(
                "error",
                "등록되지 않은 계약 정보 입니다. 빌라이프 관리자에게 문의해주세요."
            );
            return;
        }

        const isSuccessful = await contractor.deleteContract(props.tenant.contractInfo.contractID);

        setAlert({
            ...alert,
            visible: false,
        });

        if (isSuccessful) {
            VillifeToastMessage.showBottomToast("success", "계약 정보를 삭제했습니다.");
            navigation.pop();
        } else {
            VillifeToastMessage.showBottomToast("error", "계약 정보를 삭제하지 못했습니다.");
        }
    };

    const switchContractType = () => {
        switch (props.tenant.contractInfo?.rentType) {
            case "lump-sum-deposit":
                return props.messages.words.lump_sum_deposit;
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
        )}-${convertOneDigitToTwoDigits(date.getDate())}`;
    };

    const insertCommaToMoney = (money: number | undefined): string => {
        if (money === undefined) return "";
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <View style={props.styles.tenantInfoContainer}>
            <StardustAlert {...alert} setAlert={setAlert} />
            <ListBottomSlidableModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                features={features}
            />
            <TitleCard
                title="세입자 정보"
                headerButton={{
                    title: "수정",
                    onPress: () => setModalVisible(true),
                }}
                minHeight={props.styles.tenantInfo.minHeight}>
                <View style={props.styles.tenantInfo}>
                    <CardRow styles={props.styles} rowKey={"이름"} rowValue={props.tenant.residentName} />
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
        </View>
    );
}
