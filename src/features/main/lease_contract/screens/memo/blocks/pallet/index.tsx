import { TouchableOpacity, View } from "react-native";
import { MemoPalletProps } from "./types";
import { useEffect, useState } from "react";
import useMemoPalletStyles from "./styles";
import useMemoPallet from "../../hooks/memo-pallet";
import { ColorAvailable, MemoColor } from "../../hooks/memo-pallet/types";

export default function MemoPallet(props: MemoPalletProps) {
    const styles = useMemoPalletStyles();
    const pallet = useMemoPallet();
    const palletColors: (keyof typeof pallet)[] = ["blue", "green", "grey", "red", "yellow"];
    const [selectedColor, setSelectedColor] = useState<MemoColor>(pallet.blue);

    useEffect(() => {
        if (palletColors.find((v) => v === props.initialColor)) {
            setSelectedColor(pallet[props.initialColor as ColorAvailable]);
        }
    }, [props.initialColor]);

    useEffect(() => {
        props.onSelection(selectedColor);
    }, [selectedColor]);

    return (
        <View style={styles.container}>
            {Object.values(pallet).map((color, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.colorSelector,
                        {
                            backgroundColor: color.background,
                        },
                        selectedColor.name === color.name && {
                            borderColor: color.cursor, //theme.color.specified.darkgrey,
                            borderWidth: 3,
                        },
                    ]}
                    onPress={() => setSelectedColor(color)}
                />
            ))}
        </View>
    );
}
