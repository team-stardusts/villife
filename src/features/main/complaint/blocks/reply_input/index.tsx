import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import useOnKeyboardEvent from "../../../../common/hooks/keyboard";
import IconImage from "../../../../common/atoms/icon/image";
import useReplyInputStyle from "./style";
import { RelpyInputProps } from "./type";
import React from "react";
import useComplaintService from "../../services";
import VillifeToastMessage from "../../../../common/atoms/toast";

function ReplyInputSection(props: RelpyInputProps) {
    const keyboardHeight = useOnKeyboardEvent({});
    const styles = useReplyInputStyle();
    const [imageUris, setImageUris] = React.useState<Array<string>>([]);
    const service = useComplaintService();

    const onPressImageIcon = async () => {
        try {
            const result = await service.PickAndUploadImage();
            const newArray = [...imageUris, result.uri];
            setImageUris(newArray);
        } catch (e) {
            VillifeToastMessage.showBottomToast("error", "이미지 업로드에 실패하였습니다.");
        }
    };

    return (
        <View style={[styles.replyInputContainer, { bottom: keyboardHeight }]}>
            <View style={styles.replyImageSection}>
                {imageUris.map((uri) => {
                    return (
                        <Image
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
                />
            </View>
        </View>
    );
}

export default ReplyInputSection;
