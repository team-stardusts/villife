import { ActivityIndicator, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import useStyler from "../../../../../common/hooks/styler/hooks";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../common/router/types";

export default function Button() {
    const styles = useSendButtonButtonStyles();
    const navigation = useNavigation<VillifeNavigation>();

    return (
        <View style={styles.btn}>
            <TouchableOpacity onPress={() => navigation.navigate("refund_policy")}>
                <Text style={styles.btnText}>환불 안내</Text>
            </TouchableOpacity>
        </View>
    );
}

function useSendButtonButtonStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
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
}
