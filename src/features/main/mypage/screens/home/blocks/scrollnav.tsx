import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NavButtonProps, ScrollNavProps } from "../types";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../common/router/types";
import useUserInformation from "../../../../../common/hooks/service/user_info";
import VillifeStorage from "../../../../../../libs/storage";
import StardustAlert from "../../../../../common/blocks/universial/stardust_alert";
import { useState } from "react";
import { StardustAlertContent } from "../../../../../common/blocks/universial/stardust_alert/types";
import VillifeServer from "../../../../../../libs/rest_apis/villife";
import { Response } from "../../../../../../libs/rest_apis/types";
import IVillifeExpenseRestClient from "../../../../../../libs/rest_apis/villife/expense/types";

interface UndoManagementFeeRenterTest {
    undoManagementFeeRenterTest(): Response<string>;
}
class Test implements UndoManagementFeeRenterTest {
    private mApi: IVillifeExpenseRestClient = VillifeServer.getExpenseRestClient();

    undoManagementFeeRenterTest(): Response<string> {
        return this.mApi.undoManagementFeeRenterTest();
    }
}

export default function ScrollNav(props: ScrollNavProps) {
    const navigation = useNavigation<VillifeNavigation>();
    const user = useUserInformation();
    const [withdrawalAlert, setWithdrawalAlert] = useState<StardustAlertContent>({
        type: "warning",
        title: "정말로 탈퇴하시겠습니까?",
        message: "삭제된 회원정보는 복구할 수 없습니다.\nDeleted membership information cannot be recovered.",
        visible: false,
    });

    const cancleAlert = () => {
        setWithdrawalAlert({
            ...withdrawalAlert,
            visible: false,
        });
    };

    const test: UndoManagementFeeRenterTest = new Test();

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
                    text={"회원 탈퇴"}
                    color={"red"}
                    onPress={() =>
                        setWithdrawalAlert({
                            ...withdrawalAlert,
                            visible: true,
                            buttons: [
                                {
                                    text: "확인",
                                    onPress: async () => {
                                        Alert.alert("아직 준비되지 않았습니다.");
                                        const result = await test.undoManagementFeeRenterTest();
                                        console.log("TEST", result.isSuccessful);
                                        cancleAlert();
                                    },
                                },
                                {
                                    text: "취소",
                                    onPress: cancleAlert,
                                },
                            ],
                        })
                    }
                />
                <StardustAlert {...withdrawalAlert} setAlert={setWithdrawalAlert} />
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
