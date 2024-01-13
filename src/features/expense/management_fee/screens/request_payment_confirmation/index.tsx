import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import ScreenTitleView from "../../../../common/blocks/title_view";
import useRequestPaymentConfirmationStyles from "./styles";
import RequestPaymentConfirmationScreenProps, { AccountInfoProps } from "./types";
import { useEffect, useState } from "react";
import { insertCommaToNumber } from "../../../../common/global_function";
import Icon from "../../../../common/atoms/icon";
import Clipboard from "@react-native-clipboard/clipboard";
import VillifeToastMessage from "../../../../common/atoms/toast";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import useRenterMFViewModel from "../../viewmodel/renter";
import { Villife } from "@team-stardusts/villife-client";

export default function RequestPaymentConfirmationScreen(props: RequestPaymentConfirmationScreenProps) {
    const styles = useRequestPaymentConfirmationStyles();
    const viewModel = useRenterMFViewModel();
    const [bankAccount, setBankAccount] = useState<Villife.Contract.BankAccount | null>(null);
    const [alert, setAlert] = useState<StardustAlertContent>({
        type: "primary",
        title: "관리비를 이체하셨나요?",
        message: "관리자에게 입금 확인을 요청하겠습니다.",
        visible: false,
    });

    useEffect(() => {
        viewModel.getBuildingInfo().then((r) => {
            let _bankAccount;

            if (r?.bankAccounts !== undefined) {
                _bankAccount = r.bankAccounts.find((v) => v.accountId === props.route.params.accountID);
            }

            if (_bankAccount)
                setBankAccount({
                    ..._bankAccount,
                });
        });
    }, []);

    const cancleRequestApproval = () => {
        setAlert({
            ...alert,
            visible: false,
        });
    };

    const requestApproval = async () => {
        // [TO-DO] Amount가 0원일때에 대한 예외처리 필요
        const result = await viewModel.requestPaymentConfirmation({
            amountWon: props.route.params.amountWon === 0 ? 1000 : props.route.params.amountWon,
            billIds: props.route.params.billIDs,
            depositorName: viewModel.user?.roomNumber.toString(),
        });

        VillifeToastMessage.showBottomToast(
            result ? "success" : "error",
            result ? "확인 요청을 전송했어요." : "요청이 전송되지 않았어요. 잠시후 다시 시도해주세요."
        );

        if (result) {
            props.navigation.reset({
                index: 0,
                routes: [
                    {
                        name: "management_fee",
                    },
                ],
            });
        }
    };

    return (
        <>
            <StardustAlert {...alert} setAlert={setAlert} />
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
                        "아래의 계좌에 관리비를 이체해주세요.",
                        "",
                        "이체를 마치시고 앱으로 돌아와서",
                        '하단의 "납부 확인 요청" 버튼을 눌러주세요.',
                    ]}
                    bottomButton={{
                        title: "납부 확인 요청",
                        onPress: () =>
                            setAlert({
                                ...alert,
                                visible: true,
                                buttons: [
                                    {
                                        text: "취소",
                                        onPress: cancleRequestApproval,
                                    },
                                    {
                                        text: "확인",
                                        onPress: requestApproval,
                                    },
                                ],
                            }),
                    }}
                    disablePaddingTop>
                    <ScrollView style={styles.container}>
                        <AccountInfo styles={styles} rowKey="은행명" rowValue={bankAccount?.bankName} />
                        <AccountInfo styles={styles} rowKey="계좌번호" rowValue={bankAccount?.accountNumber} copyable />
                        <AccountInfo styles={styles} rowKey="예금주" rowValue={bankAccount?.ownerName} />
                        <AccountInfo
                            styles={styles}
                            rowKey="받는 분 통장 표시"
                            rowValue={viewModel.user?.roomNumber.toString()}
                            copyable
                        />
                        <AccountInfo
                            styles={styles}
                            rowKey="관리비"
                            rowValue={insertCommaToNumber(props.route.params.amountWon) + " 원"}
                            rowRealValue={props.route.params.amountWon.toString()}
                            copyable
                        />
                    </ScrollView>
                </ScreenTitleView>
            </NavigationView>
        </>
    );
}

function AccountInfo(props: AccountInfoProps) {
    const copyToClipboard = (str: string) => {
        Clipboard.setString(str);
        VillifeToastMessage.showBottomToast("success", `${props.rowKey}를 클립보드에 복사했어요!`);
    };

    /* 
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();

        if (text === copiedText) {
            VillifeToastMessage.showBottomToast("info", "이미 복사한 텍스트에요.");
            return;
        }

        setCopiedText(text);
    }; */

    return (
        <View style={props.styles.row}>
            <Text style={props.styles.rowKey} adjustsFontSizeToFit numberOfLines={1}>
                {props.rowKey}
            </Text>
            <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                disabled={!(props.copyable && props.rowValue)}
                activeOpacity={0.5}
                onPress={() => {
                    copyToClipboard((props.rowRealValue !== undefined ? props.rowRealValue : props.rowValue) as string);
                }}>
                <Text style={props.styles.rowValue} adjustsFontSizeToFit numberOfLines={1}>
                    {props.rowValue}
                </Text>
                {props.copyable && props.rowValue && (
                    <View style={props.styles.iconBtn}>
                        <Icon name="copy" size={props.styles.icon.width} color={props.styles.icon.color} />
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}
