import { Path, Svg } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#E4E4E4" as const;

export default function IconAppleLogo(props: CommonIconProps) {
    const { color, size } = props;
    const widthRatio: number = 0.5;
    const heightRatio: number = 0.5;

    return (
        <Svg width={size * widthRatio} height={size * heightRatio} viewBox="0 0 18 18" fill="none">
            <Path
                d="M11.97 9.55L5.70003 0.639893H0.530029V17.36H6.03003V8.44989L12.3 17.36H17.47V0.639893H11.97V9.55Z"
                fill={color ?? ICON_DEFAULT_COLOR}
            />
        </Svg>
    );
}
