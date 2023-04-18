import {
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import React, { useRef } from "react";
import Button from "../../../atoms/button";
import NoticeRegisterScreenProps from "./type";
import { IconRecord, RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import ImageUploader from "../../../../libs/media/uploader";
import { CreateNoticeParams } from "../../../../libs/rest_apis/villife/types";
import VillifeServer from "../../../../libs/rest_apis/villife";
import Toast from "react-native-toast-message";
import NavigationView from "../../../blocks/navigation";
import { LightTheme } from "../../../../hooks/themes";

function NoticeRegisterScreen(props: NoticeRegisterScreenProps) {
    const content = useRef("");
    const titile = useRef("");

    const onSubmit = async () => {
        console.log(content.current);
        console.log(titile.current);

        const param: CreateNoticeParams = {
            priority: 1,
            title: titile.current,
            content: content.current,
            building_id: 1,
        };
        const api = new VillifeServer();

        const reuslt = await api.createNotice(param);

        if (reuslt.data?.status == 200) {
            Toast.show({
                type: "success",
                text1: "공지사항 등록 완료",
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 200,
            });
            props.navigation.goBack();
        } else {
            Toast.show({
                type: "error",
                text1: `공지사항 등록 실패`,
                position: "bottom",
                visibilityTime: 1500,
                bottomOffset: 200,
            });
        }

        console.log("create notice result\n", reuslt.data?.data);
    };

    return (
        <NavigationView
            headerOptions={{
                title: "공지사항 등록",
                shown: true,
                navComponent: ReigsterButton,
                navComponentProps: {
                    onSubmit: () => {
                        onSubmit();
                    },
                },
            }}
            bottomNavOptions={{ shown: false }}>
            <SafeAreaView style={{ flex: 1 }}>
                <NotiEditor contentRef={content} titleRef={titile} />
            </SafeAreaView>
        </NavigationView>
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
                style={[EditorStyle.scroll]}
                keyboardDismissMode={"none"}
                ref={scrollRef}
                nestedScrollEnabled={true}
                stickyHeaderIndices={[0]}
                scrollEventThrottle={20}>
                <>
                    <TextInput
                        style={EditorStyle.title}
                        onChangeText={(text) => (props.titleRef.current = text)}
                        placeholder="제목을 입력하세요"
                    />
                </>
                <RichEditor
                    onChange={(text) => {
                        props.contentRef.current = text;
                    }}
                    editorStyle={EditorStyle.contentStyle} // default light style
                    ref={richText}
                    style={[EditorStyle.rich, { height: keboardShow ? size.height * 0.46 : size.height * 0.79 }]}
                    useContainer={false}
                    enterKeyHint={"done"}
                    placeholder={"내용을 입력해주세요."}
                    pasteAsPlainText={true}
                />
                <View>
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
                </View>
            </ScrollView>
        </>
    );
}

const EditorStyle = StyleSheet.create({
    rich: {
        flex: 1,
    },
    richBar: {
        backgroundColor: "rgba(83, 156, 241,0.2)",
    },
    title: {
        fontSize: 30,
        marginLeft: "3%",
        fontFamily: "Pretendard-Bold",
    },
    contentStyle: {
        backgroundColor: "white",
        height: "100%",
        color: "black",
        caretColor: "red",
        placeholderColor: "gray",

        // cssText: '#editor {background-color: #f3f3f3}', // initial valid
        contentCSSText: "font-size: 16px; min-height: 200px;", // initial valid
    },
    scroll: { flex: 1 },
    tib: {
        textAlign: "center",
        color: "#515156",
    },
    flatStyle: {
        paddingHorizontal: 12,
    },
});

function ReigsterButton({ onSubmit }: { onSubmit: () => void }) {
    return (
        <View
            style={{
                backgroundColor: "tomato",
                height: "100%",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingRight: 15,
            }}>
            <TouchableOpacity
                onPress={() => {
                    onSubmit();
                }}>
                <Text style={{}}>등록하기</Text>
            </TouchableOpacity>
        </View>
    );
}
