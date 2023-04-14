import { Path, Svg } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#E4E4E4" as const;

export default function IconSpeaker(props: CommonIconProps) {
    const { color, size } = props;
    const widthRatio: number = 21 / (21 + 26);
    const heightRatio: number = 26 / (21 + 26);
    return (
        <Svg width={size * widthRatio} height={size * heightRatio} viewBox="0 0 21 26" fill="none">
            <Path
                d="M17.1596 1.24354C17.1596 1.24354 13.3621 7.4616 9.79864 7.4616H2.78565C2.59965 7.4616 2.42128 7.55885 2.28976 7.73196C2.15824 7.90507 2.08435 8.13986 2.08435 8.38467V13.9231C2.08435 14.1679 2.15824 14.4027 2.28976 14.5758C2.42128 14.7489 2.59965 14.8462 2.78565 14.8462H9.79864C13.3621 14.8462 17.1596 21.0902 17.1596 21.0902C17.4253 21.5517 18.2142 21.2356 18.2142 20.5231V1.80777C18.2142 1.09758 17.4691 0.722004 17.1596 1.24354V1.24354Z"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M2.08436 13.0002C2.08436 13.0002 1.38306 12.654 1.38306 11.154C1.38306 9.65401 2.08436 9.30786 2.08436 9.30786"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M18.9155 12.4232C18.9155 12.4232 19.6168 12.1734 19.6168 11.154C19.6168 10.1346 18.9155 9.88477 18.9155 9.88477"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M10.4999 7.46167V14.8463"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M4.18823 7.46167V14.8463"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M5.59082 14.8462V24.5385C5.59082 24.6609 5.62776 24.7783 5.69352 24.8648C5.75928 24.9514 5.84847 25 5.94147 25H8.26452C8.37438 25 8.48271 24.9661 8.58078 24.901C8.67885 24.8358 8.76392 24.7412 8.82913 24.6248C8.89434 24.5085 8.93787 24.3736 8.95621 24.231C8.97454 24.0884 8.96718 23.9422 8.9347 23.804C8.56739 22.2533 7.69472 20.5046 7.69472 17.6154H8.39601C8.58201 17.6154 8.76039 17.5182 8.89191 17.3451C9.02343 17.1719 9.09731 16.9372 9.09731 16.6923V15.7693C9.09731 15.5245 9.02343 15.2897 8.89191 15.1166C8.76039 14.9434 8.58201 14.8462 8.39601 14.8462H7.69472"
                stroke={color ?? ICON_DEFAULT_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
