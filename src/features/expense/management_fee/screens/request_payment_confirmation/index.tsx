import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import ScreenTitleView from "../../../../common/blocks/title_view";
import useRequestPaymentConfirmationStyles from "./styles";
import RequestPaymentConfirmationScreenProps, { AccountInfoProps } from "./types";
import useManagementFeeManager from "../../services/payment";
import { UserPaymentManagerBase } from "../../services/payment/types";
import { useEffect, useState } from "react";
import { insertCommaToNumber } from "../../../../common/global_function";
import { Building } from "../../../../../libs/rest_apis/villife/building/types";
import Icon from "../../../../common/atoms/icon";
import Clipboard from "@react-native-clipboard/clipboard";
import VillifeToastMessage from "../../../../common/atoms/toast";

export default function RequestPaymentConfirmationScreen(props: RequestPaymentConfirmationScreenProps) {
    const styles = useRequestPaymentConfirmationStyles();
    const manager: UserPaymentManagerBase = useManagementFeeManager() as UserPaymentManagerBase;
    const [bankAccount, setBankAccount] = useState<Building.BuildingBackAccountInfo | null>(null);

    useEffect(() => {
        manager.getBuildingDetailInfo().then((r) => {
            let _bankAccount;

            if (r?.bank_accounts !== undefined) {
                _bankAccount = r.bank_accounts.find((v) => v.account_id === props.route.params.accountID);
            }

            if (_bankAccount)
                setBankAccount({
                    ..._bankAccount,
                });
        });
    }, []);

    const requestApproval = async () => {
        // [TO-DO] Amount가 0원일때에 대한 예외처리 필요
        const result = await manager.requestMFPaymentConfirmation({
            amountWon: props.route.params.amountWon === 0 ? 1000 : props.route.params.amountWon,
            billIDs: props.route.params.billIDs,
            sender: manager.user?.roomNumber.toString() || "TEST",
        });

        VillifeToastMessage.showBottomToast(
            result ? "success" : "error",
            result ? "확인 요청을 전송했어요." : "요청이 전송되지 않았어요. 잠시후 다시 시도해주세요."
        );

        props.navigation.canGoBack() && props.navigation.goBack();
    };

    return (
        <>
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
                        onPress: () => requestApproval(),
                    }}
                    disablePaddingTop>
                    <ScrollView style={styles.container}>
                        <AccountInfo styles={styles} rowKey="은행명" rowValue={bankAccount?.bank_name} />
                        <AccountInfo
                            styles={styles}
                            rowKey="계좌번호"
                            rowValue={bankAccount?.account_number}
                            copyable
                        />
                        <AccountInfo styles={styles} rowKey="예금주" rowValue={bankAccount?.owner_name} />
                        <AccountInfo
                            styles={styles}
                            rowKey="관리비"
                            rowValue={insertCommaToNumber(props.route.params.amountWon)}
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
            <Text style={props.styles.rowValue} adjustsFontSizeToFit numberOfLines={1}>
                {props.rowValue}
            </Text>
            {props.copyable && props.rowValue && (
                <TouchableOpacity
                    style={props.styles.iconBtn}
                    activeOpacity={0.6}
                    onPress={() => {
                        copyToClipboard(props.rowValue as string);
                    }}>
                    <Icon name="copy" size={props.styles.icon.width} color={props.styles.icon.color} />
                </TouchableOpacity>
            )}
        </View>
    );
}
