import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NavButtonProps, ScrollNavProps } from "../types";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../common/router/types";
import useUserInformation from "../../../../../common/hooks/service/user_info";
import { useEffect, useMemo } from "react";

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
                {process.env.NODE_ENV === "development" && user?.isRenter && (
                    <NavButton
                        styles={props.styles}
                        text={"테스트"}
                        onPress={() =>
                            navigation.navigate("general_webview", {
                                title: "공지사항 테스트",
                                url: "http://192.168.0.27:3000/mobile-view/notice?content=%EA%B3%B5%EC%A7%80%EC%82%AC%ED%95%AD%20%EB%82%B4%EC%9A%A9%EC%9D%B4%0A%0A%EC%95%88%EB%B3%B4%EC%9D%B4%EB%8A%94%20%EA%B2%BD%EC%9A%B0%EA%B0%80%0A%0A%EC%9E%88%EB%8B%A4.%0A%3Cbr%2F%3E%0A!%5B%5D(https%3A%2F%2Fstartdust-public-images2.s3.ap-northeast-2.amazonaws.com%2Ff6fd5654-d2ae-40af-8744-476a60e9dee4_Screenshot%2B2024-03-30%2Bat%2B3.15.26%E2%80%AFPM.png)",
                            })
                        }
                    />
                )}

                {user?.isAdmin ? (
                    user.adminInfomation && (
                        <NavButton
                            styles={props.styles}
                            text={"건물 정보"}
                            onPress={() => navigation.navigate("building_info")}
                        />
                    )
                ) : (
                    <NavButton
                        styles={props.styles}
                        text={"건물 정보"}
                        onPress={() => navigation.navigate("building_info")}
                    />
                )}
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
                        navigation.navigate("general_webview", {
                            title: "서비스 이용 약관",
                            url: "https://myvillife.notion.site/myvillife/09d362c9e0a849838db45163ec9c5372",
                        })
                    }
                />
                <NavButton
                    styles={props.styles}
                    text={"개인정보처리방침"}
                    onPress={() =>
                        navigation.navigate("general_webview", {
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
