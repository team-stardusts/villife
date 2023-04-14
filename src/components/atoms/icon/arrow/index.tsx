import { Path, Svg } from "react-native-svg";
import { IconArrowProps } from "./types";

const ICON_DEFAULT_COLOR: string = "#E4E4E4" as const;

export default function IconArrow(props: IconArrowProps) {
    const { color, size } = props;
    const widthRatio: number = 0.5;
    const heightRatio: number = 0.5;

    //let direction: IconArrowProps["direction"] = "left";
    let d: string = "M15 18L9 12L15 6"; //Left

    switch (props.direction) {
        case "up":
            d = "M18 15L12 9L6 15";
            break;
        case "down":
            d = "M6 9L12 15L18 9";
            break;
        case "right":
            d = "M9 18L15 12L9 6";
            break;
        default: // Left
            break;
    }

    return (
        <Svg width={size * widthRatio} height={size * heightRatio} viewBox="0 0 24 24" fill="none">
            <Path
                d={d}
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
