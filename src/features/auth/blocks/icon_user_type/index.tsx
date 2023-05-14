import { StyleSheet, View, Text, Platform, Pressable } from "react-native";
import { IconRoundPeople, IconRoundPerson } from "../../../common/atoms/icon/human";
import { UserTypeSelectionButtonProps } from "./types";
import useStyler from "../../../common/hooks/styler/hooks";
import { VILLIFE_AUTHORITY } from "../../../../libs/rest_apis/villife/absc";

export default function UserTypeSelectionButton({
    caption,
    size,
    userType,
    selected,
    onPress,
}: UserTypeSelectionButtonProps) {
    const { theme } = useStyler();
    const color: string = selected ? theme.colorFamily.blue : theme.colorFamily.lightgrey;

    let Icon = null;

    switch (userType) {
        case VILLIFE_AUTHORITY.ADMIN:
            Icon = IconRoundPerson;
            break;
        default:
            Icon = IconRoundPeople;
            break;
    }

    const styles = StyleSheet.create({
        toplevelBox: {
            width: size,
            height: size * 1.2,
            paddingVertical: size * 0.08,
            borderColor: color,
            borderRadius: size * 0.2,
            borderWidth: size * 0.05,
            backgroundColor: theme.colorFamily.white,
            ...Platform.select({
                ios: {
                    shadowColor: theme.colorFamily.darkgrey,
                    shadowOpacity: 0.4,
                    shadowRadius: size * 0.025,
                    shadowOffset: {
                        height: 6,
                        width: 0,
                    },
                },
                android: {
                    elevation: 15,
                },
            }),
        },
        iconBox: {
            flex: 5,
            alignItems: "center",
            justifyContent: "center",
        },
        captionBox: {
            flex: 5,
            alignItems: "center",
            justifyContent: "center",
        },
        caption: {
            color: color,
            fontFamily: theme.font.fontFamilies.pretendard.extraBold,
            fontSize: size * 0.2,
        },
    });
    return (
        <Pressable style={styles.toplevelBox} onPress={() => onPress && onPress()}>
            <View style={styles.iconBox}>
                <Icon color={color} size={size * 0.6} />
            </View>
            <View style={styles.captionBox}>
                <Text style={styles.caption}>{caption}</Text>
            </View>
        </Pressable>
    );
}
