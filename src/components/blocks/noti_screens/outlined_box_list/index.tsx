import { FlatList, ListRenderItemInfo } from "react-native";
import React from "react";
import OutlinedBox from "../outlined_box";

//TO DO :: implement props which contains data it needs
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
