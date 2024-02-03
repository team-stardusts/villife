import { Text, TouchableOpacity, View } from "react-native";
import { BankAccountSetterProps, BankAccountType } from "./types";
import Icon from "../../../../../../../../common/atoms/icon";
import BankAccountSetModal from "./blocks/account_setter";
import { useEffect, useState } from "react";
import BankInfoBox from "./blocks/account";

export default function BankAccountSetter(props: BankAccountSetterProps) {
    const [bankModalVisible, setBankModalVisible] = useState<boolean>(false);
    const [bankAccounts, setBankAccounts] = useState<BankAccountType[]>([]);

    useEffect(() => {
        if (props.initialValue) {
            setBankAccounts([...props.initialValue]);
        }
    }, [props.initialValue]);

    useEffect(() => {
        props.onEnterBankAccounts(bankAccounts);
    }, [bankAccounts]);

    return (
        <>
            <BankAccountSetModal
                visible={bankModalVisible}
                setVisible={setBankModalVisible}
                onEnterBankAccountInfo={(account) => {
                    setBankAccounts([...bankAccounts, account]);
                }}
            />
            <View style={props.styles.main.row}>
                <View style={props.styles.main.rowTitleWrapper}>
                    <Text style={props.styles.main.rowTitle}>관리비 계좌</Text>
                </View>
                <View style={props.styles.main.rowContentBox}>
                    <TouchableOpacity
                        style={props.styles.bank.additionBtn}
                        activeOpacity={0.6}
                        onPress={() => setBankModalVisible(true)}>
                        <Icon
                            name="plus"
                            size={props.styles.bank.additionIcon.width}
                            color={props.styles.bank.additionIcon.color}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={props.styles.main.row}>
                {bankAccounts.map((account, index) => (
                    <BankInfoBox
                        key={index}
                        bankName={account.bankName}
                        accountNumber={account.accountNumber}
                        accountHolder={account.ownerName}
                        onPressDelete={(accountNumber) => {
                            setBankAccounts([
                                ...bankAccounts.filter((account) => account.accountNumber !== accountNumber),
                            ]);
                        }}
                    />
                ))}
            </View>
        </>
    );
}
