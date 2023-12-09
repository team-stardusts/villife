import useStyler from "../../../../../../common/hooks/styler/hooks";
import { MemoPalletColors } from "./types";

export default function useMemoPallet() {
    const { theme } = useStyler();

    const pallet: MemoPalletColors = {
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

    return pallet;
}
