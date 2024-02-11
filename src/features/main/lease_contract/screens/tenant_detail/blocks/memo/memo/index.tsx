import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../../../common/router/types";
import useMemoPallet from "../../../../memo/hooks/memo-pallet";
import { ColorAvailable, MemoColor } from "../../../../memo/hooks/memo-pallet/types";
import { ContractMemoProps } from "./types";
import { useEffect, useMemo, useRef, useState } from "react";
import ContentBox from "../../../../../../../common/blocks/content_box";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import useContractMemoStyles from "./styles";
import Icon from "../../../../../../../common/atoms/icon";
import { hexToRGB } from "../../../../../../../common/global_function";
import { StardustAlertContent } from "../../../../../../../common/blocks/universial/stardust_alert/types";
import StardustAlert from "../../../../../../../common/blocks/universial/stardust_alert";
import useRoomViewModel from "../../../../../viewmodel/room";
import VillifeToastMessage from "../../../../../../../common/atoms/toast";

export default function ContractMemo(props: ContractMemoProps) {
    const DEGREE_ANIMATE_DURATION = 30;
    const DEGREE_ANIMATE_INTERATION = 50;
    const navigation = useNavigation<VillifeNavigation>();
    const styles = useContractMemoStyles();
    const pallet = useMemoPallet();
    const viewModel = useRoomViewModel();
    const rotateValue = useRef(new Animated.Value(0, { useNativeDriver: false })).current;
    const rotateInterpolate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "0.6deg"],
    });
    const memoColor = useMemo<MemoColor>(() => {
        if (props.memoType === undefined) return pallet.blue;
        try {
            return pallet[props.memoType as ColorAvailable];
        } catch {
            return pallet.blue;
        }
    }, [props.memoType]);
    const [alert, setAlert] = useState<StardustAlertContent>({
        type: "warning",
        visible: false,
        title: "메모를 삭제하실건가요?",
        message: "삭제한 메모는 복구할 수 없습니다.",
    });

    useEffect(() => {
        console.log("MEMO", memoColor);
    }, [memoColor]);

    useEffect(() => {
        if (props.isEditMode) {
            const options = {
                enableVibrateFallback: false,
                ignoreAndroidSystemSettings: false,
            };

            ReactNativeHapticFeedback.trigger("impactMedium", options);
            const animation = Animated.loop(
                Animated.sequence([
                    Animated.timing(rotateValue, {
                        toValue: 1,
                        duration: DEGREE_ANIMATE_DURATION,
                        useNativeDriver: true,
                    }),
                    Animated.timing(rotateValue, {
                        toValue: 0,
                        duration: DEGREE_ANIMATE_DURATION,
                        useNativeDriver: true,
                    }),
                    Animated.timing(rotateValue, {
                        toValue: -1,
                        duration: DEGREE_ANIMATE_DURATION,
                        useNativeDriver: true,
                    }),
                    Animated.timing(rotateValue, {
                        toValue: 0,
                        duration: DEGREE_ANIMATE_DURATION,
                        useNativeDriver: true,
                    }),
                ]),
                {
                    iterations: DEGREE_ANIMATE_INTERATION,
                    resetBeforeIteration: true,
                }
            );

            setTimeout(() => animation.start(() => props.setIsEditMode(false)), Math.random() * 100);

            return () => {
                animation.stop();
                animation.reset();
            };
        }
    }, [props.isEditMode]);

    const cancleMEmoDeletion = () => {
        setAlert({
            ...alert,
            visible: false,
        });
    };

    const deleteMemo = async () => {
        if (viewModel === null) return;

        const isSuccessful = await viewModel.deleteMemo(props.memoId);

        setAlert({
            ...alert,
            visible: false,
        });

        if (isSuccessful) {
            VillifeToastMessage.showBottomToast("success", "선택한 메모를 삭제했어요!");
        } else {
            VillifeToastMessage.showBottomToast("error", "메모를 삭제하지 못했어요...");
        }
    };

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.subContainer,
                    {
                        transform: [
                            {
                                scale: props.isEditMode ? 0.98 : 1,
                            },
                            {
                                rotateZ: rotateInterpolate,
                            },
                        ],
                    },
                ]}>
                {props.isEditMode && (
                    <>
                        <StardustAlert {...alert} setAlert={setAlert} />
                        <TouchableOpacity
                            style={styles.deleteBtn}
                            activeOpacity={0.5}
                            onPress={() =>
                                setAlert({
                                    ...alert,
                                    visible: true,
                                    buttons: [
                                        {
                                            text: "확인",
                                            onPress: () => deleteMemo(),
                                        },
                                        {
                                            text: "취소",
                                            onPress: () => cancleMEmoDeletion(),
                                        },
                                    ],
                                })
                            }>
                            <Icon name="plus" size={styles.deleteIcon.width} color={styles.deleteIcon.color} />
                        </TouchableOpacity>
                    </>
                )}
                <ContentBox
                    backgroundColor={
                        memoColor
                            ? props.isEditMode
                                ? hexToRGB(memoColor.background as string, 0.7)
                                : memoColor.background
                            : ""
                    }>
                    <TouchableOpacity
                        style={styles.wrapper}
                        activeOpacity={0.6}
                        onPress={() => {
                            if (props.isEditMode) {
                                props.setIsEditMode(false);
                            } else {
                                navigation.navigate("contract_memo_edit", {
                                    contractId: props.contractId,
                                    updateInfo: {
                                        content: props.content,
                                        memoId: props.memoId,
                                        memoType: props.memoType,
                                    },
                                });
                            }
                        }}
                        onLongPress={() => props.setIsEditMode(true)}>
                        <View style={styles.memoBox}>
                            <Text
                                style={[
                                    styles.memo,
                                    memoColor && {
                                        color: props.isEditMode
                                            ? hexToRGB(memoColor.font as string, 0.7)
                                            : memoColor.font,
                                    },
                                ]}>
                                {props.content}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ContentBox>
            </Animated.View>
        </View>
    );
}
