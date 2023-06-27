import React, { useRef } from "react";
import { Dimensions, Keyboard, ScrollView, TextInput, View, Text } from "react-native";
import { IconRecord, RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import ImageUploader from "../../../../../libs/media/uploader";
import NotiEditorProps from "./type";
import useNotiEditorStyles from "./styles";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useNoticeService from "../../services";

export default function NotiEditor(props: NotiEditorProps) {
    const Styles = useNotiEditorStyles();
    const message = useScreenMessage();
    const service = useNoticeService();

    const richText = useRef<RichEditor>(null);
    const scrollRef = useRef<ScrollView>(null);
    // [TO-DO] : deviceUI로 변경, 테마도
    const size = Dimensions.get("window");
    const [keboardShow, setKeyBoardShow] = React.useState(false);

    // [TO-DO] : 준우가 만든 hook 사용
    React.useEffect(() => {
        // // [TO-DO] : s
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
                keyboardDismissMode={"interactive"}
                ref={scrollRef}
                nestedScrollEnabled={true}
                stickyHeaderIndices={[0]}
                scrollEventThrottle={20}>
                <>
                    <TextInput
                        defaultValue={props.titleRef.current}
                        style={Styles.title}
                        onChangeText={(text) => {
                            props.titleRef.current = text;
                        }}
                        placeholder={message.messages.main.noti.noti_editor_title}
                    />
                </>

                <RichEditor
                    initialContentHTML={props.contentRef.current}
                    onChange={(text) => {
                        props.contentRef.current = text;
                    }}
                    editorStyle={Styles} // default light style
                    ref={richText}
                    style={[Styles.rich, { height: keboardShow ? size.height * 0.46 : size.height * 0.79 }]}
                    useContainer={false}
                    enterKeyHint={"done"}
                    placeholder={message.messages.main.noti.noti_editor_subtitle}
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
