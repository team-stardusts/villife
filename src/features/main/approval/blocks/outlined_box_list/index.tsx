import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import OutlinedBox from "../outlined_box";
import { Approval } from "../../../../../libs/rest_apis/villife/approval/types";

//[TO-DO] : 스타일 밖으로 빼기
function FlatListOutlinedContentsBox(props: { approvals: ReadonlyArray<Approval> }) {
    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            width: "100%",
        },
    });

    return (
        <FlatList
            contentContainerStyle={styles.container}
            data={props.approvals}
            keyExtractor={(index, item) => `${index}${item}`}
            renderItem={OutlinedBoxRenderItem}
        />
    );
}

function OutlinedBoxRenderItem(props: ListRenderItemInfo<Approval>) {
    return <OutlinedBox approvalRequest={props.item} />;
}

export default FlatListOutlinedContentsBox;
