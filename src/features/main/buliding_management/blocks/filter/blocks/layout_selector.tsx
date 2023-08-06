import { View } from "react-native";
import useBuildingTenantFilterStyles from "../styles";
import { TouchableOpacity } from "react-native";
import Icon from "../../../../../common/atoms/icon";
import { useEffect, useState } from "react";

export default function LayoutSelector(props: LayoutSelectorProps) {
    const [crrLayout, setCrrLayout] = useState<LayoutType>("list");

    useEffect(() => {
        props.onSelect(crrLayout);
    }, [crrLayout]);

    return (
        <View style={props.styles.layoutSelector}>
            <TouchableOpacity style={props.styles.layoutSelectionBtn} onPress={() => setCrrLayout("list")}>
                <Icon
                    name="list"
                    size={
                        crrLayout === "list"
                            ? props.styles.layoutSelectionIconSelected.width
                            : props.styles.layoutSelectionIcon.width
                    }
                    color={
                        crrLayout === "list"
                            ? props.styles.layoutSelectionIconSelected.color
                            : props.styles.layoutSelectionIcon.color
                    }
                />
            </TouchableOpacity>
            <TouchableOpacity style={props.styles.layoutSelectionBtn} onPress={() => setCrrLayout("matrix")}>
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
            </TouchableOpacity>
        </View>
    );
}

type LayoutSelectorProps = {
    styles: ReturnType<typeof useBuildingTenantFilterStyles>["main"];
    onSelect(type: LayoutType): void;
};

export type LayoutType = "list" | "matrix";
