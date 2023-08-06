import { Path, Svg } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#E4E4E4" as const;

export default function IconMatrix(props: CommonIconProps) {
    const { color, size } = props;
    const ratio = 0.5;

    return (
        <Svg width={size * ratio} height={size * ratio} viewBox="0 0 20 20" fill="none">
            <Path
                d="M8.33333 2.5H2.5V8.33333H8.33333V2.5Z"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M17.4998 2.5H11.6665V8.33333H17.4998V2.5Z"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M17.4998 11.6666H11.6665V17.5H17.4998V11.6666Z"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M8.33333 11.6666H2.5V17.5H8.33333V11.6666Z"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
