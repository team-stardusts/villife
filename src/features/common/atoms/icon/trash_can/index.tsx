import { Defs, G, Path, Rect, Svg } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#000000" as const;

export function TrashCanIcon(props: CommonIconProps): JSX.Element {
    const { color, size } = props;
    const widthRatio: number = 1;
    const heightRatio: number = 1;

    return (
        <Svg width={size * widthRatio} height={size * heightRatio} viewBox="0 0 24 24" fill="none">
            <Path d="M3 6.21545H5H21" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path
                d="M19 6.21545V20.2155C19 20.7459 18.7893 21.2546 18.4142 21.6297C18.0391 22.0047 17.5304 22.2155 17 22.2155H7C6.46957 22.2155 5.96086 22.0047 5.58579 21.6297C5.21071 21.2546 5 20.7459 5 20.2155V6.21545M8 6.21545V4.21545C8 3.68502 8.21071 3.17631 8.58579 2.80124C8.96086 2.42617 9.46957 2.21545 10 2.21545H14C14.5304 2.21545 15.0391 2.42617 15.4142 2.80124C15.7893 3.17631 16 3.68502 16 4.21545V6.21545"
                stroke={color ?? ICON_DEFAULT_COLOR}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M10 11.2155V17.2155"
                stroke={color ?? ICON_DEFAULT_COLOR}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M14 11.2155V17.2155"
                stroke={color ?? ICON_DEFAULT_COLOR}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </Svg>
    );
}
