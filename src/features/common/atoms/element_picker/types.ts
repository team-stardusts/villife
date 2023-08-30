import type { ColorValue } from "react-native";
import type useElementPickerStyles from "./styles";

export type ElementPickerProps = {
    width: number;
    nodes: Node[];
    numberOfElementsToShow: number;
    onNodeChange?(value: Node): void;
    initialIndex?: number;
    focusedcolor?: ColorValue;
    unFocusedColor?: ColorValue;
};

export type NodeProps = {
    width: number;
    value: Node | null;
    isFocused: boolean;
    focusedcolor: ColorValue;
    unFocusedColor: ColorValue;
    styles: ReturnType<typeof useElementPickerStyles>["node"];
    onTapToSelect(value: NodeProps["value"]): void;
};

export type Node = string | number;
