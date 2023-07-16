import React, { useRef } from "react";
import { Dimensions, Keyboard, ScrollView, TextInput, View, Text } from "react-native";
import { IconRecord, RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import ImageUploader from "../../../../../libs/media/uploader";
import NotiEditorProps from "./type";
import useNotiEditorStyles, { EditorStyle } from "./styles";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useNoticeService from "../../services";
import useOnKeyboardEvent from "../../../../common/hooks/keyboard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function NotiEditor(props: NotiEditorProps) {
    const styles = useNotiEditorStyles();
    const richText = useRef<RichEditor>(null);
    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const service = useNoticeService();
    const { deviceUI, theme } = useStyler();
    const message = useScreenMessage();
    const keyboardHeight = useOnKeyboardEvent();

    return (
        <>
            <TextInput
                defaultValue={props.titleRef.current}
                style={styles.title}
                onChangeText={(text) => {
                    props.titleRef.current = text;
                }}
                placeholder="제목을 입력하세요"
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
                    service.uploadAndInsertImage(richText);
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
