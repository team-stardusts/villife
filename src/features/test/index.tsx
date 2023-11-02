import NavigationView from "../common/blocks/navigation";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useStyler from "../common/hooks/styler/hooks";

export default function TestScreen() {
    const { deviceUI, theme } = useStyler();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        btn: {
            borderRadius: deviceUI.moderateScale(10),
            backgroundColor: theme.color.specified.blue,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: deviceUI.moderateScale(10),
            marginVertical: deviceUI.moderateScale(10),
        },
        btnText: {
            fontSize: deviceUI.moderateScale(12),
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            color: theme.color.specified.white,
        },
    });

    const link = (what: "tel" | "sms" | "mailto", to: string): void => {
        Linking.openURL(`${what}:${to}`);
    };

    return (
        <NavigationView
            headerOptions={{ title: "테스트" }}
            bottomNavOptions={{ shown: false }}
            bodyOptions={{
                applyDefaultHorizontalPadding: true,
            }}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        link("tel", "010-0000-0000");
                    }}>
                    <Text style={styles.btnText}>전화</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        link("sms", "010-0000-0000");
                    }}>
                    <Text style={styles.btnText}>문자</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        link("mailto", "backingbin@gmail.com");
                    }}>
                    <Text style={styles.btnText}>이메일</Text>
                </TouchableOpacity>
            </View>
        </NavigationView>
    );
}

/*
Linking.openURL("tel:010-0000-0000") // 전화 걸기
Linking.openURL("sms:010-0000-0000") // 문자 보내기
Linking.openURL("mailto:backingbin@gmail.com") // 이메일 보내기
*/

const link = (what: "tel" | "sms" | "mailto", to: string): void => {
    Linking.openURL(`${what}:${to}`);
};
