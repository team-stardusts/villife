import { Text, View } from "react-native";
import FloorSetterHeader from "./blocks/header";
import { BuildingFloors, RoomCountSetterProps } from "./types";
import { useState } from "react";
import FloorSetterRow from "./blocks/row";
import FloorAdditor from "./blocks/addition";

export default function RoomCountSetter({ styles }: RoomCountSetterProps) {
    const [floors, setFloors] = useState<BuildingFloors>({
        1: 0,
    });

    const handlePressAddBtn = () => {
        const _floors = Object.keys(floors);

        setFloors({ ...floors, [parseInt(_floors[_floors.length - 1]) + 1]: 0 });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text>호수 정보 설정</Text>
            </View>
            <View style={styles.contentContainer}>
                <FloorSetterHeader styles={styles} onPress={() => console.log} />
                {Object.keys(floors).map((floor, index) => (
                    <FloorSetterRow
                        key={index}
                        styles={styles}
                        floor={parseInt(floor)}
                        onChangeRooms={(rooms) =>
                            setFloors({
                                ...floors,
                                [floor]: rooms,
                            })
                        }
                    />
                ))}
                <FloorAdditor styles={styles} onPress={handlePressAddBtn} />
            </View>
        </View>
    );
}
