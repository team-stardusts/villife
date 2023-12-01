import React, { useEffect, useRef } from "react";
import { Keyboard, TextInput, View, Text, BackHandler } from "react-native";
import { IconRecord, RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useEditorStyles from "./styles";
import EditorProps from "./type";

export default function Editor(props: EditorProps) {
    const styles = useEditorStyles();
    const richText = useRef<RichEditor>(null);
    const scrollRef = useRef<KeyboardAwareScrollView>(null);

    useEffect(() => {
        const backAction = () => {
            Keyboard.dismiss();
            return true; // 이벤트를 여기서 종료합니다. false를 반환하면 기본 동작이 실행됩니다.
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove(); // 컴포넌트 unmount 시에 이벤트 리스너를 제거합니다.
    }, []);

    return (
        <>
            <TextInput
                defaultValue={props.titleRef.current}
                style={styles.main.title}
                onChangeText={(text) => {
                    props.titleRef.current = text;
                }}
                maxLength={14}
                placeholder="제목을 입력하세요"
                placeholderTextColor={styles.main.placeHolderColor.color}
            />
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
                        const cleanText = text.replace(/<\/?div>/g, "");
                        props.contentRef.current = cleanText;
                    }}
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
                        <Text style={[styles.main.tib, { color: tintColor }]}>H1</Text>
                    ),
                    [actions.heading2]: ({ tintColor }: IconRecord) => (
                        <Text style={[styles.main.tib, { color: tintColor }]}>H2</Text>
                    ),
                    [actions.heading3]: ({ tintColor }: IconRecord) => (
                        <Text style={[styles.main.tib, { color: tintColor }]}>H3</Text>
                    ),
                    [actions.heading4]: ({ tintColor }: IconRecord) => (
                        <Text style={[styles.main.tib, { color: tintColor }]}>H4</Text>
                    ),
                }}
            />
            <View style={styles.main.richBarDummyView} />
        </>
    );
}
