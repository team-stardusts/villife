import { FlatList, ListRenderItemInfo } from "react-native";
import React from "react";
import OutlinedBox from "../outlined_box";
import useNotiViewModel from "./useNotiViewModel";
import { GetNoticesResult, Notice } from "../../../../libs/rest_apis/villife/types";

//TO DO :: implement props which contains data it needs

/**
 * @param props should be implemented
 * @description size fixed as width covers 90% of screen width
 * @usage noti screen, complaint screen
 */
function FlatListOutlinedContentsBox(props: any) {
    const viewModel = useNotiViewModel();

    return (
        <FlatList
            contentContainerStyle={{ alignItems: "center", width: "100%" }}
            data={viewModel}
            keyExtractor={(item, index) => `${index}${item}`}
            renderItem={OutlinedBoxRenderItem}
        />
    );
}

function OutlinedBoxRenderItem(props: ListRenderItemInfo<Notice>) {
    return (
        <OutlinedBox
            priority={props.item.Priority}
            title={props.item.Title}
            content={props.item.Content}
            wroteAt={props.item.CreatedAt}
        />
    );
}

export default FlatListOutlinedContentsBox;
