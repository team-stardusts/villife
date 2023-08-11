import { Path, Svg } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#E4E4E4" as const;

export default function IconCheck(props: CommonIconProps) {
    const { color, size } = props;
    const widthRatio: number = 12 / (12 + 9);
    const heightRatio: number = 9 / (12 + 9);

    return (
        <Svg width={size * widthRatio} height={size * heightRatio} fill="none">
            <Path
                d="M10.6668 1.5L4.25016 7.91667L1.3335 5"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
