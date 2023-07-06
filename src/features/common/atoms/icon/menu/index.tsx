import { Path, Svg } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#E4E4E4" as const;

export default function IconMenu(props: CommonIconProps) {
    const { color, size } = props;
    const widthRatio: number = 24 / (30 + 24);
    const heightRatio: number = 24 / (30 + 24);

    return (
        <Svg width={size * widthRatio} height={size * heightRatio} viewBox="0 0 24 24" fill="none">
            <Path
                d="M3 12H21"
                stroke={color ?? ICON_DEFAULT_COLOR}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M3 6H21"
                stroke={color ?? ICON_DEFAULT_COLOR}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M3 18H21"
                stroke={color ?? ICON_DEFAULT_COLOR}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </Svg>
    );
}
