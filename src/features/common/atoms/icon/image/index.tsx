import { Defs, G, Path, Rect, Svg } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#E4E4E4" as const;

export default function IconImage(props: CommonIconProps) {
    const { color, size } = props;
    const widthRatio: number = 1;
    const heightRatio: number = 1;

    return (
        <Svg width={size * widthRatio} height={size * heightRatio} viewBox="0 0 24 24" fill="none">
            <Path
                d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M21 15L16 10L5 21"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
