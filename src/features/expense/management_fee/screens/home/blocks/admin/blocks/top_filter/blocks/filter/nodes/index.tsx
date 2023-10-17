import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import useScreenMessage from "../../../../../../../../../../../common/hooks/multilingual/hooks";
import { HorizontalFilterProps } from "./types";

export default function HorizontalFilter(props: HorizontalFilterProps) {
    const messages = useScreenMessage().messages.words;
    const [items, setItems] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        let _items;

        if (props.enableSelectAll) {
            _items = [messages.all, ...props.headers];
            setSelectedItems([messages.all]);
        } else {
            _items = props.headers;
        }

        setItems(_items);
    }, [props.headers]);

    useEffect(() => {
        let _selectedItems = [...selectedItems];

        if (_selectedItems.find((item) => item === messages.all) && items.length > 2) {
            _selectedItems = [...items.slice(1)];
        }
        props.onChangeSelectedItems(_selectedItems);
    }, [selectedItems]);

    const handlePressItem = (item: string) => {
        if (props.enableSelectAll) {
            const comparison = [...items];
            const allOfTheSelectedItems = [...selectedItems, item];
            comparison.shift(); // items에 "전체"가 포함되어 있으므로 삭제

            if (JSON.stringify(comparison) === JSON.stringify(allOfTheSelectedItems)) {
                setSelectedItems([messages.all]);

                return;
            }
        }

        // "전체" 옵션을 사용하는 경우
        if (props.enableSelectAll && item === messages.all) {
            // Item이 "전체"만 있는 경우 선택 취소. (최소한 하나는 선택해놔야 함)
            if (selectedItems.find((value) => value === item) && selectedItems.length === 1) {
                return;
            }

            // "전체"를 선택하는 경우 나머지 선택들을 취소함
            if (!selectedItems.find((value) => value === item)) {
                setSelectedItems([item]);
                return;
            }

            /*  const _items = items;
            _items.shift();

            console.log("무잉", _items, items); */
        }

        let _selectedItems = selectedItems;

        // item이 있는 경우 선택 해제에 해당하므로 selectedItems에서 삭제함
        if (selectedItems.find((value) => value === item)) {
            _selectedItems = _selectedItems.filter((value) => value !== item);
        } else {
            _selectedItems.push(item);
        }

        // "전체" 옵션을 사용하는 경우
        if (props.enableSelectAll) {
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
        <ScrollView style={props.styles.container} showsHorizontalScrollIndicator={false} horizontal>
            {items.map((item, index) => (
                <View key={index} style={props.styles.itemContainer}>
                    <TouchableOpacity
                        style={[
                            props.styles.itemBox,
                            selectedItems.find((value) => value === item) !== undefined && props.styles.seletedItemBox,
                        ]}
                        activeOpacity={0.6}
                        onPress={() => handlePressItem(item)}>
                        <Text style={props.styles.item}>
                            {item}
                            {item !== messages.all && props.postfix && props.postfix}
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
            {/* 리스트 끝 요소의 우측 Shadow가 짤리는 것을 방지함 */}
            <View style={props.styles.bumper} />
        </ScrollView>
    );
}
