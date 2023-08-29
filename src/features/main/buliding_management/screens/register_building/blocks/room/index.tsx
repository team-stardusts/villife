import { ScrollView, Text, View } from "react-native";
import FloorSetterHeader from "./blocks/header";
import { BuildingFloors, RoomCountSetterProps } from "./types";
import { useEffect, useRef, useState } from "react";
import FloorSetterRow from "./blocks/row";
import FloorAdditor from "./blocks/addition";

export default function RoomCountSetter({ styles }: RoomCountSetterProps) {
    const [hasUnderground, setHasUnderground] = useState<boolean>(false);
    // floors의 index가 층을 나타냄. 0번 index는 지하를 뜻하며 0번 index만이 null 값을 가짐
    const [floors, setFloors] = useState<BuildingFloors>([null, 0]);
    const scrollVewRef = useRef<ScrollView | null>(null);

    useEffect(() => {
        const _floors = floors;

        _floors[0] = hasUnderground ? 0 : null;

        setFloors([..._floors]);
    }, [hasUnderground]);

    const handlePressAddBtn = () => {
        let newFloorRooms = 0;

        // length 1은 지하
        if (floors.length > 1) {
            newFloorRooms = floors[floors.length - 1] as number;
        }

        setFloors([...floors, newFloorRooms]);
    };

    const handleChangeRooms = (floor: number, rooms: number) => {
        const _floors = floors;
        _floors[floor] = rooms;

        setFloors([..._floors]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>호수 정보 설정</Text>
            </View>
            <View style={styles.contentContainer}>
                <FloorSetterHeader styles={styles} onPress={setHasUnderground} />
                <ScrollView
                    ref={scrollVewRef}
                    onContentSizeChange={() => scrollVewRef.current?.scrollToEnd({ animated: true })}>
                    {floors.map((rooms, index) => {
                        if (rooms === null) return;

                        return (
                            <FloorSetterRow
                                key={index}
                                styles={styles}
                                floor={index}
                                rooms={rooms}
                                onChangeRoomCount={(newRooms) => handleChangeRooms(index, newRooms)}
                            />
                        );
                    })}
                    <FloorAdditor styles={styles} onPress={handlePressAddBtn} />
                </ScrollView>
            </View>
        </View>
    );
}
