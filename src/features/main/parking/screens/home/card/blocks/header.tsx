import { Text, TouchableOpacity, View } from "react-native";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import { VehicleCardHeaderProps } from "../types";
import { useEffect, useState } from "react";

export default function VehicleCardHeader({ styles, numberOfVehicle, onIntoEditmode }: VehicleCardHeaderProps) {
    const messages = useScreenMessage().messages;
    const [editmode, setEditmode] = useState<boolean>(false);

    useEffect(() => {
        onIntoEditmode(editmode);
    }, [editmode]);

    return (
        <View style={styles.conatainer}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>{messages.main.parking.home.my_vehicle_info}</Text>
            </View>
            {numberOfVehicle > 0 && (
                <TouchableOpacity style={styles.modifyBtn} activeOpacity={0.5} onPress={() => setEditmode(!editmode)}>
                    <Text style={styles.modifyBtnTitle}>
                        {editmode ? messages.words.cancle : messages.words.modified}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
