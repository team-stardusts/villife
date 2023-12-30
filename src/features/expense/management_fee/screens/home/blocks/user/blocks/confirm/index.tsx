import { Text, TouchableOpacity, View } from "react-native";
import ContentBox from "../../../../../../../../common/blocks/content_box";
import useManagementFeePaymentConfirmBoxStyles from "./styles";
import useRenterMFViewModel from "../../../../../../viewmodel/renter";
import { useEffect, useMemo, useState } from "react";
import Villife from "../../../../../../../../../libs/villife-client/types";
import Clipboard from "@react-native-clipboard/clipboard";
import VillifeToastMessage from "../../../../../../../../common/atoms/toast";
import { AccountInfoProps, ManagementFeePaymentConfirmBoxProps } from "./types";
import Icon from "../../../../../../../../common/atoms/icon";
import { insertCommaToNumber } from "../../../../../../../../common/global_function";
import PaymentInfoInputModal from "./confirm-modal";

export default function ManagementFeePaymentConfirmBox(props: ManagementFeePaymentConfirmBoxProps) {
    const styles = useManagementFeePaymentConfirmBoxStyles();
    const viewModel = useRenterMFViewModel();
    const [account, setAccount] = useState<Villife.Contract.BankAccount | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        viewModel.getBuildingInfo().then((building) => {
            if (building === null || building.bankAccounts.length === 0) {
                setAccount(null);
                return;
            }

            setAccount({
                ...building.bankAccounts[0],
            });
        });
    }, []);

    const onPressConfirmPaymentBtn = () => {};

    return (
        <>
            {props.bill.feeToPay > 0 && (
                <PaymentInfoInputModal bill={props.bill} visible={modalVisible} setVisible={setModalVisible} />
            )}
            <View style={styles.container}>
                <ContentBox backgroundColor={styles.contentBox.color} enableShadow={false}>
                    <View style={styles.contentWrapper}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>관리비 납부 계좌 정보</Text>
                        </View>
                        <View style={styles.body}>
                            {account !== null && (
                                <>
                                    <AccountInfo styles={styles} rowKey="은행명" rowValue={account.bankName} />
                                    <AccountInfo
                                        styles={styles}
                                        rowKey="계좌번호"
                                        rowValue={account.accountNumber}
                                        copyable
                                    />
                                    <AccountInfo styles={styles} rowKey="예금주" rowValue={account.ownerName} />
                                    <AccountInfo
                                        styles={styles}
                                        rowKey="받는 분 통장 표시"
                                        rowValue={viewModel.user?.roomNumber.toString()}
                                        copyable
                                    />
                                    <AccountInfo
                                        styles={styles}
                                        rowKey="관리비"
                                        rowValue={insertCommaToNumber(props.bill.feeToPay) + " 원"}
                                        rowRealValue={props.bill.feeToPay.toString()}
                                        copyable
                                    />
                                </>
                            )}
                        </View>
                        {props.bill.feeToPay && props.billCreatedAt && (
                            <View style={styles.footer}>
                                <Text
                                    style={styles.confirmationShortCutQuestionText}
                                    adjustsFontSizeToFit
                                    numberOfLines={1}>
                                    {props.billCreatedAt.getMonth() + 1}월 관리비를 이미 납부 하셨나요?
                                </Text>
                                <TouchableOpacity
                                    style={styles.confirmationShortCutBtn}
                                    onPress={() => setModalVisible(true)}>
                                    <Text style={styles.confirmationShortCutBtnText}>납부확인요청</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </ContentBox>
            </View>
        </>
    );
}

function AccountInfo(props: AccountInfoProps) {
    const copyToClipboard = (str: string) => {
        Clipboard.setString(str);
        VillifeToastMessage.showBottomToast("success", `${props.rowKey}를 클립보드에 복사했어요!`);
    };

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
