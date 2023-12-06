import { ActivityIndicator, FlatList, ListRenderItemInfo, Text, TouchableOpacity, View } from "react-native";
import OutlinedBox from "../outlined_box";
import { Approval } from "../../../../../libs/rest_apis/villife/approval/types";
import useApprovalViewModel from "./useApprovalViewModel";
import useApprovalOutLinedBoxListStyles from "./style";
import useStyler from "../../../../common/hooks/styler/hooks";
import { useEffect, useState } from "react";
import Icon from "../../../../common/atoms/icon";

function FlatListOutlinedContentsBox() {
    const styles = useApprovalOutLinedBoxListStyles();
    const { approvals, loading } = useApprovalViewModel(); // loading 상태 추가
    const [items, setItems] = useState<Approval[]>([]);
    const { theme } = useStyler();

    useEffect(() => {
        const filteredItems = approvals.filter((value) => value.category === 1 || value.category === 2);
        setItems(filteredItems);
    }, [approvals]);

    const OutlinedBoxRenderItem = (props: ListRenderItemInfo<Approval>) => {
        return <OutlinedBox approvalRequest={props.item} />;
    };

    return (
        <FlatList
            contentContainerStyle={styles.contentContainer}
            data={items}
            keyExtractor={(index, item) => `${index}${item}`}
            renderItem={OutlinedBoxRenderItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
                return loading ? (
                    <View style={{ justifyContent: "center", marginBottom: 50 }}>
                        <ActivityIndicator size="large" color={theme.color.specified.grey} />
                    </View>
                ) : items.length !== 0 ? (
                    <View style={{ justifyContent: "center", marginBottom: 50 }}>
                        <ActivityIndicator size="large" color={theme.color.specified.grey} />
                    </View>
                ) : (
                    <View style={styles.whenEmptyCard}>
                        <Text style={styles.whenEmptyCardText}>현재 승인 요청이 없어요.</Text>
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
