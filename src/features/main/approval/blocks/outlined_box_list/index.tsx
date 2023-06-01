import { FlatList, ListRenderItemInfo } from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedBox from "../outlined_box";
import { Approval, getApprovalsResult } from "../../../../../libs/rest_apis/villife/approval/types";

//TO DO :: implement props which contains data it needs

/**
 * @param props should be implemented
 * @description size fixed as width covers 90% of screen width
 * @usage noti screen, complaint screen
 */
function FlatListOutlinedContentsBox(props: { approvals: ReadonlyArray<Approval> }) {
    const { approvals } = props;

    return (
        <FlatList
            contentContainerStyle={{ alignItems: "center", width: "100%" }}
            data={approvals}
            keyExtractor={(item, index) => `${index}${item}`}
            renderItem={OutlinedBoxRenderItem}
        />
    );
}

function OutlinedBoxRenderItem(props: ListRenderItemInfo<Approval>) {
    return <OutlinedBox approvalRequest={props.item} />;
}

export default FlatListOutlinedContentsBox;
