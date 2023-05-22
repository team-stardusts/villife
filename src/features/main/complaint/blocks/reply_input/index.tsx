import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import useOnKeyboardEvent from "../../../../common/hooks/keyboard";
import IconImage from "../../../../common/atoms/icon/image";
import useReplyInputStyle from "./style";
import { RelpyInputProps } from "./type";
import React, { useEffect } from "react";
import useComplaintService from "../../services";
import VillifeToastMessage from "../../../../common/atoms/toast";
import { Toast } from "react-native-toast-message/lib/src/Toast";

function ReplyInputSection(props: RelpyInputProps) {
    const keyboardHeight = useOnKeyboardEvent({});
    const styles = useReplyInputStyle();
    const [imageUris, setImageUris] = React.useState<Array<string>>([]);
    const [replyContent, setReplyContent] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState(false);
    const service = useComplaintService();

    useEffect(() => {
        if (props.whenModify) {
            setImageUris(props.whenModify.imageUris);
            setReplyContent(props.whenModify.content);
        }
    }, []);

    const onPressImageIcon = async () => {
        try {
            const result = await service.PickAndUploadImage();
            const newArray = [...imageUris, result.uri];
            setImageUris(newArray);
        } catch (e) {
            VillifeToastMessage.showBottomToast("error", "이미지 업로드에 실패하였습니다.");
        }
    };

    const onPressSubmitButton = async () => {
        setIsLoading(true);
        if (props.whenModify) {
            const res = await service.UpdateReply(props.whenModify.replyID, replyContent, imageUris);
            return setIsLoading(false);
        }
        const res = await service.CreateReply(props.complaintID, replyContent, imageUris);
        if (replyContent == "") {
            VillifeToastMessage.showBottomToast("error", "댓글을 입력해 주세요");
            return setIsLoading(false);
        }

        if (res.isSuccessful) {
            VillifeToastMessage.showBottomToast("success", "답글이 등록 되었습니다.");
            setImageUris([]);
            setReplyContent("");
            return setIsLoading(false);
        }

        VillifeToastMessage.showBottomToast("success", "답글이 등록에 실패하였습니다.");
        return setIsLoading(false);
    };

    return (
        <View style={[styles.replyInputContainer, { bottom: keyboardHeight }]}>
            {imageUris.length > 0 ? (
                <View style={styles.replyImageSection}>
                    {imageUris.map((uri) => {
                        if (uri == "" || uri == undefined) {
                            return <ActivityIndicator />;
                        }
                        return (
                            <Image
                                key={uri}
                                style={{
                                    margin: styles.image.margin,
                                    width: styles.image.width,
                                    height: styles.image.width,
                                    borderRadius: styles.image.borderRadius,
                                }}
                                source={{ uri: uri }}
                            />
                        );
                    })}
                </View>
            ) : (
                <></>
            )}

            <View style={styles.replyInputSection}>
                <Pressable
                    style={styles.imageIconBox}
                    onPress={() => {
                        onPressImageIcon();
                    }}>
                    <IconImage color="black" size={styles.replyImageIconSize.width as number} />
                </Pressable>
                <View style={styles.verticalLine} />
                <TextInput
                    returnKeyLabel="다음"
                    returnKeyType="go"
                    editable
                    multiline
                    placeholder="댓글을 입력하세요"
                    style={[styles.replyTextInput]}
                    value={replyContent}
                    onChangeText={(text) => setReplyContent(text)}
                />
                {isLoading ? (
                    <ActivityIndicator size={"small"} />
                ) : (
                    <TouchableOpacity
                        onPress={() => {
                            onPressSubmitButton();
                        }}>
                        <Text>{props.whenModify ? "수정" : "등록"}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

export default ReplyInputSection;
