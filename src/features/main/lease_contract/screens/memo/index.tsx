import { TextInput, View, Text, StyleProp } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useMemoEditScreenStyles from "./styles";
import ContractMemoEditScreenProps from "./types";
import { useMemo, useState } from "react";
import MemoPallet from "./blocks/pallet";
import SimpleNavComponent from "../../../../common/blocks/navigation/header/navcomponent";
import VillifeToastMessage from "../../../../common/atoms/toast";
import useRoomViewModel from "../../viewmodel/room";
import { ColorAvailable, MemoColor } from "./hooks/memo-pallet/types";

export default function ContractMemoEditScreen({ navigation, route }: ContractMemoEditScreenProps) {
    const MEMO_LENGTH_LIMIT = 300;
    const styles = useMemoEditScreenStyles();
    const viewModel = useRoomViewModel();

    const [memo, setMemo] = useState<string | null>(route.params?.updateInfo?.content ?? null);
    const [memoColor, setMemoColor] = useState<MemoColor | null>(null);

    const inputStyle = useMemo<StyleProp<any>>(() => {
        if (memoColor === null) return styles.input;
        styles.input.color = memoColor.font;
        return styles.input;
    }, [route.params.updateInfo, styles, memoColor]);

    const onPressRegisteration = async () => {
        if (!memo || !memoColor) {
            VillifeToastMessage.showBottomToast("info", "메모장에 입력된 내용이 없어요!");
            return;
        }

        if (viewModel === null) return;

        if (route.params.updateInfo === undefined) {
            const isSuccessful = await viewModel.createMemo(route.params.contractId, memoColor.name, memo);

            if (isSuccessful) {
                //VillifeToastMessage.showBottomToast("success", "메모를 등록했어요!");

                navigation.canGoBack() && navigation.goBack();
            } else {
                VillifeToastMessage.showBottomToast("error", "메모 등록을 실패했어요...");
            }
        } else {
            const isSuccessful = await viewModel.updateMemo(route.params.updateInfo.memoId, memo);

            if (isSuccessful) {
                //VillifeToastMessage.showBottomToast("success", "메모 내용을 변경했어요!");

                navigation.canGoBack() && navigation.goBack();
            } else {
                VillifeToastMessage.showBottomToast("error", "메모 내용 변경에 실패했어요...");
            }
        }
    };

    return (
        <NavigationView
            headerOptions={{
                title: route.params ? "메모 수정" : "메모 등록",
                navComponent: SimpleNavComponent,
                navComponentProps: {
                    title: route.params.updateInfo === undefined ? "등록하기" : "저장하기",
                    onPress: () => onPressRegisteration(),
                },
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
                hideBuidingSelector: true,
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: true,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <View style={styles.container}>
                <MemoPallet
                    initialColor={route.params.updateInfo?.memoType as ColorAvailable}
                    onSelection={setMemoColor}
                />
                <View style={[styles.inputBox, memoColor !== null && { backgroundColor: memoColor.background }]}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={inputStyle}
                            //cursorColor={memoColor?.cursor}
                            selectionColor={memoColor?.cursor}
                            placeholder="메모를 입력해주세요."
                            placeholderTextColor={memoColor?.cursor}
                            value={memo ?? ""}
                            onChangeText={(text) => {
                                if (text.length > MEMO_LENGTH_LIMIT) {
                                    VillifeToastMessage.showBottomToast(
                                        "info",
                                        `메모는 ${MEMO_LENGTH_LIMIT.toString()} 글자를 넘을 수 없어요.`
                                    );
                                } else {
                                    setMemo(text.length === 0 ? null : text);
                                }
                            }}
                            scrollEnabled
                            autoFocus
                            multiline
                        />
                    </View>
                    <View style={styles.txtLenWrapper}>
                        <Text style={[styles.txtLen, memoColor !== null && { color: memoColor.cursor }]}>
                            {memo === null ? 0 : memo?.length}/{MEMO_LENGTH_LIMIT}
                        </Text>
                    </View>
                </View>
            </View>
        </NavigationView>
    );
}
