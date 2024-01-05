import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NavButtonProps, ScrollNavProps } from "../types";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../common/router/types";

export default function ScrollNav(props: ScrollNavProps) {
    const navigation = useNavigation<VillifeNavigation>();

    return (
        <View style={props.styles.container}>
            <ScrollView style={props.styles.wrapper}>
                {/* <NavButton styles={props.styles} text={"테스트 스크린"} onPress={() => navigation.navigate("test")} />
                <NavButton
                    styles={props.styles}
                    text={"건물 설정하기 테스트"}
                    onPress={() => navigation.navigate("set_building", { id: "", password: "" })}
                />
                <NavButton
                    styles={props.styles}
                    text={"관리자 건물 변경"}
                    onPress={() => {
                        if (user?.adminInfomation) {
                            user?.changeAdminSelectedBuilding(user?.adminInfomation?.managedBuildings[2]);
                        }

                        console.log(user?.adminInfomation);
                    }}
                />
                <NavButton
                    styles={props.styles}
                    text={"토큰 재발행"}
                    onPress={() => {
                        VillifeStorage.getInstance()
                            .login.get()
                            .then((data) => {
                                if (data !== null) {
                                    VillifeStorage.getInstance().login.set({
                                        ...data,
                                        accessToken: "hello",
                                    });
                                }
                            });
                    }}
                /> */}
                <NavButton
                    styles={props.styles}
                    text={"회사 정보"}
                    onPress={() => navigation.navigate("company_introduction")}
                />
                <NavButton
                    styles={props.styles}
                    text={"빌라이프 탈퇴"}
                    onPress={() => navigation.navigate("withdrawal")}
                />
            </ScrollView>
        </View>
    );
}

function NavButton(props: NavButtonProps) {
    return (
        <View style={props.styles.btnCotainer}>
            <TouchableOpacity style={props.styles.btn} activeOpacity={0.3} onPress={() => props.onPress(props.text)}>
                <Text style={[props.styles.btnText, props.color ? { color: props.color } : undefined]}>
                    {props.text}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
