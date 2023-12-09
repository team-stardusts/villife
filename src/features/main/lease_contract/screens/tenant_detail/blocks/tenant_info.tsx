import { View } from "react-native";
import TitleCard from "../../../../../common/blocks/title_card";
import { TenantInfoProps } from "../types";
import StardustDateParser from "../../../../../../libs/date_parser";
import CardRow from "./card_row";
import ListBottomSlidableModal from "../../../../../common/blocks/modal/bottom_list";
import { useState } from "react";
import { ModalFeature } from "../../../../../common/blocks/modal/bottom_list/types";
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
                if (props.room.roomId === undefined) {
                    VillifeToastMessage.showBottomToast(
                        "error",
                        "등록되지 않은 방 번호 입니다. 빌라이프 관리자에게 문의해주세요."
                    );
                    return;
                }

                // [TO-DO] 이름과 전화번호를 계약 상의 데이터로 변경해야함
                navigation.navigate("tenant_setting", {
                    roomID: props.room.roomId,
                    previous: {
                        contractId: props.room.contractInfo.contractId,
                        contractorName: props.room.residentName,
                        delinquencyRate: props.room.contractInfo.delinquencyRate,
                        deposit: props.room.contractInfo.deposit,
                        managementFee: props.room.contractInfo.managementFee,
                        monthlyRent: props.room.contractInfo.monthlyRent,
                        rentType: props.room.contractInfo.rentType,
                        roomId: props.room.roomId,
                        expirationDate: JSON.stringify(props.room.contractInfo.expirationDate),
                        startDate: JSON.stringify(props.room.contractInfo.startDate),
                        phoneNumber: props.room.residentPhoneNumber,
                    },
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
        if (props.room.contractInfo === undefined) {
            VillifeToastMessage.showBottomToast(
                "error",
                "등록되지 않은 계약 정보 입니다. 빌라이프 관리자에게 문의해주세요."
            );
            return;
        }

        const isSuccessful = await contractor.deleteContract(props.room.contractInfo.contractId);

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
        switch (props.room.contractInfo?.rentType) {
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

    const getDateDiff = (d1: Date, d2: Date) => {
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        const diffDate = date1.getTime() - date2.getTime();

        return Math.floor(diffDate / (1000 * 60 * 60 * 24)) + 1; // 밀리세컨 * 초 * 분 * 시 = 일
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
                title="계약 정보"
                headerButton={{
                    title: "수정",
                    onPress: () => setModalVisible(true),
                }}
                minHeight={props.styles.tenantInfo.minHeight}>
                <View style={props.styles.tenantInfo}>
                    <CardRow styles={props.styles} rowKey={"호수"} rowValue={`${props.room.roomNumber.toString()}호`} />
                    <CardRow styles={props.styles} rowKey={"이름"} rowValue={props.room.residentName} />
                    <CardRow styles={props.styles} rowKey={"전화번호"} rowValue={props.room.residentPhoneNumber} />
                    <CardRow styles={props.styles} rowKey={"계약"} rowValue={switchContractType()} />
                    <CardRow styles={props.styles} rowKey={"자동고지"} rowValue={"사용"} />
                    <CardRow
                        styles={props.styles}
                        rowKey={"관리비"}
                        rowValue={insertCommaToMoney(props.room.contractInfo?.managementFee) + " 원"}
                    />
                    <CardRow
                        styles={props.styles}
                        rowKey={"월세"}
                        rowValue={insertCommaToMoney(props.room.contractInfo?.monthlyRent) + " 원"}
                    />
                    <CardRow
                        styles={props.styles}
                        rowKey={"보증금"}
                        rowValue={insertCommaToMoney(props.room.contractInfo?.deposit) + " 원"}
                    />
                    <CardRow
                        styles={props.styles}
                        rowKey={"입주일"}
                        rowValue={convertDateToString(
                            StardustDateParser.deserialize(props.room.contractInfo.startDate)
                        )}
                    />
                    <CardRow
                        styles={props.styles}
                        rowKey={"만기일"}
                        rowValue={convertDateToString(
                            StardustDateParser.deserialize(props.room.contractInfo.expirationDate)
                        )}
                    />
                    <CardRow
                        styles={props.styles}
                        rowKey={"남은기간"}
                        rowValue={
                            getDateDiff(
                                StardustDateParser.deserialize(props.room.contractInfo.expirationDate),
                                StardustDateParser.changeGMT(new Date(), "kr")
                            ).toString() + " 일"
                        }
                    />
                </View>
            </TitleCard>
        </View>
    );
}
