import { Path, Svg } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#E4E4E4" as const;

export default function IconBell(props: CommonIconProps) {
    const { color, size } = props;
    const widthRatio: number = 0.5;
    const heightRatio: number = 0.5;

    return (
        <Svg width={size * widthRatio} height={size * heightRatio} viewBox="0 0 24 24" fill="none">
            <Path
                d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M14.5 20C14.2459 20.6083 13.8813 21.1132 13.4425 21.4642C13.0038 21.8153 12.5063 22 12 22C11.4937 22 10.9962 21.8153 10.5575 21.4642C10.1187 21.1132 9.75406 20.6083 9.5 20"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
