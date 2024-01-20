import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NavButtonProps, ScrollNavProps } from "../types";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../common/router/types";
import useUserInformation from "../../../../../common/hooks/service/user_info";
import { useMemo } from "react";

export default function ScrollNav(props: ScrollNavProps) {
    const navigation = useNavigation<VillifeNavigation>();
    const user = useUserInformation();
    const manualUrl = useMemo<string>(() => {
        if (user?.isAdmin) {
            return "https://villife.notion.site/7b79c15773ee404985edf8cb635eb831?pvs=4";
        } else {
            return "https://villife.notion.site/38a1a08fbb9d46f7953959123025f529?pvs=4";
        }
    }, [user?.isAdmin]);

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
                    text={"건물 정보"}
                    onPress={() => navigation.navigate("building_info")}
                />
                {user?.isRenter && (
                    <NavButton
                        styles={props.styles}
                        text={"계약 정보"}
                        onPress={() => navigation.navigate("contract_information", {})}
                    />
                )}
                <NavButton
                    styles={props.styles}
                    text={"회사 정보"}
                    onPress={() => navigation.navigate("company_introduction")}
                />
                <NavButton styles={props.styles} text={"매뉴얼"} onPress={() => Linking.openURL(manualUrl)} />
                <NavButton
                    styles={props.styles}
                    text={"이용약관"}
                    onPress={() =>
                        navigation.navigate("mypage_webview", {
                            title: "서비스 이용 약관",
                            url: "https://villife.notion.site/d60bebc9a0c5400883375d8257ad4bfc?pvs=4",
                        })
                    }
                />
                <NavButton
                    styles={props.styles}
                    text={"개인정보처리방침"}
                    onPress={() =>
                        navigation.navigate("mypage_webview", {
                            title: "개인정보 처리 방침",
                            url: "https://villife.notion.site/4aa060ac489b44e7b8bdfaae6b4cab54?pvs=4",
                        })
                    }
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
