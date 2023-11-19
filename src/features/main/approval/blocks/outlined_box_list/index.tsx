import { ActivityIndicator, FlatList, ListRenderItemInfo, Text, TouchableOpacity, View } from "react-native";
import OutlinedBox from "../outlined_box";
import { Approval } from "../../../../../libs/rest_apis/villife/approval/types";
import useApprovalViewModel from "./useApprovalViewModel";
import useApprovalOutLinedBoxListStyles from "./style";
import useStyler from "../../../../common/hooks/styler/hooks";
import { useEffect } from "react";
import Icon from "../../../../common/atoms/icon";

function FlatListOutlinedContentsBox() {
    const styles = useApprovalOutLinedBoxListStyles();
    const viewModel = useApprovalViewModel();
    const { theme } = useStyler();

    const OutlinedBoxRenderItem = (props: ListRenderItemInfo<Approval>) => {
        return <OutlinedBox approvalRequest={props.item} />;
    };

    return (
        <FlatList
            contentContainerStyle={styles.contentContainer}
            data={viewModel}
            keyExtractor={(index, item) => `${index}${item}`}
            renderItem={OutlinedBoxRenderItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
                return viewModel.length !== 0 ? (
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
