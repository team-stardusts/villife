import { ActivityIndicator, Image, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import useOnKeyboardEvent from "../../../../common/hooks/keyboard";
import IconImage from "../../../../common/atoms/icon/image";
import useReplyInputStyle from "./style";
import { RelpyInputProps } from "./type";
import React, { useEffect } from "react";
import useComplaintService from "../../services";
import VillifeToastMessage from "../../../../common/atoms/toast";
import { ComplaintEventEmitter, ComplaintReplyModificationEventListener } from "../../services/event";
import { Reply } from "../../services/type";
import IconXButton from "../../../../common/atoms/icon/x_button";

function ReplyInputSection(props: RelpyInputProps) {
    const keyboardHeight = useOnKeyboardEvent({});
    const styles = useReplyInputStyle();
    const [imageUris, setImageUris] = React.useState<Array<string>>([]);
    const [replyContent, setReplyContent] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [modifyMode, setModifyMode] = React.useState(false);
    const replyWhenModify = React.useRef<Reply>();
    const service = useComplaintService();

    useEffect(() => {
        const listener = new ComplaintReplyModificationEventListener();
        listener.subscribe((reply) => {
            replyWhenModify.current = reply;
            setImageUris(replyWhenModify.current.image_uris);
            setReplyContent(replyWhenModify.current.content);
            setModifyMode(true);
        });

        return () => {
            listener.unsubscribe();
            replyWhenModify.current = undefined;
        };
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

    const clearReplyInformation = () => {
        setReplyContent("");
        setImageUris([]);
        setModifyMode(false);
        setIsLoading(false);
        replyWhenModify.current = undefined;
    };

    const onPressSubmitButton = async () => {
        setIsLoading(true);

        if (modifyMode) {
            // when this distribution ends
            if (!replyWhenModify.current?.id) return;
            const result = await service.UpdateReply(replyWhenModify.current.id, replyContent, imageUris);

            if (result.isSuccessful) {
                new ComplaintEventEmitter().emitListUpdatedEvent();

                return clearReplyInformation();
            }

            VillifeToastMessage.showBottomToast("error", "답글 수정에 실패하였습니다.");
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
            new ComplaintEventEmitter().emitListUpdatedEvent();
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
                            <Pressable
                                key={uri}
                                onPress={() => {
                                    /*  if (modifyMode) {
                                        setImageUris(
                                            imageUris.filter((cUri) => {
                                                return cUri != uri;
                                            })
                                        );
                                    } */
                                    setImageUris(
                                        imageUris.filter((cUri) => {
                                            return cUri != uri;
                                        })
                                    );
                                }}>
                                <Image
                                    key={uri}
                                    onLoadStart={() => {}}
                                    onLoadEnd={() => {}}
                                    style={{
                                        margin: styles.image.margin,
                                        width: styles.image.width,
                                        height: styles.image.width,
                                        borderRadius: styles.image.borderRadius,
                                    }}
                                    source={{ uri: uri }}
                                />
                                {/* {modifyMode ? (
                                    <View style={{ position: "absolute", top: 0, right: 0 }}>
                                        <IconXButton size={40} />
                                    </View>
                                ) : (
                                    <></>
                                )} */}
                                <View style={{ position: "absolute", top: 0, right: 0 }}>
                                    <IconXButton size={40} />
                                </View>
                            </Pressable>
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
                        <Text>{modifyMode ? "수정" : "등록"}</Text>
                    </TouchableOpacity>
                )}
            </View>
            {modifyMode ? (
                <TouchableOpacity
                    onPress={() => {
                        clearReplyInformation();
                    }}
                    style={styles.modifyCancleButton}>
                    <Text style={styles.modifyCancleButtonText}>취소</Text>
                </TouchableOpacity>
            ) : (
                <></>
            )}
        </View>
    );
}

export default ReplyInputSection;
