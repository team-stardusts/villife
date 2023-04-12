import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import React, { useRef } from "react";
import Button from "../../../atoms/button";
import NoticeRegisterScreenProps from "./type";
import { IconRecord, RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import ImageUploader from "../../../../libs/media/uploader";

function NoticeRegisterScreen(props: NoticeRegisterScreenProps) {
    const content = useRef("");
    const titile = useRef("");

    const onSubmit = async () => {
        console.log(content.current);
        console.log(titile.current);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: "100%", height: "10%", backgroundColor: "red" }}>
                <Text>Top Nav</Text>
                <Button
                    style={{ width: 200, height: 50, backgroundColor: "blue" }}
                    title="등록하기"
                    titleStyle={{ color: "white" }}
                    onPress={() => onSubmit()}></Button>
            </View>
            <NotiEditor contentRef={content} titleRef={titile} />
            <View style={{ width: "100%", height: "10%", backgroundColor: "red" }}>
                <Text>Bottom Nav</Text>
            </View>
        </SafeAreaView>
    );
}

export default NoticeRegisterScreen;

type NotiEditorProps = {
    titleRef: React.MutableRefObject<string>;
    contentRef: React.MutableRefObject<string>;
};

function NotiEditor(props: NotiEditorProps) {
    const richText = useRef<RichEditor>(null);
    const scrollRef = useRef<ScrollView>(null);

    return (
        <>
            <ScrollView
                style={[EditorStyle.scroll]}
                keyboardDismissMode={"none"}
                ref={scrollRef}
                nestedScrollEnabled={true}
                scrollEventThrottle={20}>
                <RichToolbar
                    style={[EditorStyle.richBar]}
                    flatContainerStyle={EditorStyle.flatStyle}
                    editor={richText}
                    selectedIconTint={"#2095F2"}
                    disabledIconTint={"#bfbfbf"}
                />

                <TextInput onChangeText={(text) => (props.titleRef.current = text)} placeholder="제목을 입력하세요" />
                <RichEditor
                    onChange={(text) => {
                        console.log(text);
                        props.contentRef.current = text;
                    }}
                    initialFocus={false}
                    firstFocusEnd={false}
                    editorStyle={EditorStyle.contentStyle} // default light style
                    ref={richText}
                    style={EditorStyle.rich}
                    useContainer={true}
                    initialHeight={400}
                    enterKeyHint={"done"}
                    // containerStyle={{borderRadius: 24}}
                    placeholder={"please input content"}
                    pasteAsPlainText={true}
                />
            </ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <RichToolbar
                    style={[EditorStyle.richBar]}
                    flatContainerStyle={EditorStyle.flatStyle}
                    editor={richText}
                    selectedIconTint={"#2095F2"}
                    disabledIconTint={"#bfbfbf"}
                    onPressAddImage={() => {
                        new ImageUploader()
                            .pickOneAndUpload()
                            .then((r) => {
                                richText.current?.insertImage(r.uri);
                            })
                            .catch((reason) => {
                                console.log(reason);
                            });
                    }}
                    actions={[
                        actions.undo,
                        actions.redo,
                        actions.insertImage,
                        actions.setStrikethrough,
                        actions.checkboxList,
                        actions.insertOrderedList,
                        actions.blockquote,
                        actions.alignLeft,
                        actions.alignCenter,
                        actions.alignRight,
                        actions.code,
                        actions.line,
                        actions.heading1,
                        actions.heading2,
                        actions.heading3,
                        actions.heading4,
                    ]} // default defaultActions
                    iconMap={{
                        [actions.heading1]: ({ tintColor }: IconRecord) => (
                            <Text style={[EditorStyle.tib, { color: tintColor }]}>H1</Text>
                        ),
                        [actions.heading2]: ({ tintColor }: IconRecord) => (
                            <Text style={[EditorStyle.tib, { color: tintColor }]}>H2</Text>
                        ),
                        [actions.heading3]: ({ tintColor }: IconRecord) => (
                            <Text style={[EditorStyle.tib, { color: tintColor }]}>H3</Text>
                        ),
                        [actions.heading4]: ({ tintColor }: IconRecord) => (
                            <Text style={[EditorStyle.tib, { color: tintColor }]}>H4</Text>
                        ),
                    }}
                />
            </KeyboardAvoidingView>
        </>
    );
}

const EditorStyle = StyleSheet.create({
    rich: {
        minHeight: 300,
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#e3e3e3",
    },

    richBar: {
        borderColor: "#efefef",
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    richBarDark: {
        backgroundColor: "#191d20",
        borderColor: "#696969",
    },
    contentStyle: {
        backgroundColor: "white",
        color: "black",
        caretColor: "red",
        placeholderColor: "gray",
        // cssText: '#editor {background-color: #f3f3f3}', // initial valid
        contentCSSText: "font-size: 16px; min-height: 200px;", // initial valid
    },
    scroll: {
        backgroundColor: "#ffffff",
    },
    scrollDark: {
        backgroundColor: "#2e3847",
    },
    darkBack: {
        backgroundColor: "#191d20",
    },
    tib: {
        textAlign: "center",
        color: "#515156",
    },
    flatStyle: {
        paddingHorizontal: 12,
    },
});
