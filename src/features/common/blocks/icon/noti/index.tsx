import { Svg, Rect, Defs, Pattern, Use, Image, Path, ClipPath, G } from "react-native-svg";

export function EditIcon(props: { diameter: number; color: string }): JSX.Element {
    const { diameter, color } = props;

    return (
        <Svg width={diameter} height={diameter} viewBox="0 0 14 14" fill="none">
            <G clip-path="url(#clip0_549_1055)">
                <Path
                    d="M9.91663 1.75C10.0698 1.59679 10.2517 1.47526 10.4519 1.39235C10.6521 1.30943 10.8666 1.26675 11.0833 1.26675C11.3 1.26675 11.5145 1.30943 11.7147 1.39235C11.9149 1.47526 12.0968 1.59679 12.25 1.75C12.4032 1.90321 12.5247 2.0851 12.6076 2.28527C12.6905 2.48545 12.7332 2.7 12.7332 2.91667C12.7332 3.13334 12.6905 3.34789 12.6076 3.54807C12.5247 3.74824 12.4032 3.93013 12.25 4.08334L4.37496 11.9583L1.16663 12.8333L2.04163 9.625L9.91663 1.75Z"
                    stroke={color}
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

export function TrashCanIcon(props: { diameter: number; color: string }): JSX.Element {
    const { diameter, color } = props;

    return (
        <Svg width={diameter} height={diameter} viewBox="0 0 24 24" fill="none">
            <Path d="M3 6.21545H5H21" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path
                d="M19 6.21545V20.2155C19 20.7459 18.7893 21.2546 18.4142 21.6297C18.0391 22.0047 17.5304 22.2155 17 22.2155H7C6.46957 22.2155 5.96086 22.0047 5.58579 21.6297C5.21071 21.2546 5 20.7459 5 20.2155V6.21545M8 6.21545V4.21545C8 3.68502 8.21071 3.17631 8.58579 2.80124C8.96086 2.42617 9.46957 2.21545 10 2.21545H14C14.5304 2.21545 15.0391 2.42617 15.4142 2.80124C15.7893 3.17631 16 3.68502 16 4.21545V6.21545"
                stroke={color}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M10 11.2155V17.2155"
                stroke={color}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M14 11.2155V17.2155"
                stroke={color}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </Svg>
    );
}
