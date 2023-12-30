import { StyleSheet, Text, View } from "react-native";
import { PushMessageLog } from "../viewmodel/types";
import useStyler from "../../../../../common/hooks/styler/hooks";
import Icon from "../../../../../common/atoms/icon";
import { useMemo } from "react";
import { IconSeries } from "../../../../../common/atoms/icon/types";
import SpinningWon from "../../../../../expense/management_fee/blocks/icon/spinning_won";

export default function Notification(props: NotificationProps) {
    const styles = useNotificationStyles();
    const iconName = useMemo<NotificationIcons>(() => {
        if (props.title.includes("관리비")) return "payment";
        else if (props.title.includes("주차")) return "parking-lot";
        else if (props.title.includes("공지사항")) return "speaker";
        else if (props.title.includes("민원")) return "messenger";
        else return "letter";
    }, [props.title]);

    return (
        <View style={styles.container}>
            <View style={styles.iconBox}>
                <View style={styles.iconWrapper}>
                    {iconName === "payment" ? (
                        <SpinningWon />
                    ) : (
                        <Icon name={iconName} size={styles.icon.width} color={styles.icon.color} />
                    )}
                </View>
            </View>
            <View style={styles.contentBox}>
                <Text style={styles.title}>{props.title}</Text>
                <View style={styles.content}>
                    {props.content.split("\n").map((v, i) => (
                        <Text key={i} style={styles.contentText} adjustsFontSizeToFit numberOfLines={1}>
                            {v.replace(" ", "")}
                        </Text>
                    ))}
                </View>
                <Text style={styles.date}>{props.createdAt.toLocaleString()}</Text>
            </View>
        </View>
    );
}

type NotificationProps = PushMessageLog;

type NotificationIcons = IconSeries | "payment";

function useNotificationStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            //minheight: deviceUI.getScreenSize().height * 0.15,
            flexDirection: "row",
            borderBottomColor: theme.color.series.grey.level1,
            borderBottomWidth: deviceUI.moderateScale(1),
            paddingVertical: deviceUI.moderateScale(10),
            paddingLeft: deviceUI.moderateScale(10),
        },
        iconBox: {
            flex: 1.5,
            justifyContent: "flex-start",
            alignItems: "center",
        },
        iconWrapper: {
            width: deviceUI.moderateScale(30),
            height: deviceUI.moderateScale(30),
            borderRadius: deviceUI.moderateScale(30),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.color.series.grey.level1,
        },
        icon: {
            width: deviceUI.moderateScale(30),
            color: theme.color.specified.black,
        },
        contentBox: {
            flex: 8.5,
            paddingRight: deviceUI.moderateScale(15),
        },
        title: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
            marginBottom: deviceUI.moderateScale(5),
        },
        content: {
            alignItems: "flex-start",
            marginBottom: deviceUI.moderateScale(5),
        },
        contentText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.black,
        },
        date: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(11),
            color: theme.color.specified.grey,
        },
    });
}
