import { ActivityIndicator, FlatList, ListRenderItemInfo, StyleSheet, Text, View } from "react-native";
import OutlinedBox from "../outlined_box";
import { Approval } from "../../../../../../../libs/rest_apis/villife/approval/types";
import useApprovalViewModel from "./useApprovalViewModel";
import useExpenseApprovalOutLinedBoxListStyles from "./style";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import Icon from "../../../../../../common/atoms/icon";

function FlatListOutlinedContentsBox() {
    const styles = useExpenseApprovalOutLinedBoxListStyles();
    const viewModel = useApprovalViewModel();
    const { theme, deviceUI } = useStyler();

    const OutlinedBoxRenderItem = (props: ListRenderItemInfo<Approval>) => {
        return <OutlinedBox approvalRequest={props.item} />;
    };

    return (
        <FlatList
            contentContainerStyle={styles.contentContainer}
            data={viewModel.approvals}
            keyExtractor={(index, item) => `${index}${item}`}
            renderItem={OutlinedBoxRenderItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
                return viewModel.loading ? (
                    <View style={{ justifyContent: "center", minHeight: deviceUI.moderateScale(320) }}>
                        <ActivityIndicator size="large" color={theme.color.specified.grey} />
                    </View>
                ) : viewModel.approvals.length !== 0 ? (
                    <View style={{ justifyContent: "center", marginBottom: 50 }}>
                        <ActivityIndicator size="large" color={theme.color.specified.grey} />
                    </View>
                ) : (
                    <View style={styles.whenEmptyCard}>
                        <Text style={styles.whenEmptyCardText}>현재 승인이 없어요.</Text>
                        <View style={{ alignItems: "center" }}>
                            <Icon name="check_illustration" size={5} />
                        </View>
                    </View>
                );
            }}
        />
    );
}

export default FlatListOutlinedContentsBox;
