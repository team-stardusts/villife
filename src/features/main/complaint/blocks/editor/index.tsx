import React, { useRef } from "react";
import { ComplaintEditorProps } from "./types";
import { IconRecord, RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import { Dimensions, Keyboard, ScrollView, Text, TextInput, View } from "react-native";
import useComplaintEditorStyle, { EditorStyle } from "./styles";

function ComplaintEditor(props: ComplaintEditorProps) {
    const styles = useComplaintEditorStyle();
    const richText = useRef<RichEditor>(null);
    const scrollRef = useRef<ScrollView>(null);
    const size = Dimensions.get("window");
    const [keboardShow, setKeyBoardShow] = React.useState(false);

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyBoardShow(true);
        });
        const keyboardDidHideListner = Keyboard.addListener("keyboardDidHide", () => {
            setKeyBoardShow(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListner.remove();
        };
    }, []);

    /** TO DO ::
     * 1.server Env 바탕으로 폰트 가져오는 Library 객체 만들기
     * 2.만든 후 에디터 및 웹뷰에 적용하기
     * 3.클릭시 키보드랑 화면 말려 올라가는거 해결하기
     */

    return (
        <>
            <ScrollView
                style={[styles.scroll]}
                keyboardDismissMode={"none"}
                ref={scrollRef}
                nestedScrollEnabled={true}
                stickyHeaderIndices={[0]}
                scrollEventThrottle={20}>
                <>
                    <TextInput
                        style={styles.title}
                        onChangeText={(text) => {
                            props.titleRef.current = text;
                        }}
                        placeholder="제목을 입력하세요"
                    />
                </>
                <RichEditor
                    onChange={(text) => {
                        props.contentRef.current = text;
                    }}
                    editorStyle={EditorStyle}
                    ref={richText}
                    style={[styles.rich, { height: keboardShow ? size.height * 0.46 : size.height * 0.79 }]}
                    useContainer={false}
                    enterKeyHint={"done"}
                    placeholder={"내용을 입력해주세요."}
                    pasteAsPlainText={true}
                />
                <View>
                    <RichToolbar
                        style={[styles.richBar]}
                        flatContainerStyle={styles.flatStyle}
                        editor={richText}
                        selectedIconTint={"#2095F2"}
                        disabledIconTint={"#bfbfbf"}
                        onPressAddImage={() => {
                            /*  new ImageUploader()
                                .pickOneAndUpload()
                                .then((r) => {
                                    richText.current?.insertImage(r.uri);
                                })
                                .catch((reason) => {
                                    console.log(reason);
                                }); */
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
                </View>
            </ScrollView>
        </>
    );
}

export default ComplaintEditor;
