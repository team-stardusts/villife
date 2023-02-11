declare export interface LoginIconProps {
    diameter: number;
}

declare export interface SocialLoginIconProps extends LoginIconProps {
    providerName: "kakao" | "naver" | "google";
    onPress?(): void;
}

declare export type LoginIconReturnType = JSX.Element;
