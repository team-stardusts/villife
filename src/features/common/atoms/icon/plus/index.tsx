import { Defs, G, Path, Rect, Svg } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#E4E4E4" as const;

export default function IconPlus(props: CommonIconProps) {
    const { color, size } = props;
    const widthRatio: number = 0.5;
    const heightRatio: number = 0.5;

    return (
        <Svg width={size * widthRatio} height={size * heightRatio} viewBox="0 0 20 20" fill="none">
            <Path
                d="M10 4.16663V15.8333"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={color ?? ICON_DEFAULT_COLOR}
            />
            <Path
                d="M4.16663 10H15.8333"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={color ?? ICON_DEFAULT_COLOR}
            />
        </Svg>
    );
}
