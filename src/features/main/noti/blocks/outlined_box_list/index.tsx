import { FlatList, ListRenderItemInfo, Text, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import OutlinedBox from "../outlined_box";
import useNotiViewModel from "./useNotiViewModel";
import { Notice } from "../../../../../libs/rest_apis/villife/notice/types";
import useNotiOutLinedBoxListStyles from "./style";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useUserInformation from "../../../../common/hooks/service/user_info";

function FlatListOutlinedContentsBox() {
    const styles = useNotiOutLinedBoxListStyles();
    const viewModel = useNotiViewModel();
    const navigation = useNavigation<VillifeNavigation>();
    const messages = useScreenMessage();
    const user = useUserInformation();
    const flatListRef = useRef<FlatList<Notice>>(null);

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
            keyExtractor={(item, index) => `${index}${item}`}
            renderItem={OutlinedBoxRenderItem}
            ListEmptyComponent={() => {
                return (
                    <TouchableOpacity
                        style={styles.whenEmptyCard}
                        onPress={() => {
                            navigation.navigate("noti_register", {});
                        }}>
                        <Text style={styles.whenEmptyCardText}>
                            {user?.isAdmin
                                ? messages.messages.main.noti.when_noti_empty_admin
                                : messages.messages.main.noti.when_noti_empty}
                        </Text>
                    </TouchableOpacity>
                );
            }}
        />
    );
}

export default FlatListOutlinedContentsBox;
