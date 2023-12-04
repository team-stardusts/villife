import { ColorValue, TouchableOpacity, View } from "react-native";
import { ColorAvailable, PalletProps } from "./types";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import { useEffect, useState } from "react";

export default function Pallet(props: PalletProps) {
    const { theme, deviceUI } = useStyler();
    const [selectedColor, setSelectedColor] = useState<ColorAvailable>("blue");
    const colors: Colors = {
        blue: theme.color.status.info,
        red: theme.color.status.danger,
        yellow: theme.color.status.warning,
        green: theme.color.status.success,
        grey: theme.color.status.secondary,
    };

    useEffect(() => {
        props.onSelection(colors[selectedColor]);
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
            {Object.entries(colors).map((color, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        {
                            width: "15%",
                            height: deviceUI.moderateScale(20),
                            borderRadius: deviceUI.moderateScale(10),
                            backgroundColor: color[1],
                        },
                        selectedColor === color[0] && {
                            borderColor: theme.color.specified.darkgrey,
                            borderWidth: 1,
                        },
                    ]}
                    onPress={() => setSelectedColor(color[0] as ColorAvailable)}
                />
            ))}
        </View>
    );
}

type Colors = {
    [key in ColorAvailable]: ColorValue;
};
