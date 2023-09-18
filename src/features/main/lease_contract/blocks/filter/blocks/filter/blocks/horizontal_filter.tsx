import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import useFilterStyles from "../styles";
import { useEffect, useState } from "react";
import useScreenMessage from "../../../../../../../common/hooks/multilingual/hooks";

export default function HorizontalFilter(props: HorizontalFilterProps) {
    const messages = useScreenMessage().messages.words;
    const styles = useFilterStyles();
    const [items, setItems] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        let _items;

        if (props.useSelectAll) {
            _items = [messages.all, ...props.items];
            setSelectedItems([messages.all]);
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
        if (props.useSelectAll && item === messages.all) {
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

        let _selectedItems = selectedItems;

        // item이 있는 경우 선택 해제에 해당하므로 selectedItems에서 삭제함
        if (selectedItems.find((value) => value === item)) {
            _selectedItems = _selectedItems.filter((value) => value !== item);
        } else {
            _selectedItems.push(item);
        }

        // "전체" 옵션을 사용하는 경우
        if (props.useSelectAll) {
            // 선택된 item이 없는 경우 전체 선택으로 변경
            // 1인 이유는 아직 삭제하기 전이기 때문
            if (_selectedItems.length === 0) {
                _selectedItems = [messages.all];
            }
            // item이 추가 될 시 "전체"를 삭제함
            else {
                _selectedItems = _selectedItems.filter((value) => value !== messages.all);
            }
        }

        setSelectedItems(_selectedItems);
    };

    return (
        <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} horizontal>
            {items.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    <TouchableOpacity
                        style={[
                            styles.itemBox,
                            selectedItems.find((value) => value === item) !== undefined && styles.seletedItemBox,
                        ]}
                        activeOpacity={0.6}
                        onPress={() => handlePressItem(item)}>
                        <Text style={styles.item}>{item}</Text>
                    </TouchableOpacity>
                </View>
            ))}
            {/* 리스트 끝 요소의 우측 Shadow가 짤리는 것을 방지함 */}
            <View style={styles.bumper} />
        </ScrollView>
    );
}

type HorizontalFilterProps = {
    items: string[];
    onChangeSelectedItems(items: string[]): void;
    useSelectAll?: boolean;
};
