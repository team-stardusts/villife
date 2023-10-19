import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import OutlinedBox from "../outlined_box";
import { Approval } from "../../../../../libs/rest_apis/villife/approval/types";
import useApprovalViewModel from "./useApprovalViewModel";
import useApprovalOutLinedBoxListStyles from "./style";

//[TO-DO] : 스타일 밖으로 빼기
function FlatListOutlinedContentsBox() {
    const styles = useApprovalOutLinedBoxListStyles();
    const viewModel = useApprovalViewModel();

    return (
        <FlatList
            contentContainerStyle={styles.container}
            data={viewModel}
            keyExtractor={(index, item) => `${index}${item}`}
            renderItem={OutlinedBoxRenderItem}
        />
    );
}

function OutlinedBoxRenderItem(props: ListRenderItemInfo<Approval>) {
    return <OutlinedBox approvalRequest={props.item} />;
}

export default FlatListOutlinedContentsBox;
