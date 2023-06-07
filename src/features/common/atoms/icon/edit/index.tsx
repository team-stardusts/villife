import { Svg, Rect, Defs, Path, ClipPath, G } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#000000" as const;

export function EditIcon(props: CommonIconProps): JSX.Element {
    const { color, size } = props;
    const widthRatio: number = 1;
    const heightRatio: number = 1;

    return (
        <Svg width={size * widthRatio} height={size * heightRatio} viewBox="0 0 14 14" fill="none">
            <G clip-path="url(#clip0_549_1055)">
                <Path
                    d="M9.91663 1.75C10.0698 1.59679 10.2517 1.47526 10.4519 1.39235C10.6521 1.30943 10.8666 1.26675 11.0833 1.26675C11.3 1.26675 11.5145 1.30943 11.7147 1.39235C11.9149 1.47526 12.0968 1.59679 12.25 1.75C12.4032 1.90321 12.5247 2.0851 12.6076 2.28527C12.6905 2.48545 12.7332 2.7 12.7332 2.91667C12.7332 3.13334 12.6905 3.34789 12.6076 3.54807C12.5247 3.74824 12.4032 3.93013 12.25 4.08334L4.37496 11.9583L1.16663 12.8333L2.04163 9.625L9.91663 1.75Z"
                    stroke={color ?? ICON_DEFAULT_COLOR}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_549_1055">
                    <Rect width="14" height="14" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    );
}
