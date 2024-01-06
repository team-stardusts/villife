import { Alert, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import ScreenTitleView from "../../../../common/blocks/title_view";
import { useState } from "react";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import { Response } from "../../../../../libs/rest_apis/types";
import IVillifeExpenseRestClient from "../../../../../libs/rest_apis/villife/expense/types";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import useWithdrawalScreenStyles from "./styles";
import UniversalTextInput from "../../../../common/blocks/universial/textinput";

interface UndoManagementFeeRenterTest {
    undoManagementFeeRenterTest(): Response<string>;
}
class Test implements UndoManagementFeeRenterTest {
    private mApi: IVillifeExpenseRestClient = VillifeServer.getExpenseRestClient();

    undoManagementFeeRenterTest(): Response<string> {
        return this.mApi.undoManagementFeeRenterTest();
    }
}

const WITHDRAWAL_MESSAGE = "빌라이프 탈퇴";

export default function WithdrawalScreen() {
    const styles = useWithdrawalScreenStyles();
    const test: UndoManagementFeeRenterTest = new Test();
    const [inputText, setInputText] = useState<string | null>(null);
    const [withdrawalAlert, setWithdrawalAlert] = useState<StardustAlertContent>({
        type: "warning",
        title: "빌라이프를 이용해주셔서 감사했습니다!",
        message: "'확인'을 누르시면 빌라이프 탈퇴 절차가 끝나요.\n다시 만나기를 기원할게요!",
        visible: false,
    });

    const cancleAlert = () => {
        setWithdrawalAlert({
            ...withdrawalAlert,
            visible: false,
        });
    };

    return (
        <NavigationView
            headerOptions={{
                title: "빌라이프 탈퇴",
                hideBuidingSelector: true,
                style: {
                    backgroundColor: styles.nav.color,
                },
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
                backgroundColor: styles.nav.color,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <ScreenTitleView
                titles={["빌라이프 탈퇴"]}
                subtitles={[
                    "빌라이프 서비스 탈퇴 시 서비스 사용 이력은 모두 삭제되고,",
                    "작성했던 게시물은 '탈퇴한 회원'의 게시물로 남게됩니다.",
                    "중요한 정보는 탈퇴 전에 저장해주세요.",
                    "",
                    `위 내용에 동의했다면 '${WITHDRAWAL_MESSAGE}' 입력 후`,
                    "하단의 '빌라이프 탈퇴하기'를 눌러주세요.",
                ]}
                bottomButton={{
                    title: "빌라이프 탈퇴하기",
                    disabled: inputText !== WITHDRAWAL_MESSAGE,
                    onPress: () => {
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
                        });
                    },
                }}
                disablePaddingTop>
                <StardustAlert {...withdrawalAlert} setAlert={setWithdrawalAlert} />
                <View style={styles.container}>
                    <View style={styles.inputWrapper}>
                        <UniversalTextInput
                            placeholderTextColor={styles.placeholder.color}
                            value={inputText ?? ""}
                            placeholder={WITHDRAWAL_MESSAGE}
                            onChangeText={(text) => setInputText(text === "" ? null : text)}
                        />
                    </View>
                </View>
            </ScreenTitleView>
        </NavigationView>
    );
}
