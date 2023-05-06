import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";
import { CommonIconProps } from "../types";

const ICON_DEFAULT_COLOR: string = "#E4E4E4" as const;

export default function IconPencil(props: CommonIconProps) {
    const { color, size } = props;
    const widthRatio: number = 20 / (20 + 20);
    const heightRatio: number = 20 / (20 + 20);

    return (
        <Svg width={size * widthRatio} height={size * heightRatio} viewBox="0 0 20 20" fill="none">
            <G clipPath="url(#clip0_719_2413)">
                <Path
                    d="M14.1665 2.50005C14.3854 2.28118 14.6452 2.10756 14.9312 1.98911C15.2171 1.87066 15.5236 1.80969 15.8332 1.80969C16.1427 1.80969 16.4492 1.87066 16.7352 1.98911C17.0211 2.10756 17.281 2.28118 17.4998 2.50005C17.7187 2.71892 17.8923 2.97875 18.0108 3.26472C18.1292 3.55069 18.1902 3.85719 18.1902 4.16671C18.1902 4.47624 18.1292 4.78274 18.0108 5.06871C17.8923 5.35468 17.7187 5.61451 17.4998 5.83338L6.24984 17.0834L1.6665 18.3334L2.9165 13.75L14.1665 2.50005Z"
                    stroke={color ?? ICON_DEFAULT_COLOR}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_719_2413">
                    <Rect width={size * widthRatio} height={size * heightRatio} fill={color ?? ICON_DEFAULT_COLOR} />
                </ClipPath>
            </Defs>
        </Svg>
    );
}
