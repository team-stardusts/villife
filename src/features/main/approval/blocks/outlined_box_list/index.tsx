import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import OutlinedBox from "../outlined_box";
import { Approval } from "../../../../../libs/rest_apis/villife/approval/types";
import useApprovalViewModel from "./useApprovalViewModel";
import useApprovalOutLinedBoxListStyles from "./style";

function FlatListOutlinedContentsBox() {
    const styles = useApprovalOutLinedBoxListStyles();
    const viewModel = useApprovalViewModel();

    const OutlinedBoxRenderItem = (props: ListRenderItemInfo<Approval>) => {
        return <OutlinedBox approvalRequest={props.item} />;
    };

    return (
        <FlatList
            contentContainerStyle={styles.container}
            data={viewModel}
            keyExtractor={(index, item) => `${index}${item}`}
            renderItem={OutlinedBoxRenderItem}
        />
    );
}

export default FlatListOutlinedContentsBox;
