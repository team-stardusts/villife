import { FlatList, ListRenderItemInfo } from "react-native";
import React from "react";
import OutlinedBox from "../outlined_box";
import useNotiViewModel from "./useNotiViewModel";
import { Notice } from "../../../../../libs/rest_apis/villife/notice/types";
import useNotiOutLinedBoxListStyles from "./style";

//TO DO :: implement props which contains data it needs

/**
 * @param props should be implemented
 * @description size fixed as width covers 90% of screen width
 * @usage noti screen, complaint screen
 */
function FlatListOutlinedContentsBox(props: any) {
    const style = useNotiOutLinedBoxListStyles();
    const viewModel = useNotiViewModel();

    return (
        <FlatList
            contentContainerStyle={style.contentContainer}
            data={viewModel}
            keyExtractor={(item, index) => `${index}${item}`}
            renderItem={OutlinedBoxRenderItem}
        />
    );
}

function OutlinedBoxRenderItem(props: ListRenderItemInfo<Notice>) {
    return (
        <OutlinedBox
            id={props.item.ID}
            priority={props.item.Priority}
            title={props.item.Title}
            content={props.item.Content}
            wroteAt={props.item.CreatedAt.slice(0, 10)}
        />
    );
}

export default FlatListOutlinedContentsBox;
