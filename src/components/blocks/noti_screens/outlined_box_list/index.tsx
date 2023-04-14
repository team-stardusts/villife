import { FlatList, ListRenderItemInfo } from "react-native";
import React from "react";
import OutlinedBox from "../outlined_box";

//TO DO :: implement props which contains data it needs

/**
 * @param props should be implemented
 * @description size fixed as width covers 90% of screen width
 * @usage noti screen, complaint screen
 */
function FlatListOutlinedContentsBox(props: any) {
    return (
        <FlatList
            contentContainerStyle={{ alignItems: "center", width: "100%" }}
            data={[0, 1, 2, 3]}
            keyExtractor={(item, index) => `${index}${item}`}
            renderItem={OutlinedBoxRenderItem}
        />
    );
}

function OutlinedBoxRenderItem(props: ListRenderItemInfo<number>) {
    console.log(props.index);
    //TODO : PASS PROPS TO OutlinedBox
    return <OutlinedBox priority={0 /* props.priority  */} priorityName={"필독" /* props.priorityName */} />;
}

export default FlatListOutlinedContentsBox;
