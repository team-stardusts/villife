import React, { useRef } from "react";
import { ComplaintEditorProps } from "./types";
import { IconRecord, RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import { Dimensions, KeyboardAvoidingView, ScrollView, Text, TextInput, View } from "react-native";
import useComplaintEditorStyle, { EditorStyle } from "./styles";
import useComplaintService from "../../services";
import useOnKeyboardEvent from "../../../../common/hooks/keyboard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useStyler from "../../../../common/hooks/styler/hooks";

function ComplaintEditor(props: ComplaintEditorProps) {
    const styles = useComplaintEditorStyle();
    const richText = useRef<RichEditor>(null);
    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const service = useComplaintService();
    const { deviceUI, theme } = useStyler();

    const keyboardHeight = useOnKeyboardEvent();

    return (
        <>
            <TextInput
                style={styles.title}
                onChangeText={(text) => {
                    console.log("onchange", text);
                    props.titleRef.current = text;
                }}
                placeholder="제목을 입력하세요"
                defaultValue={props.titleRef.current}
            />
            <KeyboardAwareScrollView
                style={[styles.scroll]}
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
                    editorStyle={EditorStyle}
                    ref={richText}
                    style={[
                        styles.rich,
                        {
                            height:
                                deviceUI.getScreenSize().height * 0.78 - deviceUI.moderateScale(50) - keyboardHeight,
                        },
                    ]}
                    useContainer={false}
                    enterKeyHint={"done"}
                    placeholder={"내용을 입력해주세요."}
                    pasteAsPlainText={true}
                />
            </KeyboardAwareScrollView>

            <RichToolbar
                style={[styles.richBar, { bottom: keyboardHeight, height: deviceUI.moderateScale(50) }]}
                flatContainerStyle={styles.flatStyle}
                editor={richText}
                selectedIconTint={"#2095F2"}
                disabledIconTint={"#bfbfbf"}
                onPressAddImage={() => {
                    service.UploadAndInsertImage(richText);
                }}
                actions={[
                    actions.heading1,
                    actions.heading2,
                    actions.heading3,
                    actions.heading4,
                    actions.insertImage,
                    actions.setBold,
                    actions.alignLeft,
                    actions.alignCenter,
                    actions.alignRight,
                ]}
                iconMap={{
                    [actions.heading1]: ({ tintColor }: IconRecord) => (
                        <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
                    ),
                    [actions.heading2]: ({ tintColor }: IconRecord) => (
                        <Text style={[styles.tib, { color: tintColor }]}>H2</Text>
                    ),
                    [actions.heading3]: ({ tintColor }: IconRecord) => (
                        <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
                    ),
                    [actions.heading4]: ({ tintColor }: IconRecord) => (
                        <Text style={[styles.tib, { color: tintColor }]}>H4</Text>
                    ),
                }}
            />
        </>
    );
}

export default ComplaintEditor;
