import { GestureResponderEvent } from "react-native/types";

export interface LoginIconProps {
    diameter: number;
}

export interface SocialLoginIconProps extends LoginIconProps {
    providerName: "kakao" | "naver" | "google";
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}

export type LoginIconReturnType = JSX.Element;

export interface PressableIconProps {
    diameter: number;
    children: React.ReactNode;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}
