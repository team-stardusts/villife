import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BankInfoBoxProps } from "./types";
import useStyler from "../../../../../../hooks/styler/hooks";
import Icon from "../../../../../../atoms/icon";

export default function BankInfoBox(props: BankInfoBoxProps) {
    const { deviceUI, theme } = useStyler();

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            width: "100%",
            paddingLeft: deviceUI.moderateScale(10),
            marginBottom: deviceUI.moderateScale(15),
        },
        iconBox: {
            alignItems: "flex-end",
            justifyContent: "center",
        },
        accountBox: {
            paddingLeft: deviceUI.moderateScale(20),
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
            fontFamily: theme.font.fontFamily.pretendard.medium,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(17),
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
                    <Text style={styles.name}>{props.bankName}</Text>
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
        </View>
    );
}
