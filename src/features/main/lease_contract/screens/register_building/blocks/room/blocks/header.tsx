import { useEffect, useState } from "react";
import { FloorSetterHeaderProps } from "../types";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

export default function FloorSetterHeader({ styles, onPress }: FloorSetterHeaderProps) {
    const [hasUnderground, setHasUnderground] = useState<boolean>(false);

    useEffect(() => {
        onPress(hasUnderground);
    }, [hasUnderground]);

    return (
        <View style={styles.rowContaier}>
            <View style={styles.floorBox}>
                <Text style={styles.header}>층수</Text>
            </View>
            <View style={styles.roomBox}>
                <Text style={styles.header}>개수</Text>
            </View>
            <View style={styles.blankBox}>
                <TouchableOpacity
                    style={styles.undergroundSettingBtn}
                    onPress={() => setHasUnderground(!hasUnderground)}>
                    <Text style={styles.undergroundSettingBtnText}>지하 설정</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
