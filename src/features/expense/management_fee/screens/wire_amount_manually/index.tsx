import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import ScreenTitleView from "../../../../common/blocks/title_view";
import useWireAmountManuallyStyles from "./styles";
import WireAmountManuallyScreenProps from "./types";
import useManagementFeeManager from "../../services/payment";
import { UserPaymentManagerBase } from "../../services/payment/types";
import { useEffect, useState } from "react";
import { insertCommaToNumber } from "../../../../common/global_function";
import { Building } from "../../../../../libs/rest_apis/villife/building/types";
import useStyler from "../../../../common/hooks/styler/hooks";
import Icon from "../../../../common/atoms/icon";
import VillifeToastMessage from "../../../../common/atoms/toast";

export default function WireAmountManually(props: WireAmountManuallyScreenProps) {
    const styles = useWireAmountManuallyStyles();
    const manager: UserPaymentManagerBase = useManagementFeeManager() as UserPaymentManagerBase;
    const [buildingName, setBuildingName] = useState<string>("");
    const [unpaidFee, setUnpaidFee] = useState<number>(0);
    const [billIDs, setBillIDs] = useState<number[]>([]);
    const [bankAccounts, setBankAccounts] = useState<Building.BuildingBankAccountInfo[]>([]);

    useEffect(() => {
        manager.getBuildingDetailInfo().then((r) => {
            if (r?.building_name !== undefined) setBuildingName(r.building_name);
            if (r?.bank_accounts !== undefined) setBankAccounts(r.bank_accounts);
        });
    }, []);

    useEffect(() => {
        let _unpaidFee = 0;
        let _billIDs: number[] = [];

        manager.history.forEach((v) => {
            if (!v.is_paid) {
                _unpaidFee += v.amount_won;
                _unpaidFee += v.overdue_interest;
                _billIDs.push(v.bill_id);
            }
        });

        setUnpaidFee(_unpaidFee);
        setBillIDs([..._billIDs]);
    }, [manager.history]);

    return (
        <NavigationView
            headerOptions={{
                title: "이체하기",
                hideBuidingSelector: true,
                style: {
                    borderBottomColor: styles.navContainer.backgroundColor,
                    backgroundColor: styles.navContainer.backgroundColor,
                },
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
                backgroundColor: styles.navContainer.backgroundColor,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <ScreenTitleView
                titles={["관리비 이체하기"]}
                subtitles={[
                    `우리 건물은 ${bankAccounts.length}개의 은행 계좌를 보유하고 있어요.`,
                    "계좌이체 하실 때 예금주명에",
                    "살고 계신 호수 입력을 부탁드릴게요.",
                    "",
                    "이체가 완료되면 꼭 입금 확인 요청 부탁드려요!",
                ]}
                disablePaddingTop>
                <View style={styles.container}>
                    <View style={styles.billContainer}>
                        <View style={styles.residenceInfoBox}>
                            <Text style={styles.residenceInfo}>
                                {buildingName} {manager.user?.roomNumber}호
                            </Text>
                        </View>
                        <View style={styles.paymentContainer}>
                            <View style={styles.amountBox}>
                                <Text style={styles.amount}>{insertCommaToNumber(unpaidFee)} 원</Text>
                            </View>
                            {/* <TouchableOpacity
                                style={styles.detailBtn}
                                activeOpacity={0.6}
                                onPress={() => {
                                    VillifeToastMessage.showBottomToast("info", "죄송합니다. 아직 준비되지 않았어요.");
                                }}>
                                <Text style={styles.detailBtnText}>상세내역</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    <View style={styles.bankListContainer}>
                        <View style={styles.headerBox}>
                            <Text style={styles.header}>납부은행</Text>
                        </View>
                        <ScrollView style={styles.scroll}>
                            {bankAccounts.map((account, index) => (
                                <BackInfoBox
                                    key={index}
                                    accountID={account.account_id}
                                    accountHolder={account.owner_name}
                                    accountNumber={account.account_number}
                                    backName={account.bank_name}
                                    onPressWireAmount={(accountID) => {
                                        props.navigation.navigate("request_payment_confirmation", {
                                            amountWon: unpaidFee,
                                            accountID: accountID,
                                            billIDs: billIDs,
                                        });
                                    }}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScreenTitleView>
        </NavigationView>
    );
}

function BackInfoBox(props: BackInfoBoxProps) {
    const { deviceUI, theme } = useStyler();

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            width: "100%",
            marginBottom: deviceUI.moderateScale(15),
        },
        iconBox: {
            flex: 1.5,
            alignItems: "flex-end",
            justifyContent: "center",
        },
        accountBox: {
            flex: 5.5,
            paddingLeft: deviceUI.moderateScale(20),
        },
        btnBox: {
            flex: 3,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
        },
        icon: {
            width: deviceUI.moderateScale(60),
            color: theme.color.specified.black,
        },
        accountInfo: {
            paddingBottom: deviceUI.moderateScale(5),
        },
        name: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(14),
        },
        accountNumber: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(18),
        },
        btn: {
            paddingVertical: deviceUI.moderateScale(4),
            paddingHorizontal: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.color.series.grey.level1,
            borderRadius: deviceUI.moderateScale(10),
        },
        btnText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(13),
        },
    });
    return (
        <View style={styles.container}>
            <View style={styles.iconBox}>
                <Icon name="charactor-book" size={styles.icon.width} color={styles.icon.color} />
            </View>
            <View style={styles.accountBox}>
                <View style={styles.accountInfo}>
                    <Text style={styles.name}>{props.backName}</Text>
                </View>
                <View style={styles.accountInfo}>
                    <Text style={styles.accountNumber} adjustsFontSizeToFit numberOfLines={1}>
                        {props.accountNumber}
                    </Text>
                </View>
                <View style={styles.accountInfo}>
                    <Text style={styles.name}>{props.accountHolder}</Text>
                </View>
            </View>
            <View style={styles.btnBox}>
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.6}
                    onPress={() => props.onPressWireAmount(props.accountID)}>
                    <Text style={styles.btnText}>이체하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

type BackInfoBoxProps = {
    backName: Building.BuildingBankAccountInfo["bank_name"];
    accountID: Building.BuildingBankAccountInfo["account_id"];
    accountHolder: Building.BuildingBankAccountInfo["owner_name"];
    accountNumber: Building.BuildingBankAccountInfo["account_number"];
    onPressWireAmount(accountID: number): void;
};
