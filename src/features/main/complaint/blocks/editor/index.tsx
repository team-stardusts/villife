import React, { useRef } from "react";
import { ComplaintEditorProps } from "./types";
import { IconRecord, RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import { Dimensions, ScrollView, Text, TextInput, View } from "react-native";
import useComplaintEditorStyle, { EditorStyle } from "./styles";
import useComplaintService from "../../services";
import useOnKeyboardEvent from "../../../../common/hooks/keyboard";

function ComplaintEditor(props: ComplaintEditorProps) {
    const styles = useComplaintEditorStyle();
    const richText = useRef<RichEditor>(null);
    const scrollRef = useRef<ScrollView>(null);
    const size = Dimensions.get("window");
    const service = useComplaintService();
    const [keboardShow, setKeyBoardShow] = React.useState(false);

    useOnKeyboardEvent({
        onShow() {
            setKeyBoardShow(true);
        },
        onHide() {
            setKeyBoardShow(false);
        },
    });

    /* React.useEffect(() => {
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
    }, []); */

    return (
        <>
            <ScrollView
                style={[styles.scroll]}
                keyboardDismissMode={"interactive"}
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
                        value={props.mode == "modify" ? props.titleRef.current : undefined}
                    />
                </>
                <RichEditor
                    initialContentHTML={props.contentRef.current}
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
                </View>
            </ScrollView>
        </>
    );
}

export default ComplaintEditor;
