import { Path, Svg } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#E4E4E4" as const;

export default function IconLetter(props: CommonIconProps) {
    const { color, size } = props;
    const widthRatio: number = 30 / (30 + 24);
    const heightRatio: number = 24 / (30 + 24);

    return (
        <Svg width={size * widthRatio} height={size * heightRatio} viewBox="0 0 30 24" fill="none">
            <Path
                d="M25.5 2H4.5C3.11929 2 2 3.11929 2 4.5V19.5C2 20.8807 3.11929 22 4.5 22H25.5C26.8807 22 28 20.8807 28 19.5V4.5C28 3.11929 26.8807 2 25.5 2Z"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                //fill={color ?? ICON_DEFAULT_COLOR}
            />
            <Path
                d="M6 6L15 13L24 6"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                //fill={color ?? ICON_DEFAULT_COLOR}
            />
        </Svg>
    );
}
