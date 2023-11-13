import { ColorValue } from "react-native";
import { IconSeries } from "../../atoms/icon/types";

export type InfoPannelProps = {
    infos: Info[];
};

export type Info = {
    type: "info" | "warning" | "danger";
    message: string;
};

export type Callback = { (): void };

export type IconChunk = {
    name: IconSeries;
    color: ColorValue;
};
