import { useEffect, useMemo, useState } from "react";
import NavigationView from "../../../../common/blocks/navigation";
import useTenantSettingScreenStyles from "./styles";
import TenantSettingScreenProps, { ScreenTitle, UserProfile, UserContract, MoneyType } from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import ScreenTitleView from "../../../../common/blocks/title_view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Contract from "./blocks/contract";
import Money from "./blocks/money";
import ContractDateRange from "./blocks/contract_date_range";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";
import VillifeToastMessage from "../../../../common/atoms/toast";
import TenantInfoInput from "./blocks/tenant_info";
import useRoomViewModel from "../../viewmodel/room";
import StardustDateParser from "../../../../../libs/date_parser";
import PaymentMethod from "./blocks/payment_method";
import { RoomInfo } from "../../viewmodel/room/states";
import { Villife } from "@team-stardusts/villife-client";
import { View } from "react-native";

export default function TenantSettingScreen({ navigation, route }: TenantSettingScreenProps) {
    const styles = useTenantSettingScreenStyles();
    const messages = useScreenMessage().messages;
    const viewModel = useRoomViewModel();

    // States ===========================================================================
    const [isPrePaidMr, setIsPrePaidMr] = useState<boolean>(true);
    const [profile, setProfile] = useState<UserProfile>({
        name: null,
        phoneNumber: null,
    });
    const [contract, setContract] = useState<UserContract>({
        type: null,
        dates: null,
    });
    const [deposit, setDeposit] = useState<MoneyType>({
        text: "보증금",
        value: 0,
    });
    const [fee, setFee] = useState<MoneyType>({
        text: "관리비",
        value: 0,
    });
    const [monthlyRent, setMonthlyRent] = useState<MoneyType>({
        text: "월세",
        value: 0,
    });

    const [latefeeRate, setLatefeeRate] = useState<MoneyType>({
        text: "연체요율",
        value: 0,
    });

    const previousRoomInfo = useMemo<RoomInfo["contractInfo"] | null>(() => {
        if (viewModel === null) return null;

        const _room = viewModel.data.find((v) => v.roomId === route.params.roomId);

        if (_room?.contractInfo.contractId === 0) {
            return null;
        }

        return _room === undefined ? null : _room.contractInfo;
    }, [route.params.roomId]);

    const title = useMemo<ScreenTitle>(() => {
        if (previousRoomInfo) {
            return {
                nav: "세입자 정보 수정",
                main: "세입자 정보 수정하기",
                sub: "세입자 정보를 수정하고 확인을 눌러주세요.",
            };
        }
        return {
            nav: "세입자 정보 추가",
            main: "세입자 정보 추가하기",
            sub: "세입자 정보를 설정하고 확인을 눌러주세요.",
        };
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
    // ==================================================================================

    /* useEffect(() => {
        console.log(latefeeRate);
    }, [latefeeRate]); */

    useEffect(() => {
        if (contract.type === null) return;

        // 초기값일 경우 previousRoomInfo의 값을 넣음.
        if (fee.value === 0 && previousRoomInfo !== null && previousRoomInfo.managementFee !== 0) {
            setFee({
                ...fee,
                value: previousRoomInfo.managementFee,
            });
        }

        if (deposit.value === 0 && previousRoomInfo !== null && previousRoomInfo.deposit !== 0) {
            setDeposit({
                ...deposit,
                value: previousRoomInfo.deposit,
            });
        }

        if (latefeeRate.value === 0 && previousRoomInfo !== null && previousRoomInfo.delinquencyRate !== 0) {
            setLatefeeRate({
                ...latefeeRate,
                value: previousRoomInfo.delinquencyRate,
            });
        }

        if (
            contract.type === "monthly-rent" &&
            monthlyRent.value === 0 &&
            previousRoomInfo !== null &&
            previousRoomInfo.monthlyRent !== 0
        ) {
            setMonthlyRent({
                ...monthlyRent,
                value: previousRoomInfo.monthlyRent,
            });
        } else {
            setMonthlyRent({
                ...monthlyRent,
                value: 0,
            });
        }
    }, [contract.type, previousRoomInfo]);

    const candleAlert = () => {
        setAlert({
            ...alert,
            visible: false,
        });
    };

    const registerContract = async () => {
        // 이런 경우는 없지만 타입 내로잉을 위해 작성함
        if (
            profile.name === null ||
            profile.phoneNumber === null ||
            contract.type === null ||
            contract.dates === null
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
            contractorName: profile.name,
            delinquencyRate: latefeeRate.value,
            deposit: deposit.value,
            expirationDate: StardustDateParser.serialize(contract.dates.endDate),
            isPrePaidMr: isPrePaidMr,
            monthlyRent: contract.type === "lump-sum-deposit" ? 0 : monthlyRent.value,
            managementFee: fee.value,
            roomId: route.params.roomId,
            rentType: contract.type,
            startDate: StardustDateParser.serialize(contract.dates.startDate),
            phoneNumber: profile.phoneNumber,
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
            contract.type !== null && contract.dates !== null && profile.name !== null && profile.phoneNumber !== null
        );
    };

    const handlePressOkayButton = () => {
        if (deposit.value === 0 && fee.value === 0 && monthlyRent.value === 0 && latefeeRate.value === 0) {
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
                title: title.nav,
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
                titles={[title.main]}
                subtitles={[title.sub]}
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
                        onChangeInfo={(info) => {
                            setProfile({
                                name: info.name,
                                phoneNumber: info.phoneNumber,
                            });
                        }}
                    />
                    <Contract
                        styles={styles}
                        initialRentType={previousRoomInfo ? previousRoomInfo.rentType : undefined}
                        onChangeInfo={(info) => {
                            setContract({
                                ...contract,
                                type: info,
                            });
                        }}
                    />
                    {contract && contract.type === "monthly-rent" && (
                        <PaymentMethod
                            styles={styles}
                            initialPaymentMethodType={previousRoomInfo ? previousRoomInfo.isPrePaidMr : undefined}
                            onChangeInfo={(info) => setIsPrePaidMr(info)}
                        />
                    )}
                    {[monthlyRent, fee, deposit, latefeeRate].map((money, index) => {
                        if (contract.type === "lump-sum-deposit" && money.text === "월세") {
                            return <View key={index} />;
                        }

                        let setter: React.Dispatch<React.SetStateAction<MoneyType>>;

                        switch (money.text) {
                            case "관리비":
                                setter = setFee;
                                break;
                            case "보증금":
                                setter = setDeposit;
                                break;
                            case "연체요율":
                                setter = setLatefeeRate;
                                break;
                            case "월세":
                                setter = setMonthlyRent;
                                break;
                        }

                        return (
                            <Money
                                key={index}
                                styles={styles}
                                initialValue={money.value}
                                title={money.text}
                                unit={money.text === "연체요율" ? "%" : "원"}
                                onChangeInfo={(info) =>
                                    setter({
                                        text: money.text,
                                        value: info,
                                    })
                                }
                            />
                        );
                    })}
                    {contract.type !== null && (
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
                            onChangeInfo={(info) =>
                                setContract({
                                    ...contract,
                                    dates: info,
                                })
                            }
                        />
                    )}
                </KeyboardAwareScrollView>
            </ScreenTitleView>
        </NavigationView>
    );
}
