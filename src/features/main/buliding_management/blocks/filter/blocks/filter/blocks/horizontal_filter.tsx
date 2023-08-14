import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import useFilterStyles from "../styles";
import { useEffect, useState } from "react";

export default function HorizontalFilter(props: HorizontalFilterProps) {
    const styles = useFilterStyles().horizontalFilter;
    const [items, setItems] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        let _items;
        if (props.useSelectAll) {
            _items = ["전체", ...props.items];
        } else {
            _items = props.items;
        }
        setItems(_items);
    }, [props.items]);

    useEffect(() => {
        props.onChangeSelectedItems(selectedItems);
    }, [selectedItems]);

    const handlePressItem = (item: string) => {
        // "전체" 옵션을 사용하는 경우
        if (props.useSelectAll && item === "전체") {
            // Item이 "전체"만 있는 경우 선택 취소. (최소한 하나는 선택해놔야 함)
            if (selectedItems.find((value) => value === item) && selectedItems.length === 1) {
                return;
            }

            // "전체"를 선택하는 경우 나머지 선택들을 취소함
            if (!selectedItems.find((value) => value === item)) {
                setSelectedItems([item]);
                return;
            }
        }

        // item이 있는 경우 선택 해제에 해당하므로 selectedItems에서 삭제함
        if (selectedItems.find((value) => value === item)) {
            setSelectedItems(selectedItems.filter((value) => value !== item));

            // "전체" 옵션을 사용하는 경우
        } else if (props.useSelectAll) {
            /* // 선택된 item이 없는 경우 전체 선택으로 변경
            // 1인 이유는 아직 삭제하기 전이기 때문
            if (selectedItems.length === 1 && selectedItems[0] !== "전체") {
                console.log("Asdfdfs");
                setSelectedItems(["전체"]);
            }
            // item이 추가 될 시 "전체"를 삭제함
            else {
                setSelectedItems([...selectedItems.filter((value) => value !== "전체"), item]);
            } */
            setSelectedItems([...selectedItems.filter((value) => value !== "전체"), item]);
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    return (
        <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} horizontal>
            {items.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    <TouchableOpacity
                        style={[
                            styles.itemBox,
                            selectedItems.find((value) => value === item) !== undefined
                                ? styles.seletedItemBox
                                : styles.unselectedItemBox,
                        ]}
                        activeOpacity={0.6}
                        onPress={() => handlePressItem(item)}>
                        <Text style={styles.item}>{item}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
}

type HorizontalFilterProps = {
    items: string[];
    onChangeSelectedItems(items: string[]): void;
    useSelectAll?: boolean;
};
