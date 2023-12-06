import { ColorValue, TouchableOpacity, View } from "react-native";
import { ColorAvailable, MemoColor, MemoPalletProps, Pallet } from "./types";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import { useEffect, useState } from "react";

export default function MemoPallet(props: MemoPalletProps) {
    const { theme, deviceUI } = useStyler();
    const pallet: Pallet = {
        blue: {
            name: "blue",
            background: theme.color.series.blue.level2,
            cursor: theme.color.series.blue.level6,
            font: theme.color.series.blue.level9,
        },
        green: {
            name: "green",
            background: theme.color.series.green.level2,
            cursor: theme.color.series.green.level6,
            font: theme.color.series.green.level9,
        },
        yellow: {
            name: "yellow",
            background: theme.color.series.yellow.level2,
            cursor: theme.color.series.yellow.level8,
            font: theme.color.series.yellow.level9,
        },
        red: {
            name: "red",
            background: theme.color.series.red.level2,
            cursor: theme.color.series.red.level7,
            font: theme.color.series.red.level9,
        },
        grey: {
            name: "grey",
            background: theme.color.series.grey.level2,
            cursor: theme.color.series.grey.level6,
            font: theme.color.series.grey.level9,
        },
    };
    const [selectedColor, setSelectedColor] = useState<MemoColor>(pallet.blue);

    useEffect(() => {
        props.onSelection(selectedColor);
    }, [selectedColor]);

    return (
        <View
            style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: deviceUI.moderateScale(15),
            }}>
            {Object.values(pallet).map((color, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        {
                            width: "15%",
                            height: deviceUI.moderateScale(20),
                            borderRadius: deviceUI.moderateScale(10),
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

type Colors = {
    [key in ColorAvailable]: ColorValue;
};
