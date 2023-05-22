import { ActivityIndicator, FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import useComplaintRegisterButtonStyle from "./style";
import { ComplaintReplyItemProps } from "./type";
import { IconPerson } from "../../../../common/atoms/icon/human";
import IconMoreHorizontal from "../../../../common/atoms/icon/more_horizontal";
import React from "react";

function ComplaintReplyItem(props: ComplaintReplyItemProps) {
    const styles = useComplaintRegisterButtonStyle();
    const [sanitizedURIs, setSanitizedURIs] = React.useState<Array<string>>([]);

    React.useEffect(() => {
        const appropriateURIs = props.data.image_uris.split(",").filter((uri) => {
            return uri != "";
        });
        setSanitizedURIs(appropriateURIs);
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <IconPerson color="black" size={(styles.profile.width as number) * 2} />
            </View>
            <View style={styles.contentSection}>
                <Text style={styles.contentText}>{props.data.content}</Text>
                <FlatList
                    horizontal
                    data={sanitizedURIs}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(index, item) => {
                        return item.toString();
                    }}
                    renderItem={(info) => {
                        return (
                            <Pressable style={styles.image}>
                                <Image
                                    source={{ uri: info.item }}
                                    style={{
                                        width: styles.image.width,
                                        height: styles.image.height,
                                        borderRadius: styles.image.borderRadius,
                                        backgroundColor: "blue",
                                    }}
                                />
                            </Pressable>
                        );
                    }}
                />

                <View style={styles.infoSection}>
                    <Text style={styles.writterText}>{props.data.writer_name}</Text>
                    <View style={styles.verticalLine} />
                    <Text style={styles.writterText}>{props.data.writted_at}</Text>
                </View>
            </View>
            <Pressable>
                <IconMoreHorizontal color="black" size={styles.moreIconSize.width as number} />
            </Pressable>
        </View>
    );
}

export default ComplaintReplyItem;
