import { Path, Svg } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#E4E4E4" as const;

export default function IconCautionMark(props: CommonIconProps) {
    const { color, size } = props;
    const widthRatio: number = 0.5;
    const heightRatio: number = 0.5;

    return (
        <Svg width={size * widthRatio} height={size * heightRatio} viewBox="0 0 22 22" fill="none">
            <Path
                d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M11 7V11"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M11 15H11.01"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
