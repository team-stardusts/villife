import { FlatList, ListRenderItemInfo } from "react-native";
import React from "react";
import OutlinedBox from "../outlined_box";
import useNotiViewModel from "./useNotiViewModel";
import { Approval } from "../../../../../libs/rest_apis/villife/approval/types";

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

function OutlinedBoxRenderItem(props: ListRenderItemInfo<Approval>) {
    return (
        <OutlinedBox
            id={props.item.id}
            content={props.item.content}
            category={props.item.category}
            requester_id={props.item.requester_id}
            approval_id={props.item.approval_id}
            building_name={props.item.building_name}
            title={props.item.title}
        />
    );
}

export default FlatListOutlinedContentsBox;
