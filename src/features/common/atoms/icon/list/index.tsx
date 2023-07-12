import { Path, Svg } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#E4E4E4" as const;

export default function IconList(props: CommonIconProps) {
    const { color, size } = props;
    const widthRatio: number = 30 / (30 + 20);
    const heightRatio: number = 20 / (30 + 20);

    return (
        <Svg width={size * widthRatio} height={size * heightRatio} viewBox="0 0 30 20" fill="none">
            <Path
                d="M9 3.90222H27"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M9 10.2177H27"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M9 16.5331H27"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M4 4.80442C4.55228 4.80442 5 4.40049 5 3.90221C5 3.40393 4.55228 3 4 3C3.44772 3 3 3.40393 3 3.90221C3 4.40049 3.44772 4.80442 4 4.80442Z"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M4 11.1199C4.55228 11.1199 5 10.716 5 10.2177C5 9.71942 4.55228 9.31549 4 9.31549C3.44772 9.31549 3 9.71942 3 10.2177C3 10.716 3.44772 11.1199 4 11.1199Z"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M4 17.4354C4.55228 17.4354 5 17.0315 5 16.5332C5 16.0349 4.55228 15.631 4 15.631C3.44772 15.631 3 16.0349 3 16.5332C3 17.0315 3.44772 17.4354 4 17.4354Z"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
