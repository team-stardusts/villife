import React, { useEffect, useRef, useState } from "react";
import { ComplaintEditorProps } from "./types";
import { IconRecord, RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import { BackHandler, Keyboard, Text, TextInput, View } from "react-native";
import useComplaintEditorStyle from "./styles";
import useComplaintService from "../../services";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";
import { useNavigation } from "@react-navigation/native";
import { VillifeRouterParams } from "../../../../common/router/types";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";

function ComplaintEditor(props: ComplaintEditorProps) {
    const styles = useComplaintEditorStyle();
    const richText = useRef<RichEditor>(null);
    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const navigation = useNavigation<VillifeRouterParams["navigation"]>();
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    const service = useComplaintService();
    const [withdrawalAlert, setWithdrawalAlert] = useState<StardustAlertContent>({
        type: "primary",
        title: "",
        message: "",
        visible: false,
    });
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () => setKeyboardOpen(true));
        Keyboard.addListener("keyboardDidHide", () => setKeyboardOpen(false));

        return () => {
            Keyboard.removeAllListeners("keyboardDidShow");
            Keyboard.removeAllListeners("keyboardDidHide");
        };
    }, []);

    useEffect(() => {
        const backAction = () => {
            if (keyboardOpen) {
                return true;
            }
            if (props.titleRef.current && props.contentRef.current) {
                setWithdrawalAlert({
                    type: "primary",
                    title: "화면을 떠나려고 하시나요?",
                    message: "화면을 떠나면 입력하신 내용은 유지되지 않아요.",
                    visible: true,
                    buttons: [
                        {
                            text: "취소",
                            onPress: () => setWithdrawalAlert({ ...withdrawalAlert, visible: false }),
                        },
                        {
                            text: "확인",
                            onPress: () => {
                                setWithdrawalAlert({ ...withdrawalAlert, visible: false });
                                navigation.goBack();
                            },
                        },
                    ],
                });
            } else {
                navigation.goBack();
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, [keyboardOpen]);

    return (
        <>
            <TextInput
                defaultValue={props.titleRef.current}
                style={styles.main.title}
                onChangeText={(text) => {
                    props.titleRef.current = text;
                }}
                placeholder="제목을 입력하세요"
                placeholderTextColor={styles.main.placeHolderColor.color}
                multiline={true}
            />
            <StardustAlert {...withdrawalAlert} setAlert={setWithdrawalAlert} />
            <KeyboardAwareScrollView
                style={[styles.main.scroll]}
                keyboardDismissMode={"interactive"}
                ref={scrollRef}
                nestedScrollEnabled={true}
                stickyHeaderIndices={[0]}
                scrollEventThrottle={20}>
                <RichEditor
                    initialContentHTML={props.contentRef.current}
                    onChange={(text) => {
                        props.contentRef.current = text;
                    }}
                    onBlur={console.log}
                    editorStyle={styles.editorCSS}
                    ref={richText}
                    style={[styles.main.rich]}
                    useContainer={false}
                    enterKeyHint={"done"}
                    placeholder={"내용을 입력해주세요."}
                    pasteAsPlainText={true}
                />
            </KeyboardAwareScrollView>

            <RichToolbar
                style={[styles.main.richBar]}
                flatContainerStyle={styles.main.flatStyle}
                editor={richText}
                selectedIconTint={"#2095F2"}
                disabledIconTint={"#bfbfbf"}
                onPressAddImage={() => {
                    service.uploadAndInsertImage(richText);
                }}
                actions={[actions.insertImage, actions.setBold]}
            />
            <View style={styles.main.richBarDummyView} />
        </>
    );
}

export default ComplaintEditor;
