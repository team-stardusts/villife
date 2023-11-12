import { useEffect, useState } from "react";
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
import useBuildingRoomContractor from "../../services/building_rooms";
import TenantInfoInput from "./blocks/tenant_info";
import LateFeeRate from "./blocks/latefee";
import { RegisterContract } from "../../services/building_rooms/provider/types";

export default function TenantSettingScreen({ navigation, route }: TenantSettingScreenProps) {
    const styles = useTenantSettingScreenStyles();
    const messages = useScreenMessage().messages;
    const contractor = useBuildingRoomContractor();
    const navTitle = route.params?.previous ? "세입자 정보 수정" : "세입자 정보 추가";
    const screenTitle = route.params?.previous ? "세입자 정보 수정하기" : "세입자 정보 추가하기";
    const screenSubtitle = route.params?.previous
        ? "세입자 정보를 수정하고 확인을 눌러주세요."
        : "세입자 정보를 설정하고 확인을 눌러주세요.";

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
    const [tenantInfo, setTenantInfo] = useState<TenantInfo>({
        name: null,
        phoneNumber: null,
    });
    const [contract, setContract] = useState<Building.RentType | null>(null);
    const [dates, setDates] = useState<Dates | null>(null);
    const [lateFeeRate, setLateFeeRate] = useState<number | null>(null);
    const [moneys, setMoneys] = useState<MoneyTypes>({
        managementFee: {
            text: "관리비",
            value: 0,
        },
        monthlyRent: {
            text: "월세",
            value: 0,
        },
        deposit: {
            text: "보증금",
            value: 0,
        },
    });

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

        let isSuccessful: boolean = false;
        const params: RegisterContract.Params = {
            autoMFBilling: true,
            contractorName: tenantInfo.name,
            delinquencyRate: lateFeeRate,
            deposit: moneys.deposit.value,
            monthlyRent: moneys.monthlyRent.value,
            managementFee: moneys.managementFee.value,
            roomId: route.params.roomID,
            startDate: dates.startDate,
            expirationDate: dates.endDate,
            rentType: contract,
            phoneNumber: tenantInfo.phoneNumber,
        };

        if (route.params.previous) {
            isSuccessful = await contractor.modifyContract({
                ...params,
                contractID: route.params.previous.contractID,
            });
        } else {
            isSuccessful = await contractor.registerContract(params);
        }

        setAlert({
            ...alert,
            visible: false,
        });

        if (isSuccessful) {
            VillifeToastMessage.showBottomToast(
                "success",
                `정상적으로 ${route.params?.previous ? "수정" : "등록"} 되었습니다.`
            );
            navigation.pop();
        } else {
            VillifeToastMessage.showBottomToast(
                "error",
                `${route.params?.previous ? "수정" : "등록"}하지 못했습니다. 잠시 후 다시 시도해주세요.`
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
                            route.params.previous
                                ? {
                                      name: route.params.previous.contractorName,
                                      phoneNumber: route.params.previous.phoneNumber,
                                  }
                                : undefined
                        }
                        onChangeInfo={setTenantInfo}
                    />
                    <Contract
                        styles={styles}
                        initialRentType={route.params.previous ? route.params.previous.rentType : undefined}
                        onChangeInfo={setContract}
                    />
                    {Object.keys(moneys).map((moneyType, index) => {
                        let initialMoney: number | undefined = undefined;

                        if (route.params.previous) {
                            switch (moneyType) {
                                case "managementFee":
                                    initialMoney = route.params.previous.managementFee;
                                    break;

                                case "monthlyRent":
                                    initialMoney = route.params.previous.monthlyRent;
                                    break;

                                case "deposit":
                                    initialMoney = route.params.previous.deposit;
                                    break;
                            }
                        }

                        return (
                            <Money
                                key={index}
                                styles={styles}
                                initialMoney={initialMoney}
                                title={moneys[moneyType as keyof MoneyTypes].text}
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
                        initialRate={route.params.previous ? route.params.previous.delinquencyRate : undefined}
                        onChangeInfo={setLateFeeRate}
                    />
                    <ContractDateRange
                        styles={styles}
                        initialDate={
                            route.params.previous
                                ? {
                                      startDate: new Date(JSON.parse(route.params.previous.startDate)),
                                      expirationDate: new Date(JSON.parse(route.params.previous.expirationDate)),
                                  }
                                : undefined
                        }
                        onChangeInfo={setDates}
                    />
                </KeyboardAwareScrollView>
            </ScreenTitleView>
        </NavigationView>
    );
}
