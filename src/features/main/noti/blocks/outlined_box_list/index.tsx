import { ActivityIndicator, FlatList, ListRenderItemInfo, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import OutlinedBox from "../outlined_box";
import useNotiViewModel from "./useNotiViewModel";
import { Notice } from "../../../../../libs/rest_apis/villife/notice/types";
import useNotiOutLinedBoxListStyles from "./style";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useUserInformation from "../../../../common/hooks/service/user_info";
import useStyler from "../../../../common/hooks/styler/hooks";
import Icon from "../../../../common/atoms/icon";

function FlatListOutlinedContentsBox() {
    const styles = useNotiOutLinedBoxListStyles();
    const viewModel = useNotiViewModel();
    const messages = useScreenMessage();
    const user = useUserInformation();
    const flatListRef = useRef<FlatList<Notice>>(null);
    const { theme } = useStyler();

    const OutlinedBoxRenderItem = (props: ListRenderItemInfo<Notice>) => {
        return (
            <OutlinedBox
                id={props.item.ID}
                priority={props.item.Priority}
                title={props.item.Title}
                content={props.item.Content}
                wroteAt={props.item.UpdatedAt ? props.item.UpdatedAt.slice(0, 10) : props.item.CreatedAt.slice(0, 10)}
                position={props.index}
                flatListRef={flatListRef}
            />
        );
    };

    return (
        <FlatList
            ref={flatListRef}
            contentContainerStyle={styles.contentContainer}
            data={viewModel}
            nestedScrollEnabled
            keyExtractor={(item, index) => `${index}${item}`}
            renderItem={OutlinedBoxRenderItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
                return viewModel === undefined ? (
                    <View style={styles.whenLoading}>
                        <ActivityIndicator size="large" color={theme.color.specified.grey} />
                    </View>
                ) : (
                    <View style={styles.whenEmptyCard}>
                        {user?.isAdmin ? (
                            <View style={styles.whenEmptyText}>
                                <Text style={styles.whenEmptyCardText}>
                                    {messages.messages.main.noti.when_noti_empty_admin1}
                                </Text>
                                <Text style={styles.whenEmptyCardText}>
                                    {messages.messages.main.noti.when_noti_empty_admin2}
                                </Text>
                            </View>
                        ) : (
                            <Text style={styles.whenEmptyCardText}>{messages.messages.main.noti.when_noti_empty}</Text>
                        )}

                        <View style={{ alignItems: "center" }}>
                            <Icon name="illustration_document" size={5} />
                        </View>
                    </View>
                );
            }}
        />
    );
}
/*                        {user?.isAdmin
? messages.messages.main.noti.when_noti_empty_admin1
: messages.messages.main.noti.when_noti_empty} */

export default FlatListOutlinedContentsBox;
