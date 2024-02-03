import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSlidableModal from "../../../../../../../../../../common/blocks/universial/slidemodal_bottom";
import StardustModal from "../../../../../../../../../../common/blocks/universial/stardust_modal";
import { BankAccountSetModalProps } from "./types";
import useStyler from "../../../../../../../../../../common/hooks/styler/hooks";
import { useEffect, useState } from "react";
import UniversalTextInput from "../../../../../../../../../../common/blocks/universial/textinput";
import { BankAccountType } from "../../types";
import StringValidator from "../../../../../../../../../../../libs/string_validator";

export default function BankAccountSetModal(props: BankAccountSetModalProps) {
    const styles = useBankSelectModalStyles();
    const validator = new StringValidator();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [account, setAccount] = useState<BankAccountType | null>(null);

    useEffect(() => {
        if (account === null) return;

        props.setVisible(false);
        setModalVisible(true);
    }, [account]);

    const getBankChunk = (data: string[], size = 1) => {
        const arr = [];

        for (let i = 0; i < data.length; i += size) {
            arr.push(data.slice(i, i + size));
        }

        return arr;
    };

    const isDone = (): boolean => {
        if (account === null) return false;

        if (account.accountNumber.length < 10) return false;
        if (account.accountNumber.length > 25) return false;
        if (account.ownerName.length < 2) return false;
        if (account.ownerName.length > 7) return false;
        return true;
    };

    return (
        <>
            <BottomSlidableModal
                height={styles.container.height}
                modalVisible={props.visible}
                setModalVisible={props.setVisible}>
                <ScrollView style={styles.scroll}>
                    {getBankChunk(bankList, 2).map((bankChunk, index) => (
                        <View style={styles.row} key={index}>
                            <TouchableOpacity
                                style={styles.halfRow}
                                activeOpacity={0.6}
                                onPress={() =>
                                    setAccount({
                                        bankName: bankChunk[0],
                                        accountNumber: "",
                                        accountType: "관리비",
                                        ownerName: "",
                                    })
                                }>
                                <Text style={styles.rowText}>{bankChunk[0]}</Text>
                            </TouchableOpacity>
                            {bankChunk.length === 2 && (
                                <TouchableOpacity
                                    style={styles.halfRow}
                                    activeOpacity={0.6}
                                    onPress={() =>
                                        setAccount({
                                            bankName: bankChunk[1],
                                            accountNumber: "",
                                            accountType: "관리비",
                                            ownerName: "",
                                        })
                                    }>
                                    <Text style={styles.rowText}>{bankChunk[1]}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </ScrollView>
            </BottomSlidableModal>
            <StardustModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title="계좌정보 입력"
                subtitle="계좌정보를 알맞게 입력해주세요."
                buttons={[
                    {
                        text: "취소",
                        color: styles.accountModalCancelBtn.backgroundColor,
                        textColor: styles.accountModalCancelBtn.color,
                        onPress: () => {
                            setModalVisible(false);
                        },
                    },
                    {
                        text: "확인",
                        color: styles.accountModalOkayBtn.backgroundColor,
                        textColor: styles.accountModalOkayBtn.color,
                        disabled: !isDone(),
                        onPress: () => {
                            setModalVisible(false);
                            props.onEnterBankAccountInfo(account as BankAccountType);
                        },
                    },
                ]}>
                <View style={[styles.elementWrapper, styles.elementTitleWrapper]}>
                    <Text style={styles.elementTitle}>은행명</Text>
                </View>
                <View style={styles.elementWrapper}>
                    <Text style={styles.bankName}>{account?.bankName}</Text>
                </View>
                <View style={[styles.elementWrapper, styles.elementTitleWrapper]}>
                    <Text style={styles.elementTitle}>계좌번호</Text>
                </View>
                <View style={[styles.elementWrapper, styles.inputWrapper]}>
                    <UniversalTextInput
                        name="account_number"
                        placeholder="계좌번호를 10글자 이상 입력해주세요. ('-' 포함)"
                        placeholderTextColor={styles.inputPlaceholder.color}
                        value={account?.accountNumber}
                        onChangeText={(text, name) => {
                            let _text = text.replace(/-/g, "");

                            if (account !== null && (text === "" || validator.isNumber(_text))) {
                                setAccount({
                                    ...account,
                                    [name as string]: text,
                                });
                            }
                        }}
                    />
                </View>
                <View style={[styles.elementWrapper, styles.elementTitleWrapper]}>
                    <Text style={styles.elementTitle}>예금주</Text>
                </View>
                <View style={[styles.elementWrapper, styles.inputWrapper]}>
                    <UniversalTextInput
                        name="owner_name"
                        placeholder="입금자명을 2 ~ 7글자로 입력해주세요."
                        placeholderTextColor={styles.inputPlaceholder.color}
                        value={account?.ownerName}
                        onChangeText={(text, name) => {
                            if (account !== null && !validator.hasSpecialChar(text) && !validator.hasAlpha(text)) {
                                setAccount({
                                    ...account,
                                    [name as string]: text,
                                });
                            }
                        }}
                    />
                </View>
                <View style={styles.dummy} />
            </StardustModal>
        </>
    );
}

function useBankSelectModalStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            height: deviceUI.getScreenSize().height * 0.5,
        },
        scroll: {
            width: "100%",
            height: "100%",
            paddingVertical: deviceUI.moderateScale(10),
        },
        row: {
            width: "100%",
            flexDirection: "row",
        },
        halfRow: {
            width: "50%",
            paddingLeft: deviceUI.moderateScale(30),
            paddingVertical: deviceUI.moderateScale(10),
        },
        rowText: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(16),
        },
        accountModalCancelBtn: {
            backgroundColor: theme.color.series.grey.level1,
            color: theme.color.specified.black,
        },
        accountModalOkayBtn: {
            backgroundColor: theme.color.specified.blue,
            color: theme.color.specified.white,
        },
        elementTitleWrapper: {
            width: "100%",
            //paddingVertical: deviceUI.moderateScale(10),
            marginTop: deviceUI.moderateScale(10),
            marginBottom: deviceUI.moderateScale(5),
        },
        elementTitle: {
            color: theme.color.specified.blue,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
        },
        elementWrapper: {
            width: "100%",
            paddingHorizontal: deviceUI.moderateScale(15),
        },
        bankName: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(14),
            marginBottom: deviceUI.moderateScale(10),
        },
        inputWrapper: {
            height: deviceUI.getScreenSize().height * 0.035,
        },
        inputPlaceholder: {
            color: theme.color.series.grey.level4,
        },
        dummy: {
            marginBottom: deviceUI.moderateScale(10),
        },
    });
}

const bankList = [
    "NH농협은행",
    "SC제일은행",
    "국민은행",
    "수협은행",
    "신한은행",
    "신협",
    "우리은행",
    "새마을금고",
    "카카오뱅크",
    "케이뱅크",
    "토스뱅크",
    "하나은행",
    "한국은행",
    "한국씨티은행",
];
