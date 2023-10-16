import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "../../../../../../common/atoms/icon";
import { useEffect, useState } from "react";
import { LayoutSelectorProps, LayoutType } from "./types";

export default function LayoutSelector(props: LayoutSelectorProps) {
    const [crrLayout, setCrrLayout] = useState<LayoutType>("list");

    useEffect(() => {
        props.onSelect(crrLayout);
    }, [crrLayout]);

    return (
        <View style={props.styles.layoutSelector}>
            <TouchableOpacity
                style={props.styles.layoutSelectionBtn}
                onPress={() => {
                    if (crrLayout === "list") setCrrLayout("matrix");
                    else setCrrLayout("list");
                }}>
                <Icon
                    name={crrLayout === "list" ? "matrix" : "list"}
                    size={
                        props.styles.layoutSelectionIconSelected.width
                        /* crrLayout === "list"
                            ? props.styles.layoutSelectionIconSelected.width
                            : props.styles.layoutSelectionIcon.width */
                    }
                    color={
                        props.styles.layoutSelectionIconSelected.color
                        /* crrLayout === "list"
                            ? props.styles.layoutSelectionIconSelected.color
                            : props.styles.layoutSelectionIcon.color */
                    }
                />
            </TouchableOpacity>
            {/*             <TouchableOpacity style={props.styles.layoutSelectionBtn} onPress={() => setCrrLayout("matrix")}>
                <Icon
                    name="matrix"
                    size={
                        crrLayout === "matrix"
                            ? props.styles.layoutSelectionIconSelected.width
                            : props.styles.layoutSelectionIcon.width
                    }
                    color={
                        crrLayout === "matrix"
                            ? props.styles.layoutSelectionIconSelected.color
                            : props.styles.layoutSelectionIcon.color
                    }
                />
            </TouchableOpacity> */}
        </View>
    );
}
