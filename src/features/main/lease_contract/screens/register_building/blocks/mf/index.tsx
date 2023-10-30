import { Text, View } from "react-native";
import { MFDataSetterProps, SelectedMFDay } from "./types";
import { useEffect, useState } from "react";
import useMFDataSetterStyles from "./styles";
import MFDaySetter from "./blocks/date";
import BankAccountSetter from "./blocks/bank";
import { BankAccountType } from "./blocks/bank/types";

export default function MFDataSetter(props: MFDataSetterProps) {
    const styles = useMFDataSetterStyles();
    const [mfdays, setMFDays] = useState<SelectedMFDay>({
        notiDay: {
            name: "고지일",
            explanation: "매월",
            day: null,
        },
        dueDay: {
            name: "마감일",
            explanation: "고지일로부터",
            day: null,
        },
    });
    const [bankAccounts, setBankAccounts] = useState<BankAccountType[]>([]);

    useEffect(() => {
        if (mfdays.dueDay.day === null && mfdays.notiDay.day === null) return;

        props.onChangeMFData({
            dueDay: mfdays.dueDay.day,
            notiDay: mfdays.notiDay.day,
            bankAccounts,
        });
    }, [mfdays, bankAccounts]);

    return (
        <View style={styles.main.container}>
            <View style={styles.main.titleBox}>
                <Text style={styles.main.title}>관리비 정보 설정</Text>
            </View>
            <View style={styles.main.wrapper}>
                {Object.keys(mfdays).map((k, i) => {
                    const mfday = k === "notiDay" ? mfdays.notiDay : mfdays.dueDay;

                    return (
                        <MFDaySetter
                            key={i}
                            initialDay={mfday.day}
                            dayName={mfday.name}
                            styles={styles}
                            explanation={mfday.explanation}
                            onChangeMFDay={(num) => {
                                setMFDays({
                                    ...mfdays,
                                    [k]: {
                                        ...mfday,
                                        day: num,
                                    },
                                });
                            }}
                        />
                    );
                })}
                <BankAccountSetter styles={styles} onEnterBankAccounts={setBankAccounts} />
            </View>
        </View>
    );
}
