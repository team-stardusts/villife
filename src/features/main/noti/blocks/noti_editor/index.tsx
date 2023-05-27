import React, { useRef } from "react";
import { Dimensions, Keyboard, ScrollView, TextInput, View, Text } from "react-native";
import { IconRecord, RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import ImageUploader from "../../../../../libs/media/uploader";
import NotiEditorProps from "./type";
import useNotiEditorStyles from "./styles";

export default function NotiEditor(props: NotiEditorProps) {
    const Styles = useNotiEditorStyles();

    const richText = useRef<RichEditor>(null);
    const scrollRef = useRef<ScrollView>(null);
    const size = Dimensions.get("window");
    const [keboardShow, setKeyBoardShow] = React.useState(false);

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyBoardShow(true);
            // Do something when the keyboard is shown
        });
        const keyboardDidHideListner = Keyboard.addListener("keyboardDidHide", () => {
            setKeyBoardShow(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListner.remove();
        };
    }, []);

    return (
        <>
            <ScrollView
                style={[Styles.scroll]}
                keyboardDismissMode={"none"}
                ref={scrollRef}
                nestedScrollEnabled={true}
                stickyHeaderIndices={[0]}
                scrollEventThrottle={20}>
                {props.isTitleEnabled ? (
                    <TextInput
                        value={props.isTitleEnabled ? props.titleRef.current : ""}
                        style={Styles.title}
                        onChangeText={(text) => (props.titleRef.current = text)}
                        placeholder="제목을 입력하세요"
                    />
                ) : (
                    <TextInput
                        style={Styles.title}
                        onChangeText={(text) => (props.titleRef.current = text)}
                        placeholder="제목을 입력하세요"
                    />
                )}

                <RichEditor
                    initialContentHTML={props.isTitleEnabled ? props.contentRef.current : ""}
                    onChange={(text) => {
                        props.contentRef.current = text;
                    }}
                    editorStyle={Styles} // default light style
                    ref={richText}
                    style={[Styles.rich, { height: keboardShow ? size.height * 0.46 : size.height * 0.75 }]}
                    useContainer={false}
                    enterKeyHint={"done"}
                    placeholder={"내용을 입력해주세요."}
                    pasteAsPlainText={true}
                />
                <View>
                    <RichToolbar
                        style={[Styles.richBar]}
                        flatContainerStyle={Styles.flatStyle}
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
                            actions.heading1,
                            actions.heading2,
                            actions.heading3,
                            actions.heading4,
                            actions.insertImage,
                            actions.setBold,
                            actions.insertOrderedList,
                            actions.alignLeft,
                            actions.alignCenter,
                            actions.alignRight,
                            actions.line,
                        ]} // default defaultActions
                        iconMap={{
                            [actions.heading1]: ({ tintColor }: IconRecord) => (
                                <Text style={[Styles.tib, { color: tintColor }]}>H1</Text>
                            ),
                            [actions.heading2]: ({ tintColor }: IconRecord) => (
                                <Text style={[Styles.tib, { color: tintColor }]}>H2</Text>
                            ),
                            [actions.heading3]: ({ tintColor }: IconRecord) => (
                                <Text style={[Styles.tib, { color: tintColor }]}>H3</Text>
                            ),
                            [actions.heading4]: ({ tintColor }: IconRecord) => (
                                <Text style={[Styles.tib, { color: tintColor }]}>H4</Text>
                            ),
                        }}
                    />
                </View>
            </ScrollView>
        </>
    );
}
