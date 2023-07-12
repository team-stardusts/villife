import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#E4E4E4" as const;

export default function IconParkingLot(props: CommonIconProps) {
    const { color, size } = props;
    const widthRatio: number = 30 / (30 + 30);
    const heightRatio: number = 30 / (30 + 30);

    return (
        <Svg width={size * widthRatio} height={size * heightRatio} viewBox="0 0 24 24">
            <G clip-path="url(#clip0_577_1040)">
                <Path
                    d="M13 3H6V21H10V15H13C16.31 15 19 12.31 19 9C19 5.69 16.31 3 13 3ZM13.2 11H10V7H13.2C14.3 7 15.2 7.9 15.2 9C15.2 10.1 14.3 11 13.2 11Z"
                    fill={color ?? ICON_DEFAULT_COLOR}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_577_1040">
                    <Rect width={size * widthRatio} height={size * heightRatio} fill="none" />
                </ClipPath>
            </Defs>
        </Svg>
    );
}
