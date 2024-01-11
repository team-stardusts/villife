import { useEffect, useMemo, useState } from "react";
import NavigationView from "../../../../common/blocks/navigation";
import useTenantSettingScreenStyles from "./styles";
import TenantSettingScreenProps, { MoneyTypes, TenantInfo } from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import ScreenTitleView from "../../../../common/blocks/title_view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Contract from "./blocks/contract";
import Money from "./blocks/money";
import ContractDateRange from "./blocks/contract_date_range";
import type { Building } from "../../../../../libs/rest_apis/villife/building/types";
import { Dates } from "../../../../common/blocks/modal/calendar/types";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";
import VillifeToastMessage from "../../../../common/atoms/toast";
import TenantInfoInput from "./blocks/tenant_info";
import LateFeeRate from "./blocks/latefee";
import useRoomViewModel from "../../viewmodel/room";
import Villife from "../../../../../libs/villife-client/types";
import StardustDateParser from "../../../../../libs/date_parser";
import PaymentMethod from "./blocks/payment_method";
import { RoomInfo } from "../../viewmodel/room/states";


export default function TenantSettingScreen({ navigation, route }: TenantSettingScreenProps) {
    const styles = useTenantSettingScreenStyles();
    const messages = useScreenMessage().messages;
    const viewModel = useRoomViewModel();
    const [contract, setContract] = useState<Building.RentType | null>(null);
    const [dates, setDates] = useState<Dates | null>(null);
    const [lateFeeRate, setLateFeeRate] = useState<number | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<Building.PaymentMethodType>();
    const [tenantInfo, setTenantInfo] = useState<TenantInfo>({
        name: null,
        phoneNumber: null,
    });
    const [moneys, setMoneys] = useState<MoneyTypes>({
        monthlyRent: {
            text: "월세",
            value: 0,
        },
        managementFee: {
            text: "관리비",
            value: 0,
        },
        deposit: {
            text: "보증금",
            value: 0,
        },
    });
    const previousRoomInfo = useMemo<RoomInfo["contractInfo"] | null>(() => {
        if (viewModel === null) return null;

        const _room = viewModel.data.find((v) => v.roomId === route.params.roomId);

        if (_room?.contractInfo.contractId === 0) {
            return null;
        }

        return _room === undefined ? null : _room.contractInfo;
    }, [route.params.roomId]);

    const navTitle = useMemo<string>(() => {
        return previousRoomInfo ? "세입자 정보 수정" : "세입자 정보 추가";
    }, [previousRoomInfo]);

    const screenTitle = useMemo<string>(() => {
        return previousRoomInfo ? "세입자 정보 수정하기" : "세입자 정보 추가하기";
    }, [previousRoomInfo]);

    const screenSubtitle = useMemo<string>(() => {
        return previousRoomInfo
            ? "세입자 정보를 수정하고 확인을 눌러주세요."
            : "세입자 정보를 설정하고 확인을 눌러주세요.";
    }, [previousRoomInfo]);

    const [alert, setAlert] = useState<StardustAlertContent>({
        visible: false,
        type: "warning",
        title: "입력된 비용이 없습니다.",
        message: "그래도 등록을 진행 하시겠습니까?",
        buttons: [
            {
                text: "취소",
                onPress: () => candleAlert(),
            },
            {
                text: "확인",
                onPress: () => registerContract(),
            },
        ],
    });

    useEffect(() => {
        if (contract === null) return;

        switch (contract) {
            case "lump-sum-deposit":
                setMoneys({
                    deposit: moneys.deposit,
                    managementFee: moneys.managementFee,
                });
                break;
            case "monthly-rent":
                setMoneys({
                    monthlyRent: {
                        text: "월세",
                        value: 0,
                    },
                    managementFee: {
                        text: "관리비",
                        value: 0,
                    },
                    deposit: {
                        text: "보증금",
                        value: 0,
                    },
                });
                break;
            default:
                setMoneys({
                    monthlyRent: {
                        text: "월세",
                        value: 0,
                    },
                    managementFee: {
                        text: "관리비",
                        value: 0,
                    },
                    deposit: {
                        text: "보증금",
                        value: 0,
                    },
                });
                break;
        }
    }, [contract, previousRoomInfo]);

    const candleAlert = () => {
        setAlert({
            ...alert,
            visible: false,
        });
    };

    const registerContract = async () => {
        // 이런 경우는 없지만 타입 내로잉을 위해 작성함
        if (
            tenantInfo.name === null ||
            tenantInfo.phoneNumber === null ||
            contract === null ||
            dates === null ||
            lateFeeRate === null
        ) {
            return;
        }

        if (viewModel === null) {
            VillifeToastMessage.showBottomToast("error", "예기치 않은 오류가 발생했어요.");
            candleAlert();
            return;
        }

        let isSuccessful: boolean = false;
        const params: Villife.Contract.CreateForm = {
            autoMfBilling: true,
            contractorName: tenantInfo.name,
            delinquencyRate: lateFeeRate,
            deposit: moneys.deposit.value,
            monthlyRent: moneys.monthlyRent?.value ?? 0,
            managementFee: moneys.managementFee.value,
            roomId: route.params.roomId,
            startDate: StardustDateParser.serialize(dates.startDate),
            expirationDate: StardustDateParser.serialize(dates.endDate),
            rentType: contract,
            phoneNumber: tenantInfo.phoneNumber,
            isPrePaidMr: paymentMethod ?? true,
        };

        if (previousRoomInfo) {
            isSuccessful = await viewModel.updateContract({
                contractId: previousRoomInfo.contractId,
                ...params,
            });
        } else {
            isSuccessful = await viewModel.createContract(params);
        }

        setAlert({
            ...alert,
            visible: false,
        });

        if (isSuccessful) {
            VillifeToastMessage.showBottomToast(
                "success",
                `정상적으로 ${previousRoomInfo ? "수정" : "등록"} 되었습니다.`
            );
            navigation.pop();
        } else {
            VillifeToastMessage.showBottomToast(
                "error",
                `${previousRoomInfo ? "수정" : "등록"}하지 못했습니다. 잠시 후 다시 시도해주세요.`
            );
        }
    };

    const isPrepared = (): boolean => {
        return (
            tenantInfo.name !== null &&
            tenantInfo.phoneNumber !== null &&
            contract !== null &&
            dates !== null &&
            lateFeeRate !== null
        );
    };

    const handlePressOkayButton = () => {
        if (moneys.monthlyRent) {
            if (moneys.deposit.value === 0 && moneys.managementFee.value === 0 && moneys.monthlyRent.value === 0) {
                setAlert({
                    ...alert,
                    visible: true,
                    title: "입력된 비용이 없습니다.",
                    message: "그래도 등록을 진행 하시겠습니까?",
                    buttons: [
                        {
                            text: "취소",
                            onPress: () => candleAlert(),
                        },
                        {
                            text: "확인",
                            onPress: () => registerContract(),
                        },
                    ],
                });

                return;
            }
        }

        setAlert({
            ...alert,
            visible: true,
            title: "정말로 등록하시겠습니까?",
            message: "자동 납부 서비스를 이용할 경우,\n등록된 정보를 기반으로 서비스 됩니다.",
            buttons: [
                {
                    text: "취소",
                    onPress: () => candleAlert(),
                },
                {
                    text: "확인",
                    onPress: () => registerContract(),
                },
            ],
        });
    };

    return (
        <NavigationView
            headerOptions={{
                title: navTitle,
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
                hideBuidingSelector: true,
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <StardustAlert {...alert} setAlert={setAlert} />
            <ScreenTitleView
                titles={[screenTitle]}
                subtitles={[screenSubtitle]}
                bottomButton={{
                    title: messages.words.okay,
                    disabled: !isPrepared(),
                    onPress: () => handlePressOkayButton(),
                }}
                disablePaddingTop>
                <KeyboardAwareScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    <TenantInfoInput
                        styles={styles}
                        initialInfo={
                            previousRoomInfo
                                ? {
                                      name: previousRoomInfo.contractorName,
                                      phoneNumber: previousRoomInfo.phoneNumber,
                                  }
                                : undefined
                        }
                        onChangeInfo={setTenantInfo}
                    />

                    <Contract
                        styles={styles}
                        initialRentType={previousRoomInfo ? previousRoomInfo.rentType : undefined}
                        onChangeInfo={setContract}
                    />

                    {contract === "lump-sum-deposit" && (
                        <>
                            {Object.keys(moneys).map((moneyType, index) => {
                                let initialMoney: number | undefined = undefined;

                                if (previousRoomInfo) {
                                    switch (moneyType) {
                                        case "managementFee":
                                            initialMoney = previousRoomInfo.managementFee;
                                            break;

                                        case "deposit":
                                            initialMoney = previousRoomInfo.deposit;
                                            break;
                                    }
                                }
                                return (
                                    <Money
                                        key={index}
                                        styles={styles}
                                        initialMoney={initialMoney}
                                        title={moneys[moneyType as keyof MoneyTypes]?.text ?? ""}
                                        onChangeInfo={(money) =>
                                            setMoneys({
                                                ...moneys,
                                                [moneyType]: {
                                                    ...moneys[moneyType as keyof MoneyTypes],
                                                    value: money,
                                                },
                                            })
                                        }
                                    />
                                );
                            })}
                            <LateFeeRate
                                styles={styles}
                                initialRate={previousRoomInfo ? previousRoomInfo.delinquencyRate : undefined}
                                onChangeInfo={setLateFeeRate}
                            />
                            <ContractDateRange
                                styles={styles}
                                initialDate={
                                    previousRoomInfo
                                        ? {
                                              startDate: previousRoomInfo.startDate,
                                              expirationDate: previousRoomInfo.expirationDate,
                                          }
                                        : undefined
                                }
                                onChangeInfo={setDates}
                            />
                        </>
                    )}
                    {contract === "monthly-rent" && (
                        <>
                            <PaymentMethod
                                styles={styles}
                                initialPaymentMethodType={previousRoomInfo ? previousRoomInfo.isPrePaidMr : undefined}
                                onChangeInfo={setPaymentMethod}
                            />
                            {Object.keys(moneys).map((moneyType, index) => {
                                let initialMoney: number | undefined = undefined;

                                if (previousRoomInfo) {
                                    switch (moneyType) {
                                        case "managementFee":
                                            initialMoney = previousRoomInfo.managementFee;
                                            break;

                                        case "monthlyRent":
                                            initialMoney = previousRoomInfo.monthlyRent;
                                            break;

                                        case "deposit":
                                            initialMoney = previousRoomInfo.deposit;
                                            break;
                                    }
                                }

                                return (
                                    <Money
                                        key={index}
                                        styles={styles}
                                        initialMoney={initialMoney}
                                        title={moneys[moneyType as keyof MoneyTypes]?.text ?? ""}
                                        onChangeInfo={(money) =>
                                            setMoneys({
                                                ...moneys,
                                                [moneyType]: {
                                                    ...moneys[moneyType as keyof MoneyTypes],
                                                    value: money,
                                                },
                                            })
                                        }
                                    />
                                );
                            })}
                            <LateFeeRate
                                styles={styles}
                                initialRate={previousRoomInfo ? previousRoomInfo.delinquencyRate : undefined}
                                onChangeInfo={setLateFeeRate}
                            />
                            <ContractDateRange
                                styles={styles}
                                initialDate={
                                    previousRoomInfo
                                        ? {
                                              startDate: previousRoomInfo.startDate,
                                              expirationDate: previousRoomInfo.expirationDate,
                                          }
                                        : undefined
                                }
                                onChangeInfo={setDates}
                            />
                        </>
                    )}
                </KeyboardAwareScrollView>
            </ScreenTitleView>
        </NavigationView>
    );
}
